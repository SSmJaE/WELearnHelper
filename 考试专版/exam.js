// ==UserScript==
// @name         WELearn网课助手(考试专版)
// @namespace    http://tampermonkey.net/
// @version      0.0.4
// @description  针对we learn随行课堂的班级测试/任务；欢迎大家上传题目，共建题库
// @author       SSmJaE
// @match        https://course.sflep.com/2019/test/*
// @connect      localhost
// @connect      47.97.90.127
// @license      GPL-3.0
// @compatible   chrome
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/sweetalert/dist/sweetalert.min.js
// ==/UserScript==

/*global GM_getValue, GM_setValue, GM_setClipboard, GM_xmlhttpRequest, swal, PlaySound*/
'use strict';

//从存储映射到变量
var USER_SETTINGS = JSON.parse(GM_getValue('USER_SETTINGS', JSON.stringify({
    version: '0.0.5',
    autoCopy: true,
    autoSlide: true,
    userAccount: 'default',
    debugMode: false,
})));

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

    handle.addEventListener("mouseup", () => {
        draggable = false;
        containerLeft = get_css(container, "left");
        containerRight = get_css(container, "top");
    }, false);
}

var container, title, answers, setting, checkButton, updateButton, commentButton, points;
function create_container() {

    container = document.createElement('div');
    container.id = 'container';
    container.innerHTML = `
        <div id="container-title">当前状态</div>
        <img id="container-setting"
            src="data:image/png;base64,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"></img>
        <div id="container-control">
            <button id="container-check" class="">点击查询(上传)当前题目</button>
            <button id="container-comment" class="">留言</button>
        </div>
        <div id="container-answers"></div>`;

    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = `
    #container {
        top: 100px;
        left: 100px;
        margin: 0 auto;
        z-index: 99;
        border-radius: 8px;
        box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
        position: fixed;
        background: rgba(255, 255, 255, 0.95);
        width: 500px;
    }

    #container-title {
        background: rgba(0, 0, 0, 0);
        /* height: 25px; */
        /* margin-top: 10px; */
        text-align: center;
        font-size: x-large;
        cursor: move;
    }

    #container-answers {
        /* margin: 0 10px; */
        border: black 1px solid;
        max-height: 400px;
        overflow-y: auto;
    }

    #container-answers hr {
        margin: 5px 0px;
    }

    .container-message {
        font-size: 16px;
        font-family: Georgia, 'Times New Roman', Times, serif;
        /* white-space: pre-wrap; */
        position: relative;
        animation: content_slide_in 0.5s;
        animation-timing-function: ease-out;
    }

    #container-check {
        /* margin-left: 10px; */
    }

    #container-setting {
        width: 23px;
        cursor: pointer;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    #container-setting:hover {
        filter: brightness(70%);
        color: rgb(0, 230, 227);
    }

    #container-setting-base {
        display: none;
        font-size: 16px;
        line-height: 100%;
        width: auto;
        margin: 20px;
        z-index: 101;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, 0%);
        background: rgba(255, 255, 255, 0.95);
        border: black 2px solid;
        border-radius: 20px;
        animation: slide_in 0.8s;
        animation-timing-function: ease-out;
    }

    #container-setting-base div.record {
        margin: 5px 0px;
        padding: 5px;
        display: table-row;
        text-align: center;
        animation: fade_in 0.5s;
    }

    #container-setting-base div.record.hidden {
        animation: fade_out 0.5s;
    }

    @keyframes fade_in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes fade_out {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes slide_in {
        from {
            left: 0%;
            opacity: 0;
        }

        80% {
            left: 53%;
        }

        to {
            left: 50%;
            opacity: 1;
        }
    }

    @keyframes content_slide_in {
        from {
            left: -50%;
            opacity: 0;
        }

        to {
            left: 0%;
            opacity: 1;
        }
    }

    #container-setting-base label[for] {
        display: table-cell;
        cursor: pointer;
        width: 80px;
    }

    #container-setting-base input {
        width: 100px;
        height: 25px;
        padding: 0px;
        border: black 1px solid;
        display: table-cell;
        margin: 2px 5px;
        text-align: center;
    }

    #container-setting-base select {
        display: table-cell;
        text-align: center;
        width: 50px;
        height: 25px;
        margin: 2px 5px;
        padding: 0px;
        border: black 1px solid;
    }

    #container-setting-base hr {
        margin: 5px;
    }

    #container-setting-base div.right {
        display: table-cell;
        text-align: left;
    }

    #setting-save {
        position: relative;
        margin: 5px;
        left: 50%;
        transform: translate(-55%, 5%);
    }

    #container:not(:hover) {
        filter: brightness(98%);
    }

    /* 滑块-------------------------------------------------------------------- */
    @keyframes slide_to_right {
        0% {
            width: 36px;
        }

        70% {
            left: 29px;
        }

        80% {
            border-radius: 10px;
        }

        100% {
            left: 26px;
        }
    }

    @keyframes slide_to_left {
        0% {
            width: 36px;
        }

        70% {
            left: -2px;
        }

        80% {
            border-radius: 10px;
        }

        100% {
            left: 1px;
        }
    }

    @keyframes widen_to_right {
        100% {
            width: 36px;
        }
    }

    @keyframes widen_to_left {
        0% {
            left: 26px;
        }

        100% {
            left: 13px;
            width: 36px;
        }
    }

    /* 限定label标签属性，也就是checkbox的包装器 */
    #container-setting-base .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 25px;
        margin: 2px 5px;
        border: black 1px solid;
        border-radius: 38px;
    }

    /* 不显示checkbox本身，通过点击外部的label实现点击input的效果 */
    #container-setting-base .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* 未选中，滑条效果 */
    #container-setting-base .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: .4s;
        border-radius: 38px;
        background-color: rgb(251, 251, 251);
    }

    /* 未选中，点击时滑条效果 */
    #container-setting-base input:not(:checked):active+.slider {
        background-color: rgb(187, 187, 187);
    }

    /* 选中时，滑条效果 */
    #container-setting-base input:checked+.slider {
        background-color: #2196F3;
    }

    /* 滑块是通过before插入的，并没有在DOM中加入代表滑块的元素 */
    #container-setting-base .slider:before {
        position: absolute;
        content: "";
        height: 23px;
        width: 23px;
        left: 1px;
        bottom: 1px;
        background-color: white;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.08);
        border-radius: 50%;
    }

    /* 未选中，点击时滑块效果 */
    #container-setting-base input:active+.slider:before {
        border-radius: 38px;
        animation-name: widen_to_right;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
    }

    /* 右移效果 */
    #container-setting-base input:checked+.slider:before {
        animation-name: slide_to_right;
        animation-duration: .4s;
        animation-fill-mode: forwards;
    }

    /* 已选中，点击时滑块效果 */
    #container-setting-base input:checked:active+.slider:before {
        animation-name: widen_to_left;
        animation-duration: 0.2s;
        animation-fill-mode: forwards;
    }

    /* 左移效果 */
    #container-setting-base input:not(:checked):not(:active)+.slider:before {
        left: 1px;
        animation-name: slide_to_left;
        animation-duration: .4s;
        animation-fill-mode: forwards;
    }

    #container-setting-base svg.arrow-down {
        position: relative;
        top: 5px;
        left: 0px;
        transition-duration: 0.5s;
    }

    #container-setting-base svg.arrow-down.opened {
        transform: rotate(180deg);
    }

    #container-setting-base div.title {
        font-size: 24px;
        text-align: center;
        cursor: pointer;
    }

    #container-setting-base div.main {
        margin: 0 10px;
    }`;

    let settingBase = document.createElement('div');
    settingBase.id = 'container-setting-base';
    settingBase.innerHTML = `
        <div class="main">
            <div class="title">用户设定<svg class="arrow-down opened" width="24" height="24">
                    <path
                        d="M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z"
                        fill-rule="evenodd"></path>
                </svg></div>
            <div class="record">
                <label for="userAccount">用户账户</label>
                <input id='userAccount'>
                <div class="setting right">随意设定，累计每个人贡献的题目数量</div>
            </div>
            <div class="record">
                <label for="userPoints">账户积分</label>
                <input id="userPoints" readonly value="0"></input>
                <div class="setting right">上传答案获取，暂无用处</div>
            </div>
        </div>
        <hr>
        <div class="main">
            <div class="title">辅助设定<svg class="arrow-down opened" width="24" height="24">
                    <path
                        d="M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z"
                        fill-rule="evenodd"></path>
                </svg></div>
            <div class="record">
                <label for="version">脚本版本</label>
                <input id='version' type="button" value="${USER_SETTINGS.version}">
                <div class="setting right">点击查询是否有新版本，悬浮窗标题为结果</div>
            </div>
            <div class="record">
                <label for="autoCopy">自动复制</label>
                <label class="switch"><input type="checkbox" id='autoCopy'>
                    <span class="slider"></span>
                </label>
                <div class="setting right">开启时，点击悬浮窗的对应消息自动复制到粘贴板</div>
            </div>
            <div class="record">
                <label for="autoSlide">自动下滑</label>
                <label class="switch"><input type="checkbox" id='autoSlide'>
                    <span class="slider"></span>
                </label>
                <div class="setting right">有新消息时，窗口是否自动下滑到新消息处</div>
            </div>
            <div class="record">
                <label for="debugMode">调试模式</label>
                <label class="switch"><input type="checkbox" id='debugMode'>
                    <span class="slider"></span>
                </label>
                <div class="setting right">调试用，正常使用不用开</div>
            </div>
        </div>
        <button id="setting-save">保存&刷新</button>
        `;

    let commentBase = document.createElement('div');
    commentBase.id = 'container-comment-base';
    commentBase.innerHTML = `
        <textarea placeholder="期待大家的反馈，因为手头没有账号，无法进行各种情况下的测试，如果有任何问题，都可以给我留言，我会定期查看。最好留下联系方式，方便后续交流。"></textarea>
    `;

    if (!document.querySelector('#container')) {
        document.body.appendChild(container);
        document.body.appendChild(settingBase);
        document.body.appendChild(commentBase);
        document.body.appendChild(style);

        title = document.querySelector('#container-title');
        answers = document.querySelector('#container-answers');
        setting = document.querySelector('#container-setting');
        checkButton = document.querySelector('#container-check');
        updateButton = document.querySelector('#version');
        commentButton = document.querySelector('#container-comment');
        points = document.querySelector('#userPoints');
        make_draggable(title, container);

        setting.addEventListener('click', () => {
            let settingBase = document.querySelector('#container-setting-base');
            settingBase.style.display = (settingBase.style.display == 'table') ? 'none' : 'table';
        }, false);

        checkButton.addEventListener('click', () => {
            answers.innerHTML = '';
            retrieve_all_questions();
        }, false);

        updateButton.addEventListener('click', () => {
            update_version();
        }, false);

        commentButton.addEventListener('click', () => {
            swal({
                title: "留言",
                content: commentBase,
                icon: "info",
                button: "发送",
            }).then(() => { send_comment(commentBase.firstElementChild.value); });
        }, false);

        initial_request();
    }

    //淡入淡出效果
    document.querySelectorAll('#container-setting-base .title').forEach(e => {
        e.addEventListener('click', () => {
            e.parentElement.querySelectorAll('.record').forEach(e => {
                if (e.classList.contains('hidden')) {
                    e.style.display = (e.style.display == "none") ? "" : "none";
                } else {
                    setTimeout(() => {
                        e.style.display = (e.style.display == "none") ? "" : "none";
                    }, 500);
                }
                e.classList.toggle('hidden');
            });
            e.querySelector('.arrow-down').classList.toggle('opened');
        }, false);
    });

    //从变量映射到DOM
    for (let [key, value] of Object.entries(USER_SETTINGS)) {
        let element = document.querySelector('#' + String(key));
        if (String(value) == "true") {
            element.setAttribute('checked', '');
        } else if (String(value) == "false") {
            continue;
        } else {
            element.value = value;
        }
    }

    //从DOM映射到存储
    document.querySelector('#setting-save').addEventListener('click', () => {
        for (let input of document.querySelectorAll('#container-setting-base input')) {
            if (input.value == "on") {
                USER_SETTINGS[input.id] = input.checked;
            } else {
                USER_SETTINGS[input.id] = input.value;
            }
        }
        GM_setValue('USER_SETTINGS', JSON.stringify(USER_SETTINGS));
        location.reload(true);
    }, false);
}

