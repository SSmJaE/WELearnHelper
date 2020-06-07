// ==UserScript==
// @name         WELearn网课助手
// @namespace    http://tampermonkey.net/
// @version      0.7.0
// @description  悬浮窗显示we learn随行课堂题目答案，不支持班级测试；自动答题；挂机时长；开放自定义参数
// @author       SSmJaE
// @match        https://centercourseware.sflep.com/*
// @connect      *
// @license      GPL-3.0
// @compatible   chrome
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @require      https://unpkg.com/sweetalert/dist/sweetalert.min.js
// ==/UserScript==
'use strict';

var USER_SETTINGS = JSON.parse(GM_getValue('USER_SETTINGS', JSON.stringify({
    checkInterval: 2000,
    showReference: true,
    autoCopy: true,
    autoSolve: false,
    solveInterval: 1000,
    defaultBlankAnswer: 'Default answer.',
    autoRefresh: false,
    refreshInterval: 5,
    collapsible: false,
    debugMode: false,
})))
const ANSWER_TYPES = [
    'et-tof', //判断题
    'et-blank', //问答题+填空题
    'et-select', //下拉选择题
    'et-choice', //选择题(二选一，多选)
    'et-matching', //连线题
    'et-reference', //口语参考
    'wordDeclaration', //单词测试
    'correctresponse value', //identifier类型
    'itemBody textEntryInteraction', //泛读课程问答题
];
const PARSER = new DOMParser();
var container, title, setting,
    bufferUrl, bufferTag, bufferLength,
    optionOrder, spanOrder, liOrder, blankOrder, textareaOrder, inputOrder, tofOrder, matchingOrder,
    q = window.document.querySelector, qa = window.document.querySelectorAll;


