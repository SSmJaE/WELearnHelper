import request from "@utils/request";
import { addMessage, requestErrorHandler } from "@utils/common";
import { Global, DEBUG_MODE, VERSION } from "@src/global";

//todo question=>questionText
interface Question {
    questionType: number;
    questionId: string;
    question: string | null;
    options: string[];
    answerId: string | null;
    answer: string | null;
    context: string | null;
    file: string | null;
}

interface QuestionResponse {
    status: number;
    questionType: number;
    questionId: string;
    answerId?: string;
    answer: string | null;
}

interface checkVersionReturn {
    status: boolean;
    message: string;
}

export class Requests {
    @requestErrorHandler()
    static async simpleRequest(question: Question, queryType = 1) {
        if (DEBUG_MODE) {
            // console.log(`0 ${sendQuestionId}`);
            // console.log(`1 ${sendQuestionType}`);
            // console.log(`2 ${sendQuestion}`);
            // console.log(`3 ${sendOptions}`);
            // console.log(`4 ${sendAnswerId}`);
            // console.log(`5 ${sendAnswer}`);
            // console.log(`6 ${sendContext}`);
            // console.log(`7 ${sendFile}`);
            console.log(question);
        }

        const response = await request("/query/", {
            method: "POST",
            body: {
                questionId: question.questionId,
                question: question.question,
                queryType: queryType,
            },
        });

        let returnJson = <QuestionResponse>response.response;
        addMessage(<string>question.question, "normal");
        parseResponse(returnJson);
        if (returnJson.status != 3) this.fullPost(question);
    }

    @requestErrorHandler()
    static async fullPost(question: Question, queryType = 0) {
        const response = await request("/query/", {
            method: "POST",
            body: {
                question: question,
                account: Global.USER_SETTINGS.userAccount,
                queryType: queryType,
            },
        });
        parseResponse(<QuestionResponse>response.response);
    }

    @requestErrorHandler()
    static async collectAnswers(questions: any[]) {
        await request("/collect/", {
            method: "POST",
            body: {
                account: Global.USER_SETTINGS.userAccount,
                questions: questions,
            },
        });
        addMessage(
            "当前页面答案收录成功，可以切换下一页手动点击查询按钮上传，或者上传其它练习的答案",
            "info",
        );
    }

    @requestErrorHandler("留言失败")
    static async sendComment(message: string) {
        await request("/comment/", {
            method: "POST",
            body: {
                message: message,
                account: Global.USER_SETTINGS.userAccount,
                time: new Date().toISOString(),
            },
        });
        addMessage("留言成功", "info");
    }

    // @requestErrorHandler()
    static async initial() {
        const CURRENT_DATE = new Date().toISOString().slice(0, 10);
        const LAST_CHECK_DATE = GM_getValue("LAST_CHECK_DATE", "2020-01-01");
        if (CURRENT_DATE > LAST_CHECK_DATE) {
            const response = await request("/initial/", {
                method: "POST",
                body: {
                    version: VERSION,
                },
            });
            const checkVersionReturnJson = response.response as checkVersionReturn;

            if (checkVersionReturnJson.status) {
                addMessage(checkVersionReturnJson.message, "info");
                GM_setValue("LAST_CHECK_DATE", CURRENT_DATE);
            }
        }
    }

    // @requestErrorHandler()
    static async updatePoints() {
        const response = await request("/user/", {
            method: "POST",
            body: { account: Global.USER_SETTINGS.userAccount },
        });
        Global.USER_SETTINGS.userPoints = parseInt(response.responseText, 10);
    }
}

function parseResponse(json: QuestionResponse) {
    console.log(json);

    let status = "";
    switch (json.status) {
        case 0:
            status = "新增收录题目，未收录答案";
            break;
        case 1:
            status = "新增收录题目，且收录答案";
            addMessage(status, "info");
            addMessage(`用户${Global.USER_SETTINGS.userAccount}积分+1`, "info");
            break;
        case 2:
            status = "服务器已有题目，新增答案";
            addMessage(status, "info");
            addMessage(`用户${Global.USER_SETTINGS.userAccount}积分+1`, "info");
            break;
        case 3:
            status = "服务器已有答案，返回答案";
            break;
        case 4:
            status = "服务器已有题目，没有答案";
            break;
        case 5:
            status = "服务器没有题目，没有答案";
            break;
        case 6:
            status = "没有标答，返回最可能答案";
            break;
    }
    // addMessage(status, "info");

    let answer = json.answer;
    switch (json.status) {
        case 3:
            addMessage(answer, "success");
            break;
        case 4:
        //fallthrough
        case 5:
            addMessage("尚未收录答案", "error");
            break;
        case 6:
            for (let [option, possibility] of Object.entries(<string>answer)) {
                addMessage(`${possibility} ${option}`, "success");
            }
    }

    if (Global.messages)
        if (Global.messages[Global.messages.length - 1].info)
            //前一条消息为空不添加
            addMessage("", "hr");
}
