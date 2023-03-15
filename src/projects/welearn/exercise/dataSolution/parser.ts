import logger from "@/src/utils/logger";

export function parseDataSolution() {
    let realAnswers = [];

    let answers = document.querySelectorAll("[data-solution]");
    logger.debug(answers);
    let index = 1;
    for (const element of answers) {
        const answer = parseAnswer(element as HTMLElement) as Answer;
        if (answer) {
            answer.index = index;
            logger.debug(answer);
            realAnswers.push(answer);
        }
        index++;
    }
    return realAnswers;
}

function parseAnswer(element: HTMLElement) {
    let answerText = element.getAttribute("data-solution");
    let answerType = "";
    if (answerText) {
        //填空题
        answerType = "blank";
    } else {
        //选择题
        try {
            answerText = element.firstElementChild!.textContent;
            if (!answerText) answerText = element.textContent;
        } catch (error) {
            answerText = element.textContent;
        }
        answerType = "choice";
    }

    return {
        text: answerText,
        type: answerType,
        element: element,
    };
}
