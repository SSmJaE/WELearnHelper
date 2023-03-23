import logger from "@/src/utils/logger";
import { sleep } from "@/src/utils";
import { WELearnAPI } from "@api/welearn";
import { store } from "@src/store";

import { getAnswers, isFinished } from "./parser";
import { hackPlaySound } from "./utils";

// 确保页面已经加载完成，扩展有可能先于页面加载完成
// ~onLoad不一定靠谱，因为页面上本身也会执行js，这就有了额外的延迟~
// https://welearn.sflep.com/test/Test.aspx 返回的页面中，直接就可以获取到#aSubmit，所以onLoad很靠谱
// 手机上(页面加载过慢)，onLoad也不靠谱，还是手动判断一下好了
let isPageReady = false;
let elapsedTime = 0;

function checkPageReady() {
    const element = document.querySelector("#aSubmit");
    if (element) {
        isPageReady = true;
    }
}

async function watcher() {
    while (!isPageReady || elapsedTime > 10000) {
        await sleep(200);
        elapsedTime += 200;
        checkPageReady();
    }

    logger.debug(`页面加载完成，耗时${elapsedTime}ms`);

    notify();
}

function notify() {
    logger.debug("页面加载完成，开始检测完成情况");

    const finished = isFinished();

    const recordId = `${Math.random()}`;

    const buttonInfo = {
        children: `${finished ? "上传" : "查询"}当前Part`,
        disabled: 5000,
        onClick() {
            getAnswers();
        },
    };

    logger.info({
        id: recordId,
        content:
            (finished
                ? "检测到当前位于解析页面，点击本条消息右侧的上传按钮，以收录答案"
                : "检测到当前位于测试页面，点击本条消息右侧的查询按钮，以开始查询") +
            "<br />❗❗❗测试的每一个Part，都需要点击一次",
        extra: undefined,
        action: [buttonInfo],
    });
}

if (location.href.includes(".sflep.com/test/")) {
    await watcher();
}

if (location.href.includes(".sflep.com/student/course_info.aspx?")) {
    WELearnAPI.upload();
}