/*------------------------------------------------------------------------------------------------------------------------*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function get_answer(answerElement, questionElement) {
    let options = [], answer = '', answerId = '', realOptionIndex;
    if (answerElement && answerElement.matches('[class*="answer"]')) {
        let answerOption = answerElement.querySelector('p span').textContent;
        realOptionIndex = answerOption.toUpperCase().charCodeAt() - 65;
    }

    for (let [index, option] of questionElement.querySelectorAll('label').entries()) {
        let optionContent = option.textContent.replace(/\w*\)\s*/, '');
        options.push(optionContent);
        if (answerElement) {
            if (index == realOptionIndex) {
                answer = optionContent;
                answerId = option.querySelector('input').getAttribute('id');
            }
        }
    }
    return [options, answerId, answer];
}

function get_order(questionElement) {
    let number = /\s*(\d*)/.exec(questionElement.querySelector('.test_number').textContent)[1];
    add_to_container(number, 'normal');
}

async function retrieve_all_questions() {
    let t = 3000;
    for (let questionMain of document.querySelectorAll('.itemDiv')) {//都作为整体处理吧，这样事后还能自己做，有题干
        let sendQuestionType = null
            , sendQuestionId = ''
            , sendQuestion = ''
            , sendOptions = []
            , sendAnswerId = ''
            , sendAnswer = ''
            , sendContext = ''
            , sendFile = '';

        if (questionMain.querySelector('a[href^="javascript:PlaySound"]')) {
            sendQuestionType = 0;//听力选择题
        }
        else if (questionMain.querySelector('.col-md-8')) {
            sendQuestionType = 1;//阅读理解选择题
        }
        else if (questionMain.querySelector('.test_sty_5')) {
            sendQuestionType = 2;//小猫钓鱼(阅读理解填空题)
        }
        else if (questionMain.querySelector('.test_sty_6')) {
            sendQuestionType = 3;//下拉排序选择题
        }
        else {
            if (questionMain.querySelector('input[name^="rd"]')) {
                sendQuestionType = 4;//普通选择题
            }
            // else if (questionMain.querySelector('.test_sty_5')) {
            //     sendQuestionType = 5;//普通填空题——没遇到过
            // }
        }

        switch (sendQuestionType) {
            case 0://听力大题
                {
                    let mainAudio = questionMain.querySelector('a[href^="javascript:PlaySound"]');
                    let mainAudioFile = /'(.*?)'/.exec(mainAudio.getAttribute('href'))[1];
                    sendContext = 'https://courseres.sflep.com/Test/ItemRes/sound/' + mainAudioFile;
                    mainAudio.querySelector('span').textContent = "无限次播放机会";
                    mainAudio.addEventListener('click', async () => {
                        PlaySound(mainAudioFile);
                        await sleep(100);
                        mainAudio.querySelector('span').textContent = "无限次播放机会";
                    }, false);

                }

                for (let questionElement of questionMain.querySelectorAll('.test_hov')) {
                    await sleep(t);

                    let questionAudio = questionElement.querySelector('a[href^="javascript:PlaySound"]');
                    let questionAudioFile = /'(.*?)'/.exec(questionAudio.getAttribute('href'))[1];
                    questionAudio.querySelector('span').textContent = "无限次播放机会";
                    questionAudio.addEventListener('click', async () => {
                        PlaySound(questionAudioFile);
                        await sleep(100);
                        questionAudio.querySelector('span').textContent = "无限次播放机会";
                    }, false);

                    let questionId = questionElement.querySelector('input[name^="rd"][id$="_1"]').getAttribute('name');
                    let question = 'https://courseres.sflep.com/Test/ItemRes/sound/' + questionAudioFile;

                    let answerElement = questionElement.querySelector('[class*="answer"]');
                    let [options, answerId, answer] = get_answer(answerElement, questionElement);

                    get_order(questionElement);
                    simple_request(sendQuestionType, questionId, question, options, answerId, answer, sendContext);
                }
                break;

            case 1://阅读理解
                sendContext = questionMain.querySelector('.col-md-8').textContent.replace(/(.*?)following passage./, '').trim();

                for (let questionElement of questionMain.querySelectorAll('.col-md-4 .test_hov')) {
                    await sleep(t);

                    let questionId = questionElement.querySelector('input[id^="rd"][id$="_1"]').getAttribute('name');
                    let question = questionElement.querySelector('div').textContent.replace(/\d*\.\s*/, '');

                    let answerElement = questionElement.nextElementSibling;
                    let [options, answerId, answer] = get_answer(answerElement, questionElement);

                    let sendFile = questionId.replace(/_.*$/, '');//用sendFile作为对同一段原文的标识

                    get_order(questionElement);
                    simple_request(sendQuestionType, questionId, question, options, answerId, answer, sendContext, sendFile);
                }
                break;

            case 2://小猫钓鱼
                await sleep(t);
                sendContext = questionMain.querySelector(".test_sty_3").textContent.trim();

                for (let option of questionMain.querySelectorAll('.test_sty_5 span')) {
                    sendOptions.push(option.textContent);
                }

                {
                    let answerElement = questionMain.querySelector('[class*="answer"]');
                    if (answerElement) {
                        sendAnswer = answerElement.textContent.replace(/.*：\s*/, '');
                    }
                }

                sendQuestionId = questionMain.querySelector('input[id^="txt_"][id$="_1"]').getAttribute('id').replace(/_1$/, '');

                simple_request(sendQuestionType, sendQuestionId, '', sendOptions, '', sendAnswer, sendContext);
                break;

            case 3://下拉排序
                sendContext = questionMain.querySelector('.test_sty_6').textContent.trim();

                for (let questionElement of questionMain.querySelectorAll('.form-inline')) {
                    await sleep(t);

                    let answer = '';
                    let answerElement = questionMain.querySelector('[class*="answer"]');
                    if (answerElement) {
                        answer = questionElement.nextElementSibling.textContent.replace(/(.*?)：\s*/, '');
                    }

                    let question = questionElement.textContent.replace(/\d*\.\s*(\w*?)J/, '');
                    let questionId = questionElement.querySelector('select[id^="sl"]').getAttribute('id');
                    let sendFile = questionId.replace(/_.{1,3}$/, '');//用sendFile作为对同一段原文的标识

                    get_order(questionElement);
                    simple_request(sendQuestionType, questionId, question, [], '', answer, sendContext, sendFile);
                }
                break;

            case 4://普通选择
                for (let questionElement of questionMain.querySelectorAll('.test_hov')) {
                    await sleep(t);

                    let questionId = questionElement.querySelector('input[name^="rd"][id$="_1"]').getAttribute('name');
                    let question = questionElement.querySelector('div').textContent.replace(/\d*\.\s*/, '');

                    let answerElement = questionElement.querySelector('[class*="answer"]');
                    let [options, answerId, answer] = get_answer(answerElement, questionElement);

                    get_order(questionElement);
                    simple_request(sendQuestionType, questionId, question, options, answerId, answer, sendContext);
                }
                break;
        }
    }
}

