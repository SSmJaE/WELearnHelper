import logger from "@/src/utils/logger";
import { WELearnAPI } from "@api/welearn";
import { store } from "@src/store";

import { getAnswers, isFinished } from "./parser";
import { hackPlaySound } from "./utils";

if (location.href.includes(".sflep.com/test/")) {
    const finished = isFinished();

    const recordId = `${Math.random()}`;

    const buttonInfo = {
        children: `${finished ? "上传" : "查询"}当前Part`,
        disabled: 5000,
        onClick() {
            getAnswers();

            // const currentRecord = store.getRecordById(recordId);

            // logger.debug(currentRecord);

            // if (currentRecord?.action) {
            //     store.updateRecord({
            //         id: recordId,
            //         action: [
            //             {
            //                 ...buttonInfo,
            //                 disabled: true,
            //             },
            //         ],
            //     });

            //     logger.debug(store.logs);

            //     setTimeout(() => {
            //         logger.debug("in timeout", store.logs);

            //         store.updateRecord({
            //             id: recordId,
            //             action: [
            //                 {
            //                     ...buttonInfo,
            //                     disabled: false,
            //                 },
            //             ],
            //         });
            //     }, 5000);
            // }
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
