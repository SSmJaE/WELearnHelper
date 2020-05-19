// ==UserScript==
// @name         WELearn网课助手
// @namespace    http://tampermonkey.net/
// @version      0.6.3
// @description  悬浮窗显示we learn随行课堂题目答案，口语、听力参考文本，不支持班级测试；自动答题；开放自定义参数
// @author       SSmJaE
// @match        https://centercourseware.sflep.com/*
// @require      https://code.jquery.com/jquery-3.5.0.min.js
// @connect      *
// @license      MIT
// @compatible   chrome
// ==/UserScript==

const USER_SETTINGS = {
    autoSolve: false, //自动答题开关，改成0或者1也行
    solveInterval: 1000, //自动答题间隔，单位毫秒
    checkInterval: 3000, //答案查询间隔，单位毫秒；多久检测一次页面是否改变
    defaultBlankAnswer: 'Default answer.', //填空题没有固定/正确答案时，填入的默认值

    showReference: true, //是否显示听力、口语参考
    debugMode: false, //调试用，正常使用不用开
};

var container, title,
    bufferUrl, bufferTag, bufferLength,
    optionOrder = 0,
    spanOrder = 0,
    blankOrder = 0,
    textareaOrder = 0,
    inputOrder = 0,
    tofOrder;
const PARSER = new DOMParser();

const ANSWER_TYPES = [
    'et-tof', //判断题
    'et-blank', //问答题+填空题
    'et-select', //下拉选择题
    'et-choice', //选择题(二选一，多选)
    'et-matching', //连线题
    'et-reference', //口语参考
    'wordDeclaration', //高职单词测试
    'correctresponse value', //identifier类型
];

function create_container() {
    container = document.createElement('div');
    container.id = 'container';
    container.style.visibility = 'hidden';

    title = document.createElement('div');
    title.id = 'containerTitle';
    title.textContent = '参考答案';
    container.appendChild(title);

    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = `
        #container { 
            top: 100px; 
            left: 100px; 
            margin: 0 auto; 
            z-index: 99; 
            border-radius: 8px;
            box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
            position: absolute; 
            background: rgba(255,255,255,0.95); 
            min-width: 150px;
            max-width: 400px;
            min-height: 100px;
            max-height: 600px; 
            overflow: auto;
        }
        #containerTitle {
            background: rgba(0,0,0,0);
            height: 25px; 
            margin-top: 10px;
            text-align: center; 
            font-size: x-large;
            cursor: move;
        }
        .showAnswer {
            margin: 10px 10px;
            padding: 0px;
            color: orange; 
            font-size: medium;
            font-family: Georgia, 'Times New Roman', Times, serif;
            white-space: pre-wrap;
        }`;

    if (!document.querySelector('#container')) {
        document.body.appendChild(container);
        document.body.appendChild(style);
    }
}

function get_css(ele, prop) {
    return parseInt(window.getComputedStyle(ele)[prop]);
}

