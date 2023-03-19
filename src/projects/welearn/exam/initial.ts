import logger from "@/src/utils/logger";
import { WELearnAPI } from "@api/welearn";
import { store } from "@src/store";

import { getAnswers, isFinished } from "./parser";
import { hackPlaySound } from "./utils";

if (location.href.includes(".sflep.com/test/")) {
    const finished = isFinished();

    logger.info(
        (isFinished()
            ? "检测到当前位于解析页面，点击本条消息右侧的上传按钮，以收录答案"
            : "检测到当前位于测试页面，点击本条消息右侧的查询按钮，以开始查询") +
            "<br />❗❗❗测试的每一个Part，都需要点击一次",
        undefined,
        [
            {
                children: `${finished ? "上传" : "查询"}当前Part`,
                onClick() {
                    getAnswers();
                    // TODO 实现disable能力，需要能获取到当前record
                    // 可以手动提供id，这样，这里就可以通过id查询到record
                    // this.disabled = true;
                    // setTimeout(() => {
                    //     this.disabled = false;
                    // }, 5000);
                },
            },
        ],
    );

    // setTimeout(() => {
    //     if (isFinished()) {
    //         getAnswers();
    //     } else {
    //         if (store.userSettings.infiniteListening) {
    //             hackPlaySound();
    //         }
    //     }
    // }, 5000);
}

if (location.href.includes(".sflep.com/student/course_info.aspx?")) {
    WELearnAPI.upload();
}
