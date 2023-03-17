import logger from "@/src/utils/logger";
import { Answer } from "../main";

export function parseManifest(dom: Document) {
    let realAnswers: Answer[] = [];

    let answers = dom.querySelectorAll("correctResponse value");
    logger.debug(answers);
    let index = 1;
    for (const element of answers) {
        const answerArray = parseAnswer(element as HTMLElement, dom) as any;
        for (const answer of answerArray) {
            if (answer) {
                answer.index = index;
                logger.debug(answer);
                realAnswers.push(answer);
            }
            index++;
        }
    }
    return realAnswers;
}

function parseAnswer(element: HTMLElement, dom: Document) {
    let answerText = "";
    let answerType = "";
    let returnAnswers = [];

    let identifier = element.textContent as string;
    if (identifier.length == 36) {
        //选择题
        answerType = "choice";
        let selector = `[identifier="${identifier}"]`;
        try {
            answerText = dom.querySelector(selector)!.textContent as string;
            // logger.debug(answerText);
        } catch (error) {
            answerText = element.textContent as string; //高职第七八单元填空
        }
        returnAnswers.push({
            text: answerText,
            type: answerType,
            element: element,
            identifier: identifier,
        });
        //  else {
        //     //高职，非精编，综合，单元测试
        //     answerText = element.textContent;
        // }
    } else if (identifier.length > 200) {
        //纠错题
        let identifiers = identifier.split(",");
        for (const identifier of identifiers) {
            let selector = `[identifier="${identifier}"]`;

            answerText = dom.querySelector(selector)!.textContent as string;

            returnAnswers.push({
                text: answerText,
                type: "choice",
                element: element,
                identifier: identifier,
            });
        }
    } else {
        //填空题
        answerText = element.textContent as string;
        answerType = answerText == "(Open.)" ? "textarea" : "blank";

        returnAnswers.push({
            text: answerText,
            type: answerType,
            element: element,
        });
    }

    return returnAnswers;
}