function simple_request(sendQuestionType = null, sendQuestionId = '', sendQuestion = '', sendOptions = [],
    sendAnswerId = '', sendAnswer = '', sendContext = '', sendFile = '', queryType = 0) {
    if (USER_SETTINGS.debugMode) {
        console.log(`0 ${sendQuestionId}`);
        console.log(`1 ${sendQuestionType}`);
        console.log(`2 ${sendQuestion}`);
        console.log(`3 ${sendOptions}`);
        console.log(`4 ${sendAnswerId}`);
        console.log(`5 ${sendAnswer}`);
        console.log(`6 ${sendContext}`);
        console.log(`7 ${sendFile}`);
    }

    add_to_container(sendQuestion, 'normal');
    GM_xmlhttpRequest({
        // url: 'http://localhost:8000/welearn/query/',
        url: 'http://47.97.90.127:8000/welearn/query/',
        method: 'POST',
        headers: {},
        data: JSON.stringify({
            "questionId": sendQuestionId,
            "question": sendQuestion,
            'queryType': 1,
        }),
        timeout: 5000,
        onload: xhr => {
            if (xhr.status == 200) {
                let returnJson = JSON.parse(xhr.responseText);
                parse_ajax_response(returnJson);
                if (returnJson.status != 3)
                    full_post(sendQuestionType, sendQuestionId, sendQuestion, sendOptions,
                        sendAnswerId, sendAnswer, sendContext, sendFile, queryType);
            }
        },
        onerror: () => { add_to_container('查询失败，过段时间再试', 'error'); },
        ontimeout: () => { add_to_container('查询超时，过段时间再试', 'error'); },
    });
}