function create_container() {
    container = document.createElement('div');
    container.id = 'container';
    container.style.visibility = 'hidden';

    title = document.createElement('div');
    title.id = 'containerTitle';
    title.textContent = '参考答案';
    container.appendChild(title);

    setting = new Image();
    setting.setAttribute('src', 'data:image/png;base64,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');
    setting.id = 'container-setting';
    container.appendChild(setting);
    setting.addEventListener('click', () => {
        settingBase.style.visibility = (settingBase.style.visibility == 'visible') ? 'hidden' : 'visible';
    }, false)

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

        #container:not(:hover) {
            filter: brightness(98%);
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
        }

        #container-setting {
            z-index: 100;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 25px;
        }

        #container-setting:hover {
            filter: brightness(70%);
        }

        #container-setting-base {
            display: table;
            visibility: hidden;
            font-size: 16px;
            width: auto;
            margin: 20px;
            z-index: 101;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            border: black 2px solid;
            border-radius: 20px;
        }

        #container-setting-base input {
            width: 50px;
            padding: 2px;
            border: black 1px solid;
        }

        #container-setting-base div.right {
            display: inline;
        }

        #container-setting-base div.record {
            margin: 5px;
        }

        #setting-save {
            position: relative;
            margin: 5px;
            left: 50%;
            transform: translate(-50%, 5%);
        }`;

    settingBase = document.createElement('div');
    settingBase.id = 'container-setting-base';
    settingBase.innerHTML = `
        <div class="record">
            <label for="checkInterval">查询延迟</label>
            <input id='checkInterval'>
            <div class="setting right">答案查询间隔，单位毫秒；多久检测一次是否切换了页面，如果页面改变了就会查询答案</div>
        </div>
        <div class="record">
            <label for="showReference">显示参考</label>
            <input type="checkbox" id='showReference'>
            <div class="setting right">是否显示听力、口语参考(适用视听说)</div>
        </div>
        <div class="record">
            <label for="autoCopy">自动复制</label>
            <input type="checkbox" id='autoCopy'>
            <div class="setting right">点击答案时，是否自动复制到粘贴板</div>
        </div>
        <hr>
        <div class="record">
            <label for="autoSolve">自动答题</label>
            <input type="checkbox" id='autoSolve'>
            <div class="setting right">自动答题开关</div>
        </div>
        <div class="record">
            <label for="solveInterval">答题间隔</label>
            <input id='solveInterval'>
            <div class="setting right">自动答题间隔，单位毫秒</div>
        </div>
        <div class="record">
            <label for="defaultBlankAnswer">默认填空</label>
            <input id='defaultBlankAnswer'>
            <div class="setting right">填空题没有固定|正确答案时，填入的默认值</div>
        </div>
        <hr>
        <div class="record">
            <label for="autoRefresh">自动挂机</label>
            <input type="checkbox" id='autoRefresh'>
            <div class="setting right">是否定时切换下一页，仅用于刷时长</div>
        </div>
        <div class="record">
            <label for="refreshInterval">切换间隔</label>
            <input id='refreshInterval'>
            <div class="setting right">单位分钟；we learn允许一个页面最多挂30分钟，所以不要大于30</div>
        </div>
        <hr>
        <div class="record">
            <label for="collapsible">默认折叠</label>
            <input type="checkbox" id='collapsible'>
            <div class="setting right">默认折叠还是不折叠悬浮窗，开启==折叠，关闭==显示</div>
        </div>
        <div class="record">
            <label for="debugMode">调试模式</label>
            <input type="checkbox" id='debugMode'>
            <div class="setting right">调试用，正常使用不用开</div>
        </div>
        <button id="setting-save">保存&刷新</button>
        `;

    if (!document.querySelector('#container')) {
        document.body.appendChild(container);
        document.body.appendChild(style);
    }
    if (!document.querySelector('#container-setting-base')) {
        document.body.appendChild(settingBase);
    }
    for (let [key, value] of Object.entries(USER_SETTINGS)) {
        console.log(document.querySelector('#' + String(key)))
        let element = document.querySelector('#' + String(key))
        if (String(value) == "true") {
            element.setAttribute('checked', '');
        } else if (String(value) == "false") {
            continue
        } else {
            element.value = value;
        }
    }
    document.querySelector('#setting-save').addEventListener('click', () => {
        for (let input of document.querySelectorAll('#container-setting-base input')) {
            if (input.value == "on") {
                USER_SETTINGS[input.id] = input.checked;
            } else {

                USER_SETTINGS[input.id] = input.value;
            }
            console.log(USER_SETTINGS[input.id])
        }
        GM_setValue('USER_SETTINGS', JSON.stringify(USER_SETTINGS));
        location.reload(true);
    }, false);
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

var collapseFlag = USER_SETTINGS.collapsible;
function make_collapsible(handle, container) {
    if (collapseFlag || USER_SETTINGS.autoRefresh) hide();
    handle.addEventListener("dblclick", e => {
        collapseFlag ? show() : hide();
    }, false);
}

function show() {
    collapseFlag = false;
    for (let element of container.childNodes) {
        if (element.id == 'containerTitle') {
            title.textContent = "参考答案";
            container.style.minWidth = "150px";
            container.style.minHeight = "100px";
            container.style.overflow = "auto";
            continue;
        }
        element.style.display = '';
    }
}

function hide() {
    collapseFlag = true;
    for (let element of container.childNodes) {
        if (element.id == 'containerTitle') {
            title.textContent = "答";
            container.style.minWidth = "20px";
            container.style.minHeight = "50px";
            container.style.overflow = "hidden";
            continue;
        }
        element.style.display = 'none';
    }
}

function autoRefresh() {
    if (USER_SETTINGS.autoRefresh) {
        setInterval(() => {
            top.document.querySelector('[href="javascript:NextSCO();"]').click();
        }, USER_SETTINGS.refreshInterval * 60 * 1000);
        if (!GM_getValue('isInformed', false)) {
            swal({
                title: "挂机提示",
                text: "如果后台显示，不一定能自动切换页面",
                icon: "info",
                button: "了解",
            });
            GM_setValue('isInformed', true)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function empty_container() {
    container.innerHTML = '';
    container.appendChild(title);
    container.appendChild(setting);
    is_show();
}

function is_show() {
    container.style.visibility = container.childNodes.length > 2 ? 'visible' : 'hidden';
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
    spanOrder = 0;
    liOrder = 0;
    textareaOrder = 0;
    matchingOrder = 0;
    bufferTag = undefined;
    let courseInfo = /com\/(.*?)\//.exec(answerUrl)[1];
    let identifier;
    try {
        identifier = /#(.*)\?/.exec(answerUrl)[1];
    } catch (error) { }

    empty_container();
    try {
        setTimeout(() => {
            let manifestUrl = `https://centercourseware.sflep.com/${courseInfo}/resource/manifest.xml`;
            query_manifest(manifestUrl, identifier, courseInfo);

            //直接在当前页面搜索答案
            add_to_container("", document.querySelectorAll('[data-solution]'));
            add_to_container("", document.querySelectorAll('.daan'));
            add_to_container("", document.querySelectorAll('.tianking .tl_daan'));

        }, 2000);

        answerUrl = `https://centercourseware.sflep.com/${courseInfo}/data${identifier}.html`;
        send_ajax_request(answerUrl);

        let extensiveReading = location.href.split('&')[0].replace('web.html?courseurl=', 'data/') + '.xml';
        send_ajax_request(extensiveReading);

    } catch (error) { }
}

