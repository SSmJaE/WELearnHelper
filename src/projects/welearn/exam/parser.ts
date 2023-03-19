import { WELearnAPI } from "@api/welearn";
import { CONSTANT } from "@src/store";
import { store } from "@store";
import { sleep } from "@utils";
import logger from "@utils/logger";

/** 判断当前页面是否是详情/解析页面，或是答题页面 */
export function isFinished() {
    return (document.querySelector("#aSubmit") as HTMLElement).style.display == "none"
        ? true
        : false;

    // return false;
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
    // 在不同的Part间，保留查询按钮
    // 不管是测试页面还是解析页面，都会有按钮
    store.clearLogs(1);
    const { isSchoolTest, taskId } = getTaskId();

    if (isFinished()) {
        const domString = document.querySelector(".tab-content")!.outerHTML;
        await WELearnAPI.collectAll(taskId, domString, isSchoolTest);
    } else {
        const returnJson = await WELearnAPI.queryByTaskId(taskId, isSchoolTest);

        if (returnJson.status === true) {
            // 练习已收录

            const questionCount = returnJson.data.length;

            for (const [index, questionWithAnswer] of returnJson.data.entries()) {
                logger.question({
                    // TODO 获取真实题号，从答题卡上，对应的question_id判断
                    order: `${String(index + 1).padStart(2, "0")} / ${questionCount}`,
                    info: {
                        content: questionWithAnswer.answer_text
                            ? "标答"
                            : questionWithAnswer.answer_text_gpt
                            ? "GPT"
                            : "无答案",
                    },
                    answerText:
                        questionWithAnswer.answer_text ||
                        questionWithAnswer.answer_text_gpt ||
                        "尚未收录答案",
                    raw: {},
                    solve: {
                        couldSolve: false,
                        hasSolved: false,
                        solveThis: (answerText: string) => {},
                    },
                });

                await sleep(CONSTANT.QUERY_INTERVAL);
            }
        } else {
            // 练习未收录，单题dom查询
            for (const questionItemDiv of document.querySelectorAll<HTMLElement>(".itemDiv")) {
                const domString = questionItemDiv.outerHTML;

                try {
                    const questionWithAnswers = await WELearnAPI.queryByDomString(domString);

                    for (const questionWithAnswer of questionWithAnswers) {
                        // 获取真实题号
                        let questionIndex = "_";
                        let questionIndexString = "_";

                        try {
                            questionIndex = getQuestionIndex(questionItemDiv);
                            questionIndexString = String(questionIndex).padStart(2, "0");
                        } catch (error) {}

                        logger.question({
                            order: `${questionIndexString}`,
                            info: {
                                content: questionWithAnswer.answer_text
                                    ? "标答"
                                    : questionWithAnswer.answer_text_gpt
                                    ? "GPT"
                                    : "无答案",
                            },
                            answerText:
                                questionWithAnswer.answer_text ||
                                questionWithAnswer.answer_text_gpt ||
                                "尚未收录答案",
                            raw: {},
                            solve: {
                                couldSolve: false,
                                hasSolved: false,
                                solveThis: (answerText: string) => {},
                            },
                        });

                        await sleep(CONSTANT.QUERY_INTERVAL);
                    }
                } catch (error) {
                    logger.debug(error);
                }
            }
        }
    }
}