function full_post(sendQuestionType = null, sendQuestionId = '', sendQuestion = '', sendOptions = [],
    sendAnswerId = '', sendAnswer = '', sendContext = '', sendFile = '', queryType = 0) {
    GM_xmlhttpRequest({
        // url: 'http://localhost:8000/welearn/query/',
        url: 'http://47.97.90.127:8000/welearn/query/',
        method: 'POST',
        headers: {},
        data: JSON.stringify({//一次传一道题，或者一次传一个列表
            "questionType": sendQuestionType,
            "questionId": sendQuestionId,
            "question": sendQuestion,
            "options": sendOptions,
            "answerId": sendAnswerId,
            "answer": sendAnswer,
            "context": sendContext,
            "file": sendFile,
            'account': USER_SETTINGS.userAccount,
            'queryType': 0,
        }),
        timeout: 5000,
        onload: xhr => {
            if (xhr.status == 200) {
                parse_ajax_response(JSON.parse(xhr.responseText));
            }
        },
        onerror: () => { add_to_container('查询失败，过段时间再试', 'error'); },
        ontimeout: () => { add_to_container('查询超时，过段时间再试', 'error'); },
    });
}

function send_comment(string) {
    GM_xmlhttpRequest({
        url: 'http://47.97.90.127:8000/welearn/comment/',
        method: 'POST',//47.97.90.127
        headers: {},
        data: JSON.stringify({
            "message": string,
            'account': USER_SETTINGS.userAccount,
            "time": Date()
        }),
        timeout: 5000,
        onload: xhr => {
            if (xhr.status == 200) {
                add_to_container('留言成功', 'info');
            }
        },
        onerror: () => { add_to_container('留言失败，过段时间再试', 'error'); },
        ontimeout: () => { add_to_container('留言超时，过段时间再试', 'error'); },
    });
}