function query_manifest(manifestUrl, identifier, courseInfo) {
    fetch(manifestUrl).then(response => response.text()).then(text => {
        try {
            let selector = `resource[identifier="${identifier}"] file`;
            let resource = PARSER.parseFromString(text, 'text/html').querySelector(selector).getAttribute('href');
            let answerUrl = `https://centercourseware.sflep.com/${courseInfo}/${resource}`;
            send_ajax_request(answerUrl);
        } catch (error) { }
    }).catch();
}

function send_ajax_request(answerUrl) {
    fetch(answerUrl).then(response => response.text()).then(text => {
        let htmlDom = PARSER.parseFromString(text, 'text/html');
        if (USER_SETTINGS.debugMode) console.log(htmlDom);
        parse_ajax_response(htmlDom);
    }).catch();
}

function parse_ajax_response(htmlDom) {
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
    $(element).trigger('click').trigger('focus').trigger('keydown').trigger('input');
}

function event_trigger(element) {
    $(element).trigger('keyup').trigger('change').trigger('blur');
    try {
        angular.element(element).triggerHandler('hover');
        angular.element(element).triggerHandler('keyup');
        angular.element(element).triggerHandler('blur');
    } catch (error) { };
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
    // 连线题
    let lineElements = document.querySelectorAll('.line');
    let leftCircles = document.querySelectorAll('circle[data-circle="A"]');
    let rightCircles = document.querySelectorAll('circle[data-circle="B"]');
    //进阶综合
    let inputOnPaper = document.querySelectorAll('input[data-itemtype]');
    let optionLiOnPaper = document.querySelectorAll('li[data-solution]');
    //新世纪综合
    let optionLabelOnPaper = document.querySelectorAll('label[for]');
    let inputPatternOnPaper = document.querySelectorAll('.pattern input[type="text"]');
    //泛读课程
    let optionIdentifierOnPaper = document.querySelectorAll('input[responseidentifier]');

    let textareaFlag = true;
    let bufferAnswer = undefined;
    let showOrder = 0;
    let uniqueUrl = location.href;
    if (answers.length > 0) {

        // if (USER_SETTINGS.debugMode) console.log(optionOnPaper, textareaOnPaper, blankOnPaper);
        for (let i = 0; i < answers.length; i++) {
            if (location.href != uniqueUrl) break;
            if (USER_SETTINGS.debugMode)
                if (!isRepeat(answers[i])) console.log(answers[i]);

            let content = document.createElement('div');
            content.classList.add('showAnswer');
            let hr = document.createElement('hr');

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
                                    ready_in(textareaOnPaper[textareaOrder]);
                                    textareaOnPaper[textareaOrder].textContent = content.textContent;
                                    textareaOnPaper[textareaOrder].value = content.textContent;
                                    event_trigger(textareaOnPaper[textareaOrder]);
                                } else { //有et-blank，但是无答案，不做处理
                                    textareaFlag = false;
                                }
                                textareaOrder++;
                            } else { //普通填空题
                                ready_in(blankOnPaper[blankOrder]);
                                blankOnPaper[blankOrder].textContent = content.textContent;
                                blankOnPaper[blankOrder].value = content.textContent;
                                event_trigger(blankOnPaper[blankOrder]);
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
                            // ready_in(selectOnPaper[i].querySelector('.key'));
                            selectOnPaper[i].querySelector('select').click();
                            selectOnPaper[i].querySelector('.key').click();
                            angular.element(element).triggerHandler('change');
                            // angular.element(element).triggerHandler('');
                            event_trigger(selectOnPaper[i].querySelector('.key'));
                        }
                        break;

                    case 'ET-CHOICE':
                        if (isRepeat(answers[i])) { //针对有只有inline的情况(视听说2 4-2)，也就是说，不能跳
                            if (answers[i].hasAttribute('inline')) {
                                continue;
                            }
                        } //针对视听说2 7-1重复，    
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
                                if (optionCount) {
                                    spanFlag = true;
                                    optionOrder = spanOrder;//这个只解决了li在span之前的问题，如果li在span之后呢？
                                } else {
                                    optionCount = 4; //针对进阶视听说2Practice Test One
                                }
                            } else {
                                optionOrder = liOrder;
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
                                    try {
                                        optionSpanOnPaper[targetOption].click();
                                    } catch (error) {
                                        optionOnPaper[targetOption].click();
                                    }
                                } else {
                                    optionOnPaper[targetOption].click();
                                }
                            }

                            if (spanFlag) { spanOrder++; } else { liOrder++; }
                            optionOrder++;

                        }
                        break;

                    case 'ET-MATCHING':
                        if (isRepeat(answers[i])) continue;
                        content.textContent = answers[i].getAttribute('key').split(',').join('\n\t');

                        if (USER_SETTINGS.autoSolve) {
                            for (let matchingOrder = 0; matchingOrder < answers[i].getAttribute('key').split(',').length; matchingOrder++) {
                                await sleep(USER_SETTINGS.solveInterval);
                                let targetCircle = answers[i].getAttribute('key').split(',')[matchingOrder].split('-')[1] - 1
                                let x1 = leftCircles[matchingOrder].getAttribute('cx');
                                let y1 = leftCircles[matchingOrder].getAttribute('cy');
                                let x2 = rightCircles[targetCircle].getAttribute('cx');
                                let y2 = rightCircles[targetCircle].getAttribute('cy');

                                // ready_in(leftCircles[matchingOrder]);
                                // ready_in(rightCircles[targetCircle]);
                                lineElements[matchingOrder].innerHTML = `<line ng-class="{incorrect:!matching.isKey($parent.$index,b)}" 
                                ng-click="matching.removeLine($parent.$index, b)" ng-repeat="b in cb track by $index" ng-attr-x1="{{matching.circles.xA}}" 
                                ng-attr-x2="{{matching.circles.xB}}" ng-attr-y1="{{matching.circles.A[$parent.$index]}}" ng-attr-y2="{{matching.circles.B[b]}}" 
                                x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" class=""></line>`;
                                // event_trigger(lineElements[matchingOrder]);
                                // event_trigger(leftCircles[matchingOrder]);
                                // event_trigger(rightCircles[targetCircle]);
                                // event_trigger(document.querySelector('g.aidLine line'))
                            }
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
                                    // console.log(content.textContent);
                                    if (!content.textContent) { //泛读课程
                                        content.textContent = document.querySelector(`.container input[value="${identifier}"]`).parentElement.parentElement.textContent;
                                    }
                                } catch (error) {
                                    content.textContent = answers[i].textContent; //高职第七八单元填空

                                }

                                if (USER_SETTINGS.autoSolve) {
                                    await sleep(USER_SETTINGS.solveInterval);
                                    for (let label of optionLabelOnPaper) {
                                        if (label.getAttribute('for').split('_')[1] == identifier) label.click();
                                    }
                                    for (let input of optionIdentifierOnPaper) {
                                        if (input.getAttribute('value') == identifier) {
                                            input.parentElement.parentElement.click();
                                        }
                                    }
                                }
                            } else { //高职，非精编，综合，单元测试
                                content.textContent = answers[i].textContent;
                            }

                        } else if (identifier.length == 73) { //泛读课程连线题
                            let leftMatching = document.querySelector(`[id="${identifier.split('|')[0]}"]`).getAttribute('leftorder');
                            let rightMatching = document.querySelector(`[id="${identifier.split('|')[1]}"]`).getAttribute('rightorder');
                            content.textContent = `${leftMatching}-${rightMatching}`;
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
                                            document.querySelector('.pattern textarea')
                                                .textContent = USER_SETTINGS.defaultBlankAnswer;
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

                    case "TEXTENTRYINTERACTION":
                        let textareaIdentifier = answers[i].getAttribute('responseIdentifier');
                        content.textContent = document.querySelector(`[responseIdentifier="${textareaIdentifier}"]`).parentElement.textContent.split('.').slice(1);
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
                                    event_trigger(inputOnPaper[inputOrder]);
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

                        if (answers[i].classList.contains('daan') || answers[i].classList.contains('tl_daan')) //高职公共
                            if (answers[i].textContent.length)
                                content.textContent = answers[i].textContent.replace('&nbsp;', '');

                }
            } catch (error) {
                if (USER_SETTINGS.debugMode) console.error(error);
            } finally {
                if (content.textContent.length) {
                    content.addEventListener('click', () => {
                        if (USER_SETTINGS.autoCopy)
                            GM_setClipboard(content.textContent.replace(/^\s.*、/,''), 'text');
                    }, false)
                    let order = showOrder < 9 ? '  ' + String(showOrder + 1) : String(showOrder + 1); //控制序号的宽度一致
                    content.textContent = order + '、' + content.textContent.replace('<br/>', '').replace('<br>', '');
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
                if (collapseFlag) content.style.display = "none";
            }
        }
    } else {
        if (USER_SETTINGS.autoSolve && textareaOnPaper.length > textareaOrder) //无et-blank，但是有textarea
            for (let textarea of textareaOnPaper)
                textarea.textContent = USER_SETTINGS.defaultBlankAnswer;
    }

}

create_container();
make_draggable(title, container);
make_collapsible(title, container);
setInterval(is_change, USER_SETTINGS.checkInterval);
autoRefresh();
