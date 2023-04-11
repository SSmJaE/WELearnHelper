import { WELearnAPI } from "@api/welearn";
import { CONSTANT } from "@src/store";
import { store } from "@store";
import { sleep } from "@utils";
import logger, { IDynamicButton } from "@utils/logger";

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
    let taskId: string;

    if (location.href.includes("schooltest")) {
        isSchoolTest = true;
        taskId = /schooltestid=(\d*)/.exec(location.href)![1];
    } else {
        taskId = /taskid=(\d*)/.exec(location.href)![1];
    }

    return {
        isSchoolTest,
        taskId,
    };
}

function getPartIndex() {
    let index: number | undefined = undefined;

    for (const [index, element] of document.querySelectorAll("#ulParts > li").entries()) {
        if (element.classList.contains("active")) {
            return index + 1;
        }
    }

    if (!index) {
        throw new Error("无法获取PartIndex");
    }
}

/** 获取真实题号 */
function getQuestionIndex(questionItemDiv: HTMLElement) {
    const indexOfQuestions: string[] = [];

    for (const element of questionItemDiv.querySelectorAll('span[id^="question_"]')) {
        // 有些题型，test number可能不存在，比如小猫钓鱼
        // id一定存在
        const index = /question_(\d*)/.exec(<string>element.id)![1];
        indexOfQuestions.push(index);
    }

    return indexOfQuestions;
}

async function querySingleQuestion(questionItemDiv: HTMLElement) {
    const domString = questionItemDiv.outerHTML;
    const questionWithAnswers = await WELearnAPI.queryByDomString(domString);

    for (const [index, questionWithAnswer] of questionWithAnswers.entries()) {
        let questionIndex = "_";
        let questionIndexString = "_";

        try {
            questionIndex = getQuestionIndex(questionItemDiv)[index] || "_";
            questionIndexString = String(questionIndex).padStart(2, "0");
        } catch (error) {}

        const isListening = !!questionItemDiv.querySelector('a[href^="javascript:PlaySound"]');

        const replayButton: IDynamicButton = {
            children: "播放音频",
            onClick: () => {
                const mainAudio = <HTMLElement>(
                    questionItemDiv.querySelector('a[href^="javascript:PlaySound"]')
                );
                const mainAudioFile = /'(.*?)'/.exec(<string>mainAudio.getAttribute("href"))![1];

                logger.debug(mainAudioFile);

                PlaySound(mainAudioFile);
            },
        };

        logger.question({
            content: {
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
                raw: {
                    element: questionItemDiv,
                },
                solve: {
                    couldSolve: false,
                    hasSolved: false,
                    solveThis: (answerText: string) => {},
                },
            },
            action: isListening ? [replayButton] : undefined,
        });

        await sleep(CONSTANT.QUERY_INTERVAL);
    }
}

export async function getAnswers() {
    // 在不同的Part间，保留查询按钮
    // 不管是测试页面还是解析页面，都会有按钮
    store.clearLogs(1);

    const { isSchoolTest, taskId } = getTaskId();

    if (isFinished()) {
        try {
            const domString = document.querySelector(".tab-content")!.outerHTML;
            const questionItemDivNodes = document.querySelectorAll<HTMLElement>(".itemDiv");

            const html_string = document.head.innerHTML;

            const tt_id = /ttid\s*:\s*(-?\d*)/.exec(html_string);
            const sheet_id = /sheetid\s*:\s*(-?\d*)/.exec(html_string);
            const stt_id = /sttid\s*:\s*(-?\d*)/.exec(html_string);

            await WELearnAPI.collectAll({
                dom_string: domString,
                typical: !!questionItemDivNodes.length,
                is_school_test: isSchoolTest,
                part_index: getPartIndex() || null,
                task_id: taskId,
                tt_id: tt_id ? tt_id[1] : null,
                sheet_id: sheet_id ? sheet_id[1] : null,
                stt_id: stt_id ? stt_id[1] : null,
            });
        } catch (e) {
            logger.debug(e);
        }
    } else {
        // let hasCollected = false;
        // let collectedQuestions: IQuestionWithAnswer[] = [];

        const questionItemDivNodes = document.querySelectorAll<HTMLElement>(".itemDiv");

        // 练习未收录，单题dom查询
        for (const [index, questionItemDiv] of questionItemDivNodes.entries()) {
            // let questionWithAnswers: IQuestionWithAnswer[] = [];

            // 至少存在一个itemDiv == 是典型测试页面
            if (index === 0) {
                // const returnJson = await WELearnAPI.queryByTaskId(taskId, isSchoolTest, domString);
                // if (returnJson.status === true) {
                //     hasCollected = true;
                //     collectedQuestions = returnJson.data;
                //     break;
                // }else{
                //     //  合并请求
                //     questionWithAnswers = returnJson.data;
                // }
            }

            try {
                await querySingleQuestion(questionItemDiv);
            } catch (error) {
                logger.debug(error);
            }
        }

        // if (hasCollected) {
        //     // 练习已收录

        //     const questionCount = collectedQuestions.length;

        //     for (const [index, questionWithAnswer] of collectedQuestions.entries()) {
        //         logger.question({
        //             content: {
        //                 order: `${String(index + 1).padStart(2, "0")} / ${questionCount}`,
        //                 info: {
        //                     content: questionWithAnswer.answer_text
        //                         ? "标答"
        //                         : questionWithAnswer.answer_text_gpt
        //                         ? "GPT"
        //                         : "无答案",
        //                 },
        //                 answerText:
        //                     questionWithAnswer.answer_text ||
        //                     questionWithAnswer.answer_text_gpt ||
        //                     "尚未收录答案",
        //                 raw: {},
        //                 solve: {
        //                     couldSolve: false,
        //                     hasSolved: false,
        //                     solveThis: (answerText: string) => {},
        //                 },
        //             },
        //         });

        //         await sleep(CONSTANT.QUERY_INTERVAL);
        //     }
        // }
    }
}
