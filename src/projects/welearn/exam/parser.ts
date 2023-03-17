import { sleep } from "@utils";
import { WELearnAPI } from "@api/welearn";
import { CONSTANT } from "@src/store";
// import { addMessage, clearMessage } from "@src/store/actions";
import logger from "@utils/logger";
import { store } from "@store";

/** 判断当前页面是否是详情/解析页面，或是答题页面 */
export function isFinished() {
    return (document.querySelector("#aSubmit") as HTMLElement).style.display == "none"
        ? true
        : false;
}

function getTaskId() {
    // https://welearn.sflep.com/test/schooltest.aspx?schooltestid=1330
    let isSchoolTest = false;
    let taskId: number;

    if (location.href.includes("schooltest")) {
        isSchoolTest = true;
        taskId = parseInt(/schooltestid=(\d*)/.exec(location.href)![1], 10);
    } else {
        taskId = parseInt(/taskid=(\d*)/.exec(location.href)![1], 10);
    }

    return {
        isSchoolTest,
        taskId,
    };
}

function getQuestionIndex(questionItemDiv: HTMLElement) {
    return /\s*(\d*)/.exec(<string>questionItemDiv.querySelector(".test_number")!.textContent)![1];
}

function getQuestionIds() {}

export async function getAnswers() {
    store.clearLogs();
    const { isSchoolTest, taskId } = getTaskId();

    if (isFinished()) {
        const domString = document.querySelector(".tab-content")!.outerHTML;
        await WELearnAPI.collectAll(taskId, domString, isSchoolTest);
    } else {
        const returnJson = await WELearnAPI.queryByTaskId(taskId, isSchoolTest);

        if (returnJson.status === true) {
            // 练习已收录
            for (const [index, questionWithAnswer] of returnJson.data.entries()) {
                // TODO 获取题号
                // logger.question({
                //     index: `${index + 1}`,
                //     answer: questionWithAnswer.answerText,
                //     info: {
                //         content: questionWithAnswer.answer_text
                //             ? "标答"
                //             : questionWithAnswer.answer_text_gpt
                //             ? "GPT"
                //             : "无答案",
                //     },
                // });
                // addMessage(index, "normal");
                // addMessage(questionWithAnswer.answerText as string, "success");

                await sleep(CONSTANT.QUERY_INTERVAL);
            }
        } else {
            // 练习未收录，单题dom查询
            for (const questionItemDiv of document.querySelectorAll<HTMLElement>(".itemDiv")) {
                const domString = questionItemDiv.outerHTML;

                try {
                    const questionWithAnswers = await WELearnAPI.queryByDomString(domString);

                    for (const questionWithAnswer of questionWithAnswers) {
                        try {
                            // addMessage(getQuestionIndex(questionItemDiv), "normal");
                        } catch (error) {}

                        if (questionWithAnswer.answerText) {
                            // addMessage(questionWithAnswer.answerText as string, "success");
                        } else {
                            // addMessage("该题尚未收录答案", "error");
                        }
                        // addMessage("", "hr");

                        await sleep(CONSTANT.QUERY_INTERVAL);
                    }
                } catch (error) {
                    logger.debug(error);
                }
            }
        }
    }
}