function parse_ajax_response(json) {
    console.log(json);

    let status = '';
    switch (json.status) {
        case 0:
            status = '新增收录题目，未收录答案';
            break;
        case 1:
            status = '新增收录题目，且收录答案';
            add_to_container(`用户${USER_SETTINGS.userAccount}积分+1`, 'info');
            break;
        case 2:
            status = '服务器已有题目，新增答案';
            add_to_container(`用户${USER_SETTINGS.userAccount}积分+1`, 'info');
            break;
        case 3:
            status = '服务器已有答案，返回答案';
            break;
        case 4:
            status = '服务器已有题目，没有答案';
            break;
        case 5:
            status = '服务器没有题目，没有答案';
            break;
        case 6:
            status = '没有标答，返回最可能答案';
            break;
    }
    add_to_container(status, 'info');

    let answer = json.answer;
    switch (json.status) {
        case 3:
            add_to_container(answer, 'answer');
            break;
        case 4:
        //fallthrough
        case 5:
            add_to_container('尚未收录答案', 'error');
            break;
        case 6:
            for (let [option, possibility] of Object.entries(answer)) {
                add_to_container(`${possibility} ${option}`, 'answer');
            }
    }
    //if 小猫钓鱼
    //auto_handle(json.answerId)

    if (answers.lastElementChild.textContent) {//前一条消息为空不添加
        let hr = document.createElement('hr');
        answers.appendChild(hr);
    }
}

