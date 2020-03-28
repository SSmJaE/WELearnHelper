// ==UserScript==
// @name         WELearn英语网课答案显示
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  悬浮窗显示选择题、填空题、判断题、连线题答案，口语参考文本，支持单元测试
// @author       SSmJaE
// @match        https://course.sflep.com/*
// @match        https://centercourseware.sflep.com/*
// @match        https://welearn.sflep.com/*
// @grant        GM_xmlhttpRequest
// @connect      *
// @license      MIT
// ==/UserScript==
(function () {
    'use strict';

    var container, title, bufferUrl;
    var parser = new DOMParser();
    const MANIFEST = [
        'new%20century%20college%20english%20secedition%20integration%201',
        'new%20century%20college%20english%20secedition%20integration%202',
        'new%20century%20college%20english%20secedition%20integration%203',
        'new%20century%20college%20english%20secedition%20integration%204',
        'an%20integrated%20skills%20course%20(2nd%20edition)%201%20for%20vocational%20college%20english',
        'an%20integrated%20skills%20course%20(2nd%20edition)%202%20for%20vocational%20college%20english',
        'an%20integrated%20skills%20course%20(2nd%20edition)%203%20for%20vocational%20college%20english',
        'an%20integrated%20skills%20course%20(2nd%20edition)%204%20for%20vocational%20college%20english',
        'an%20integrated%20skills%20course%201',
        'an%20integrated%20skills%20course%202',
    ];
    const ORIGIN = [
        'new%20target%20college%20english%20integrated%20course%201',
        'new%20target%20college%20english%20integrated%20course%202',
        'new%20target%20college%20english%20integrated%20course%203',
        'new%20target%20college%20english%20integrated%20course%204',
        'new%20progressive%20college%20english%20integrated%20course%201',
        'new%20progressive%20college%20english%20integrated%20course%202',
        'new%20progressive%20college%20english%20integrated%20course%203',
        'new%20progressive%20college%20english%20integrated%20course%204',
    ]

    function createContainer() {
        container = document.createElement('div');
        container.id = 'container';
        container.setAttribute('style', "top: 100px; left: 100px; margin: 0 auto; z-index: 99; border-radius: 8px;" +
            " box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);" +
            " position: absolute; background: #fff; min-width: 150px;max-width:400px; max-height: 500px; min-height: 100px;overflow:auto;")
        container.style.visibility = 'hidden';
        if (!top.document.querySelector('#container')) {
            top.document.body.appendChild(container);
        }

        title = document.createElement('div');
        title.textContent = '参考答案';
        title.setAttribute("style", "background: inherit; height: 25px; margin-top: 10px; text-align: center; font-size: x-large");
        container.appendChild(title);
    }

    function isShow() {
        container.childNodes.length > 1 ? container.style.visibility = 'visible' : container.style.visibility = 'hidden';
    }

    function emptyContainer() {
        container.innerHTML = '';
        container.appendChild(title);
        isShow();
    }

    function makeDraggable(elem) {
        document.mouseState = 'up'
        elem.mouseState = 'up'
        elem.lastMousePosY = null
        elem.lastMousePosX = null
        elem.proposedNewPosY = parseInt(elem.style.top, 10)
        elem.proposedNewPosX = parseInt(elem.style.left, 10)
        document.onmousedown = _ => {
            document.mouseState = 'down'
        }

        document.onmouseup = _ => {
            document.mouseState = 'up'
            elem.mouseState = 'up'
        }
        elem.onmousedown = e => {
            elem.lastMousePosY = e.pageY
            elem.lastMousePosX = e.pageX
            elem.mouseState = 'down'
            document.mouseState = 'down'
            document.onselectstart = e => {
                e.preventDefault()
                return false
            }
        }
        elem.onmouseup = e => {
            elem.mouseState = 'up'
            document.mouseState = 'up'
            document.onselectstart = null
        }
        const getAtInt = (obj, attrib) => parseInt(obj.style[attrib], 10)
        document.onmousemove = e => {
            if ((document.mouseState === 'down') && (elem.mouseState === 'down')) {
                elem.proposedNewPosY = getAtInt(elem.parentElement, 'top') + e.pageY - elem.lastMousePosY
                elem.proposedNewPosX = getAtInt(elem.parentElement, 'left') + e.pageX - elem.lastMousePosX
                if (elem.proposedNewPosY < 0) {
                    elem.parentElement.style.top = "0px"
                } else if (elem.proposedNewPosY > window.innerHeight - getAtInt(elem.parentElement, 'height')) {
                    elem.parentElement.style.top = window.innerHeight - getAtInt(elem.parentElement, 'height') + 'px'
                } else {
                    elem.parentElement.style.top = elem.proposedNewPosY + 'px'
                }
                if (elem.proposedNewPosX < 0) {
                    elem.parentElement.style.left = "0px"
                } else if (elem.proposedNewPosX > window.innerWidth - getAtInt(elem.parentElement, 'width')) {
                    elem.parentElement.style.left = window.innerWidth - getAtInt(elem.parentElement, 'width') + 'px'
                } else {
                    elem.parentElement.style.left = elem.proposedNewPosX + 'px'
                }
                elem.lastMousePosY = e.pageY
                elem.lastMousePosX = e.pageX
            }
        }
    }

    function addToContainer(htmlDOM, answers) {
        if (answers.length > 0) {
            for (let i = 0; i < answers.length; i++) {
                let content = document.createElement('div');
                let tag = answers[i].tagName;
                switch (tag) {
                    case 'ET-BLANK':
                        content.textContent = answers[i].textContent;
                        break;
                    case 'ET-TOF':
                    case 'ET-CHOICE':
                    case 'ET-MATCHING':
                        content.textContent = answers[i].getAttribute('key');
                        break;
                    case 'ET-REFERENCE':
                        content.innerHTML = answers[i].innerHTML;
                        break;
                    case 'VALUE':
                        (() => {
                            let identifier = answers[i].textContent
                            if (identifier.length == 36) { //选择题
                                let selector = '[identifier="' + identifier + '"]';
                                content.textContent = htmlDOM.querySelector(selector).textContent;

                            } else if (identifier.length > 36) { //纠错题
                                let selectors = identifier.split(',');
                                for (let i = 0; i < selectors.length; i++) {
                                    let selector = '[identifier="' + selectors[i] + '"]';
                                    content.innerHTML += htmlDOM.querySelector(selector).textContent + "<br>";
                                }
                            } else { //填空题
                                content.textContent = answers[i].textContent;
                            }
                        })();
                        break;
                    default:
                        (() => {
                            if (answers[i].hasAttribute('data-solution')) {
                                let answer = answers[i].getAttribute('data-solution');
                                if (!answer.length) {
                                    content.textContent = answers[i].firstElementChild.textContent;
                                } else {
                                    content.textContent = answer;
                                }
                            }
                        })();
                        break;
                }
                content.setAttribute('style', "margin: 10px 10px; color: orange; font-size: medium;" +
                    "font-family:Georgia, 'Times New Roman', Times, serif; ")
                container.appendChild(content);

            }
        }
    }

    function parseAjax(htmlDOM) {
        emptyContainer();
        let tof = htmlDOM.querySelectorAll('et-tof'); //判断题
        let blank = htmlDOM.querySelectorAll('et-blank'); //问答题+填空题
        let choice = htmlDOM.querySelectorAll('et-choice'); //选择题(二选一，多选)
        let matching = htmlDOM.querySelectorAll('et-matching'); //连线题
        let reference = htmlDOM.querySelectorAll('et-reference'); //口语参考
        let identifier = htmlDOM.querySelectorAll('correctresponse value'); //identifier类型
        addToContainer(htmlDOM, tof);
        addToContainer(htmlDOM, blank);
        addToContainer(htmlDOM, choice);
        addToContainer(htmlDOM, matching);
        addToContainer(htmlDOM, reference);
        addToContainer(htmlDOM, identifier);
        isShow();
    }

    function queryManifest(manifestUrl, identifier, courseInfo) {
        GM_xmlhttpRequest({
            method: "GET",
            url: manifestUrl,
            onload: response => {
                let html = response.response;
                let htmlDOM = parser.parseFromString(html, 'text/html');
                let selector = 'resource[identifier="' + identifier + '"] file';
                let resource = htmlDOM.querySelector(selector).getAttribute('href');
                let answerUrl = 'https://centercourseware.sflep.com/' + courseInfo + '/' + resource;
                getAjax(answerUrl);
            }
        });
    }

    function getCurrentUrl() {
        let currentUrl;
        try {
            currentUrl = document.querySelector('div.courseware_main_1').firstElementChild.src;
        } catch (error) {
            currentUrl = top.frames[0].location.href;
        }
        return currentUrl;
    }

    function getAjax(answerUrl) {
        GM_xmlhttpRequest({
            method: "GET",
            url: answerUrl,
            onload: response => {
                let html = response.response;
                let htmlDOM = parser.parseFromString(html, 'text/html');
                // console.log(htmlDOM);
                parseAjax(htmlDOM);
            }
        });
    }

    function getResource(answerUrl) {
        let courseInfo = /com\/(.*?)\//.exec(answerUrl)[1];
        let identifier;
        try {
            identifier = /#(.*)\?/.exec(answerUrl)[1];
        } catch (error) {}

        if (MANIFEST.includes(courseInfo)) {
            let manifestUrl = 'https://centercourseware.sflep.com/' + courseInfo + '/resource/manifest.xml';
            queryManifest(manifestUrl, identifier, courseInfo);
        } else if (ORIGIN.includes(courseInfo)) {
            setTimeout(() => {
                let answers = top.frames[0].document.querySelectorAll('[data-solution]');
                addToContainer('', answers);
                isShow();
            }, 2000);
        } else {
            answerUrl = 'https://centercourseware.sflep.com/' + courseInfo + '/data' + identifier + '.html';
            getAjax(answerUrl);
        }
    }

    function isChange() {
        let currentUrl = getCurrentUrl();
        if (currentUrl != bufferUrl) {
            emptyContainer();
            getResource(currentUrl);
        }
        bufferUrl = currentUrl;
    }

    createContainer();
    makeDraggable(title);
    isChange();
    setInterval(isChange, 5000);
})();