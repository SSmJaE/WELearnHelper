import { sleep } from "@utils/common";
import { Requests } from "@utils/requests";
import { QUERY_INTERVAL } from "@src/store";
import { addMessage, clearMessage } from "@src/store/actions";

/** 判断当前页面是否是详情/解析页面，或是答题页面 */
export function isFinished() {
    return (document.querySelector("#aSubmit") as HTMLElement).style.display == "none"
        ? true
        : false;
}

function getTaskId() {
    return parseInt(/taskid=(\d*)/.exec(location.href)![1], 10);
}

function getQuestionIndex(questionItemDiv: HTMLElement) {
    return /\s*(\d*)/.exec(<string>questionItemDiv.querySelector(".test_number")!.textContent)![1];
}

function getQuestionIds() {}

export async function getAnswers() {
    clearMessage();
    const taskId = getTaskId();

    if (isFinished()) {
        const domString = document.querySelector(".tab-content")!.outerHTML;
        Requests.collectAll(taskId, domString);
    } else {
        const returnJson = await Requests.queryByTaskId(taskId);

        if (returnJson.status === true) {
            // 练习已收录
            for (const [index, questionWithAnswer] of returnJson.data.entries()) {
                // todo 获取题号
                addMessage(index, "normal");
                addMessage(questionWithAnswer.answerText as string, "success");

                await sleep(QUERY_INTERVAL);
            }
        } else {
            // 练习未收录，单题dom查询
            for (const questionItemDiv of document.querySelectorAll<HTMLElement>(".itemDiv")) {
                const domString = questionItemDiv.outerHTML;
                const questionWithAnswers = await Requests.queryByDomString(domString);

                for (const questionWithAnswer of questionWithAnswers) {
                    try {
                        addMessage(getQuestionIndex(questionItemDiv), "normal");
                    } catch (error) {}

                    if (questionWithAnswer.answerText) {
                        addMessage(questionWithAnswer.answerText as string, "success");
                    } else {
                        addMessage("该题尚未收录答案", "error");
                    }
                    addMessage("", "hr");

                    await sleep(QUERY_INTERVAL);
                }
            }
        }
    }
}