function add_to_container(string, type = 'normal') {
    let div = document.createElement('div');
    div.classList.add('container-message');
    div.textContent = string;

    let color = '';
    switch (type) {
        case 'normal':
            break;
        case 'answer':
            color = 'green';
            break;
        case 'error':
            color = 'red';
            break;
        case 'info':
            color = 'blue';
            break;
    }
    div.style.color = color;

    //if(string=='播放xx')
    div.addEventListener('click', () => {
        if (USER_SETTINGS.autoCopy)
            GM_setClipboard(div.textContent, 'text');
    }, false);

    answers.appendChild(div);
    if (USER_SETTINGS.autoSlide)
        answers.scrollBy(0, 1000);
}

function change_status(string) {
    title.textContent = string;
}

function initial_request() {
    update_version();
    update_points();
}

function update_version() {
    GM_xmlhttpRequest({
        url: 'http://47.97.90.127:8000/welearn/version/',
        method: 'POST',//47.97.90.127
        headers: {},
        data: '',
        timeout: 5000,
        onload: xhr => {
            if (xhr.status == 200) {
                xhr.responseText > USER_SETTINGS.version ? change_status('有新发布版本') : change_status('已是最新版本');
            }
        },
        onerror: () => { add_to_container('查询版本失败', 'error'); },
        ontimeout: () => { add_to_container('查询版本超时', 'error'); },
    });
}

function update_points() {
    GM_xmlhttpRequest({
        url: 'http://47.97.90.127:8000/welearn/user/',
        method: 'POST',//47.97.90.127
        headers: {},
        data: JSON.stringify({
            'account': USER_SETTINGS.userAccount,
        }),
        timeout: 5000,
        onload: xhr => {
            if (xhr.status == 200) {
                points.textContent = xhr.responseText;
            }
        },
        onerror: () => { add_to_container('更新积分失败', 'error'); },
        ontimeout: () => { add_to_container('更新积分超时', 'error'); },
    });
}

create_container();
