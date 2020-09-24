import { addMessage, sleep } from "@utils/common";
import { Global, QUERY_INTERVAL } from "@src/global";
import { Requests } from "./requests";
import { types } from "util";

interface Question {
    questionType: number;
    questionId: string;
    question: string | null;
    options: string | string[];
    answerId: string | null;
    answer: string | null;
    context: string | null;
    file: string | null;
}

enum TYPES {
    LISTENING, //听力选择题(大题形式)
    READING_COMPREHENSION, //阅读理解选择题
    READING_COMPLETION, //小猫钓鱼(阅读理解填空题)
    ORDERING, //下拉排序选择题
    SINGLE_CHOICE, //普通选择题
}

let addOrderFlag = false;
function get_order(questionElement: Element) {
    let number = /\s*(\d*)/.exec(
        <string>questionElement.querySelector(".test_number")!.textContent,
    )![1];
    if (addOrderFlag) addMessage(number);
}

function get_answer(
    answerElement: Element | HTMLElement | null,
    questionElement: Element | HTMLElement,
) {
    let options: string[] = [],
        answer: string | null = null,
        answerId: string | null = null,
        realOptionIndex;
    if (answerElement && answerElement.matches('[class*="answer"]')) {
        let answerOption = (<HTMLElement>answerElement.querySelector("p span")).textContent;
        realOptionIndex = (<string>answerOption).toUpperCase().charCodeAt(0) - 65;
    }

    for (let [index, option] of questionElement.querySelectorAll("label").entries()) {
        let optionContent = (<string>option.textContent).replace(/\w*\)\s*/, "");
        options.push(optionContent);
        if (answerElement) {
            if (index == realOptionIndex) {
                answer = optionContent;
                answerId = <string>(<HTMLElement>option.querySelector("input")).getAttribute("id");
            }
        }
    }
    return [options, answerId, answer];
}

// interface ParseFunction {
//     (questionMain: HTMLElement): Generator<any, any, any>;
// }

function* parseListening(questionMain: HTMLElement) {
    let mainAudio = <HTMLElement>questionMain.querySelector('a[href^="javascript:PlaySound"]');
    let mainAudioFile = /'(.*?)'/.exec(<string>mainAudio.getAttribute("href"))![1];
    let sendContext = "https://courseres.sflep.com/Test/ItemRes/sound/" + mainAudioFile;

    mainAudio.querySelector("span")!.textContent = "无限次播放机会";

    for (let questionElement of questionMain.querySelectorAll(".test_hov")) {
        let questionAudio = <HTMLElement>(
            questionElement.querySelector('a[href^="javascript:PlaySound"]')
        );
        questionAudio.querySelector("span")!.textContent = "无限次播放机会";

        let questionAudioFile = /'(.*?)'/.exec(<string>questionAudio.getAttribute("href"))![1];

        let questionId = <string>(
            questionElement.querySelector('input[name^="rd"][id$="_1"]')!.getAttribute("name")
        );
        let question = "https://courseres.sflep.com/Test/ItemRes/sound/" + questionAudioFile;

        let answerElement = <HTMLElement>questionElement.querySelector('[class*="answer"]');
        let [options, answerId, answer] = get_answer(answerElement, <HTMLElement>questionElement);
        get_order(questionElement);

        yield {
            questionType: TYPES.LISTENING,
            questionId: questionId,
            question: question,
            options: <string[]>options,
            answerId: <string | null>answerId,
            answer: <string | null>answer,
            context: sendContext,
            file: null,
        };
    }
}

function* parseReadingComprehension(questionMain: HTMLElement) {
    let sendContext = questionMain
        .querySelector(".col-md-8")!
        .textContent!.replace(/(.*?)following passage./, "")
        .trim();

    for (let questionElement of questionMain.querySelectorAll(".col-md-4 .test_hov")) {
        let questionId = questionElement
            .querySelector('input[id^="rd"][id$="_1"]')!
            .getAttribute("name");
        let question = questionElement.querySelector("div")!.textContent!.replace(/\d*\.\s*/, "");

        let answerElement = questionElement.nextElementSibling;
        let [options, answerId, answer] = get_answer(answerElement, questionElement);

        //用sendFile作为对同一段原文的标识
        let sendFile = questionId!.replace(/_.*$/, "");

        get_order(questionElement);
        yield {
            questionType: TYPES.READING_COMPREHENSION,
            questionId: <string>questionId,
            question: question,
            options: <string[]>options,
            answerId: <string | null>answerId,
            answer: <string | null>answer,
            context: sendContext,
            file: sendFile,
        };
    }
}