/**实现拖动功能*/
function make_draggable(handle, container) {
    let initX, initY,
        draggable = false,
        containerLeft = get_css(container, "left"),
        containerRight = get_css(container, "top");

    handle.addEventListener("mousedown", e => {
        draggable = true;
        initX = e.clientX;
        initY = e.clientY;
    }, false);

    document.addEventListener("mousemove", e => {
        if (draggable === true) {
            var nowX = e.clientX,
                nowY = e.clientY,
                disX = nowX - initX,
                disY = nowY - initY;
            container.style.left = containerLeft + disX + "px";
            container.style.top = containerRight + disY + "px";
        }
    });

    handle.addEventListener("mouseup", e => {
        draggable = false;
        containerLeft = get_css(container, "left");
        containerRight = get_css(container, "top");
    }, false);
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function empty_container() {
    container.innerHTML = '';
    container.appendChild(title);
    is_show();
}

function is_show() {
    container.style.visibility = container.childNodes.length > 1 ? 'visible' : 'hidden';
}

function is_change() {
    let currentUrl = location.href;
    if (currentUrl != bufferUrl) {
        empty_container();
        determine_course_type(currentUrl);
    }
    bufferUrl = currentUrl;
}

function determine_course_type(answerUrl) {
    optionOrder = 0;
    blankOrder = 0;
    tofOrder = 0;
    inputOrder = 0;
    bufferTag = undefined;
    let courseInfo = /com\/(.*?)\//.exec(answerUrl)[1];
    let identifier;
    try {
        identifier = /#(.*)\?/.exec(answerUrl)[1];
    } catch (error) {}


    // console.log(error);

    setTimeout(() => {
        let manifestUrl = `https://centercourseware.sflep.com/${courseInfo}/resource/manifest.xml`;
        query_manifest(manifestUrl, identifier, courseInfo);

        let answers = document.querySelectorAll('[data-solution]');
        add_to_container(document, answers);
    }, 2000);

    answerUrl = `https://centercourseware.sflep.com/${courseInfo}/data${identifier}.html`;
    send_ajax_request(answerUrl);
}

function query_manifest(manifestUrl, identifier, courseInfo) {
    fetch(manifestUrl).then(response => response.text()).then(text => {
        let selector = `resource[identifier="${identifier}"] file`;
        let resource = PARSER.parseFromString(text, 'text/html').querySelector(selector).getAttribute('href');
        let answerUrl = `https://centercourseware.sflep.com/${courseInfo}/${resource}`;
        send_ajax_request(answerUrl);
    });
}

function send_ajax_request(answerUrl) {
    fetch(answerUrl).then(response => response.text()).then(text => {
        htmlDom = PARSER.parseFromString(text, 'text/html');
        if (USER_SETTINGS.debugMode) console.log(htmlDom);
        parse_ajax_response(htmlDom);
    }).catch(console.log(1));
}

function parse_ajax_response(htmlDom) {
    empty_container();
    ANSWER_TYPES.map(answerType => htmlDom.querySelectorAll(answerType)).forEach(kindAnswers => add_to_container(htmlDom, kindAnswers));
    is_show();
}

/**通过检测父节点，解决答案重复的问题*/
function isRepeat(answerNode) {
    let parentElement, parentTag;
    let webFlag = 0;
    let mobileFlag = 0;
    try {
        for (let i = 0; i < 9; i++) {
            parentElement = (i == 0) ? answerNode : parentElement.parentElement;

            parentTag = parentElement.tagName;
            if (parentTag == 'ET-MOBILE-ONLY') mobileFlag++;
            if (parentTag == 'ET-WEB-ONLY') webFlag++;
        }
    } catch (error) {
        // if (USER_SETTINGS.debugMode) console.log(error);
    } finally {
        if (webFlag && mobileFlag) { //针对web下嵌套mobile的题目，如视听说2的3-2-3
            if (webFlag > 1) { //针对4重嵌套，unit test常见
                return true;
            } else {
                return false;
            }
        } else if (webFlag) { //web和mobile只留其一，这里保留mobile，丢弃web
            return true;
        } else {
            return false;
        }
    }
}

function ready_in(element) {
    $(element).trigger('click')
    $(element).trigger('focus')
    $(element).trigger('keydown')
    $(element).trigger('input')
}

function ready_out(element) {
    $(element).trigger('keyup')
    $(element).trigger('change')
    $(element).trigger('blur')
}

/**提取答案，并加入到容器*/
async function add_to_container(htmlDom, answers) {
    //进阶视听说
    let tofOnPaper = document.querySelectorAll('et-tof span.controls span');
    let blankOnPaper = document.querySelectorAll('et-blank span.blank');
    let optionOnPaper = document.querySelectorAll('et-choice li');
    let selectOnPaper = document.querySelectorAll('et-select div');
    let textareaOnPaper = document.querySelectorAll('et-blank textarea.blank');
    let optionSpanOnPaper = document.querySelectorAll('et-choice span');
    //进阶综合
    let inputOnPaper = document.querySelectorAll('input[data-itemtype]');
    let optionLiOnPaper = document.querySelectorAll('li[data-solution]');
    //新世纪综合
    let optionLabelOnPaper = document.querySelectorAll('label[for]');
    let inputPatternOnPaper = document.querySelectorAll('.pattern input[type="text"]');

    let textareaFlag = true;
    let bufferAnswer = undefined;
    let showOrder = 0;
    if (answers.length > 0) {

        // if (USER_SETTINGS.debugMode) console.log(optionOnPaper, textareaOnPaper, blankOnPaper);
        for (let i = 0; i < answers.length; i++) {
            if (USER_SETTINGS.debugMode)
                if (!isRepeat(answers[i])) console.log(answers[i]);

            let content = document.createElement('div');
            content.classList.add('showAnswer');
            let hr = document.createElement('hr');

            let event = new InputEvent('input');
            let setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
            let tag = answers[i].tagName;
            try {
                switch (tag) {
                    case 'ET-BLANK':
                        if (isRepeat(answers[i])) continue;
                        content.textContent = answers[i].textContent.split("|")[0];

                        if (USER_SETTINGS.autoSolve) {
                            await sleep(USER_SETTINGS.solveInterval);

                            if (answers[i].hasAttribute('block')) { //回答问题
                                if (content.textContent.length) {
                                    // ready_in(textareaOnPaper[textareaOrder]);
                                    textareaOnPaper[textareaOrder].textContent = content.textContent;
                                    textareaOnPaper[textareaOrder].dispatchEvent(event);
                                    // ready_out(textareaOnPaper[textareaOrder]);
                                } else { //有et-blank，但是无答案，不做处理
                                    textareaFlag = false;
                                }
                                textareaOrder++;
                            } else { //普通填空题
                                ready_in(blankOnPaper[blankOrder]);
                                // blankOnPaper[blankOrder].click();
                                // setValue.call(blankOnPaper[blankOrder], content.textContent);
                                blankOnPaper[blankOrder].textContent = content.textContent;
                                blankOnPaper[blankOrder].dispatchEvent(event);
                                ready_out(blankOnPaper[blankOrder]);
                                blankOrder++;
                            }
                        }
                        break;

                    case 'ET-TOF':
                        content.textContent = answers[i].getAttribute('key');

                        if (USER_SETTINGS.autoSolve) {
                            await sleep(USER_SETTINGS.solveInterval);
                            let tofOption;
                            switch (content.textContent) {
                                case 't':
                                case 'T':
                                    tofOption = 2 * tofOrder;
                                    break;
                                case 'f':
                                case 'F':
                                    tofOption = 2 * tofOrder + 1;
                            }
                            tofOnPaper[tofOption].click();
                            tofOrder++;
                        }
                        break;

                    case 'ET-SELECT':
                        content.textContent = answers[i].getAttribute('key');
                        try { //todo 这是哪个类型的题的故障处理？
                            if (!content.textContent.length)
                                content.textContent = answers[i].firstElementChild.textContent;
                        } catch (error) {
                            content.textContent = 'Answers will vary.';
                        }

                        if (USER_SETTINGS.autoSolve) {
                            await sleep(USER_SETTINGS.solveInterval);
                            selectOnPaper[i].classList.add('correct');
                        }
                        break;

                    case 'ET-CHOICE':
                        if (isRepeat(answers[i])) //针对有只有inline的情况(视听说2 4-2)，也就是说，不能跳
                            if (answers[i].hasAttribute('inline')) continue; //针对视听说2 7-1重复，    
                        content.textContent = answers[i].getAttribute('key');

                        if (USER_SETTINGS.autoSolve) {
                            await sleep(USER_SETTINGS.solveInterval);
                            let targetOption, options, optionCount;
                            let spanFlag = false;

                            try {
                                options = answers[i].getAttribute('key').split(',');
                            } catch (error) {
                                options = ['1'] //不检查答案的选择题
                            }
                            if (USER_SETTINGS.debugMode) console.log(options);

                            if (!(optionCount = answers[i].querySelectorAll('li').length)) {
                                optionCount = answers[i].querySelectorAll('span').length;
                                spanFlag = true;
                                optionOrder = spanOrder;
                            }

                            for (let option of options) {
                                if (isNaN(parseInt(option))) { //key是字母
                                    targetOption = optionCount * optionOrder + option.toUpperCase().charCodeAt() - 65;
                                } else { //key是数字
                                    targetOption = optionCount * optionOrder + parseInt(option) - 1;
                                }
                                if (USER_SETTINGS.debugMode)
                                    console.log(`题号${optionOrder} span${spanOrder} 选项${targetOption} 选项数${optionCount}`);
                                if (spanFlag && optionCount) {
                                    optionSpanOnPaper[targetOption].click();
                                } else {
                                    optionOnPaper[targetOption].click();
                                }
                            }

                            if (spanFlag) spanOrder++;
                            optionOrder++;
                        }
                        break;

                    case 'ET-MATCHING':
                        if (isRepeat(answers[i])) continue;
                        content.textContent = answers[i].getAttribute('key');

                        if (USER_SETTINGS.autoSolve) {
                            await sleep(USER_SETTINGS.solveInterval);
                        }
                        break;

                    case 'ET-REFERENCE':
                        if (!USER_SETTINGS.showReference) continue;
                    case 'WORDDECLARATION':
                        content.innerHTML = answers[i].innerHTML;
                        content.style.whiteSpace = "normal";
                        break;

                    case 'VALUE':
                        let identifier = answers[i].textContent;
                        if (identifier.length == 36) { //选择题
                            if (answers[i].textContent.length == 36) {
                                let selector = `[identifier="${identifier}"]`;
                                try {
                                    content.textContent = htmlDom.querySelector(selector).textContent;
                                } catch (error) {
                                    content.textContent = answers[i].textContent; //高职第七八单元填空
                                }

                                if (USER_SETTINGS.autoSolve) {
                                    await sleep(USER_SETTINGS.solveInterval);
                                    for (let label of optionLabelOnPaper) {
                                        if (label.getAttribute('for').split('_')[1] == identifier) {
                                            label.click();
                                        }
                                    }
                                }
                            } else { //高职，非精编，综合，单元测试
                                content.textContent = answers[i].textContent;
                            }

                        } else if (identifier.length > 200) { //纠错题
                            let selectors = identifier.split(',');
                            for (let i = 0; i < selectors.length; i++) {
                                let selector = '[identifier="' + selectors[i] + '"]';
                                content.innerHTML += htmlDom.querySelector(selector).textContent + "<br>";
                            }
                            // } else  { //回答问题
                            //     if (USER_SETTINGS.autoSolve) 
                        } else { //填空题
                            content.textContent = answers[i].textContent;

                            if (USER_SETTINGS.autoSolve) {
                                await sleep(USER_SETTINGS.solveInterval);
                                for (let inputAnswer of answers[i].textContent.split(',')) {
                                    try {
                                        inputPatternOnPaper[inputOrder].value = inputAnswer;
                                    } catch (error) {
                                        if (identifier == '(Open.)') {
                                            document.querySelector('.pattern textarea').textContent = USER_SETTINGS.defaultBlankAnswer;
                                        } else {
                                            document.querySelector('.pattern textarea').textContent = inputAnswer
                                        };
                                    } finally {
                                        inputOrder++;
                                    }
                                }
                            }
                        }
                        break;

                    default:
                        if (answers[i].hasAttribute('data-solution')) {
                            let answer = answers[i].getAttribute('data-solution');
                            if (answer.length) { //填空题
                                content.textContent = answer;

                                if (USER_SETTINGS.autoSolve) {
                                    await sleep(USER_SETTINGS.solveInterval);
                                    ready_in(inputOnPaper[inputOrder]);
                                    inputOnPaper[inputOrder].value = answer;
                                    ready_out(inputOnPaper[inputOrder]);
                                    inputOrder++;
                                }
                            } else { //选择题
                                try {
                                    content.textContent = answers[i].firstElementChild.textContent;
                                } catch (error) {
                                    content.textContent = answers[i].textContent;
                                }

                                if (USER_SETTINGS.autoSolve) {
                                    await sleep(USER_SETTINGS.solveInterval);
                                    optionLiOnPaper[i].click();
                                }
                            }
                        }
                }
            } catch (error) {
                if (USER_SETTINGS.debugMode) console.error(error);
            } finally {
                if (content.textContent.length) {
                    let order = showOrder < 9 ? '  ' + String(showOrder + 1) : String(showOrder + 1); //控制序号的宽度一致
                    content.textContent = order + '、' + content.textContent;
                    showOrder += 1;

                    // let scrollTop = optionOnPaper[targetOption].parentElement.clientTop;
                    // console.log(scrollTop, optionOnPaper[targetOption].parentElement);
                    // top.frames[0].window.scrollTo(0, parseInt(scrollTop));
                } else continue;

                if ((bufferTag !== tag) && (bufferTag !== undefined) && (bufferLength !== 0)) {
                    container.appendChild(hr);
                }
                container.appendChild(content);

                content.offsetWidth; //强制浏览器刷新悬浮窗宽度
                bufferTag = tag;
                bufferLength = content.textContent.length;

                is_show();
            }
        }
    } else {
        if (textareaOnPaper.length && textareaFlag && USER_SETTINGS.autoSolve) //无et-blank，但是有textarea
            for (let textarea of textareaOnPaper)
                textarea.textContent = USER_SETTINGS.defaultBlankAnswer;
    }
}

create_container();
make_draggable(title, container);
setInterval(is_change, USER_SETTINGS.checkInterval);