function* parseReadingCompletion(questionMain: HTMLElement) {
    let sendContext = questionMain!.querySelector(".test_sty_3")!.textContent!.trim();
    let sendOptions = [];
    let sendAnswer = "";
    let sendQuestionId = "";

    for (const option of questionMain.querySelectorAll(".test_sty_5 span")) {
        sendOptions.push(<string>option.textContent);
    }

    {
        let answerElement = questionMain.querySelector('[class*="answer"]');
        if (answerElement) {
            //todo 这种似乎适合用?.语法
            sendAnswer = answerElement!.textContent!.replace(/.*：\s*/, "");
        }
    }

    sendQuestionId = questionMain!
        .querySelector('input[id^="txt_"][id$="_1"]')!
        .getAttribute("id")!
        .replace(/_1$/, "");

    yield {
        questionType: TYPES.READING_COMPLETION,
        questionId: <string>sendQuestionId,
        question: null,
        options: sendOptions,
        answerId: null,
        answer: sendAnswer,
        context: sendContext,
        file: null,
    };
}

function* parseOrdering(questionMain: HTMLElement) {
    let sendContext = questionMain!.querySelector(".test_sty_6")!.textContent!.trim();

    for (let questionElement of questionMain.querySelectorAll(".form-inline")) {
        let answer = "";
        let answerElement = questionMain.querySelector('[class*="answer"]');
        if (answerElement) {
            answer = questionElement!.nextElementSibling!.textContent!.replace(/(.*?)：\s*/, "");
        }

        let question = questionElement!.textContent!.replace(/\d*\.\s*(\w*?)J/, "");
        let questionId = <string>(
            questionElement!.querySelector('select[id^="sl"]')!.getAttribute("id")
        );
        let sendFile = questionId.replace(/_.{1,3}$/, ""); //用sendFile作为对同一段原文的标识

        get_order(questionElement);
        yield {
            questionType: TYPES.ORDERING,
            questionId: questionId,
            question: question,
            options: [],
            answerId: null,
            answer: answer,
            context: sendContext,
            file: sendFile,
        };
    }
}

function* parseSingleChoice(questionMain: HTMLElement) {
    for (let questionElement of questionMain.querySelectorAll(".test_hov")) {
        let questionId = <string>(
            questionElement!.querySelector('input[name^="rd"][id$="_1"]')!.getAttribute("name")
        );
        let question = questionElement!.querySelector("div")!.textContent!.replace(/\d*\.\s*/, "");

        let answerElement = questionElement.querySelector('[class*="answer"]');
        let [options, answerId, answer] = get_answer(answerElement, questionElement);

        get_order(questionElement);
        yield {
            questionType: TYPES.SINGLE_CHOICE,
            questionId: questionId,
            question: question,
            options: <string[]>options,
            answerId: <string | null>answerId,
            answer: <string | null>answer,
            context: null,
            file: null,
        };
    }
}

function determineQuestionType(questionMain: HTMLElement) {
    let sendQuestionType: TYPES | null = null;

    if (questionMain.querySelector('a[href^="javascript:PlaySound"]')) {
        sendQuestionType = TYPES.LISTENING;
    } else if (questionMain.querySelector(".col-md-8")) {
        sendQuestionType = TYPES.READING_COMPREHENSION;
    } else if (questionMain.querySelector(".test_sty_5")) {
        sendQuestionType = TYPES.READING_COMPLETION;
    } else if (questionMain.querySelector(".test_sty_6")) {
        sendQuestionType = TYPES.ORDERING;
    } else {
        if (questionMain.querySelector('input[name^="rd"]')) {
            sendQuestionType = TYPES.SINGLE_CHOICE;
            // } else if (questionMain.querySelector(".test_sty_5")) {
            //     sendQuestionType = 5; //普通填空题——没遇到过
        }
    }
    return sendQuestionType;
}

/**
 * 判断当前页面是否是详情/解析页面，或是答题页面
 */
function isFinished() {
    return (document.querySelector("#aSubmit") as HTMLElement).style.display == "none"
        ? true
        : false;
}

import { hackPlaySound } from "./utils";

export async function retrieveAllQuestions() {
    console.log(333);

    Global.messages = [];
    let answers: Question[] = [];
    const FINISHED = isFinished();

    if (!FINISHED) {
        addOrderFlag = true;
        hackPlaySound();
    }
    for (let questionMain of document.querySelectorAll(".itemDiv")) {
        let parser: Function | null = null;

        const sendQuestionType = determineQuestionType(questionMain as HTMLElement);
        switch (sendQuestionType) {
            case TYPES.LISTENING: //听力大题
                parser = parseListening;
                break;

            case TYPES.READING_COMPREHENSION: //阅读理解
                parser = parseReadingComprehension;
                break;

            case TYPES.READING_COMPLETION: //小猫钓鱼
                parser = parseReadingCompletion;
                break;

            case TYPES.ORDERING: //下拉排序
                parser = parseOrdering;
                break;

            case TYPES.SINGLE_CHOICE: //普通选择
                parser = parseSingleChoice;
                break;

            default:
                addMessage("未知题目类型");
                continue;
        }

        for (const question of parser(questionMain as HTMLElement)) {
            if (FINISHED) {
                answers.push(question);
            } else {
                Requests.simpleRequest(question);
                await sleep(QUERY_INTERVAL);
            }
        }
    }
    if (FINISHED) Requests.collectAnswers(answers);
    console.log(444);
}
