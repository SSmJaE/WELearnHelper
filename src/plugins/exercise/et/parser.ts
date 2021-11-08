import { store } from "@src/store";

type AnswerType =
    | "et-tof"
    | "et-blank"
    | "et-select"
    | "et-choice"
    | "et-matching"
    | "et-reference"
    | "et-textarea";

const ANSWER_TYPES: AnswerType[] = [
    "et-tof", //判断题
    "et-blank", //问答题+填空题
    "et-select", //下拉选择题
    "et-choice", //选择题(二选一，多选)
    "et-matching", //连线题
    "et-reference", //口语参考
];

export function parseEt(dom: Document) {
    let realAnswers = [];
    for (const answerType of ANSWER_TYPES) {
        let answers = dom.querySelectorAll(answerType);
        console.log(answers);
        let index = 1;
        for (const element of answers) {
            const answer = parseAnswer(element as HTMLElement) as Answer | null;
            if (answer) {
                answer.index = index;
                console.log(answer);
                realAnswers.push(answer);

                index++;
            }
        }
    }
    return realAnswers;
}

function parseAnswer(element: HTMLElement) {
    let tag = element.tagName.toLowerCase() as AnswerType;
    let answerText = "";
    switch (tag) {
        case "et-tof":
            answerText = element.getAttribute("key") as string;

            break;

        case "et-blank":
            if (isRepeat(element)) return;
            answerText = element.textContent!.split("|")[0];
            if (element.hasAttribute("block")) tag = "et-textarea";

            break;

        case "et-select":
            answerText = element.getAttribute("key") as string;
            try {
                //todo 这是哪个类型的题的故障处理？
                if (!answerText.length)
                    answerText = element.firstElementChild!.textContent as string;
            } catch (error) {
                answerText = "Answers will vary.";
            }

            break;

        case "et-choice":
            if (isRepeat(element)) {
                //针对有只有inline的情况(视听说2 4-2)，也就是说，不能跳
                if (element.hasAttribute("inline")) {
                    return;
                }
            } //针对视听说2 7-1重复，
            answerText = element.getAttribute("key") as string;

            break;

        case "et-matching":
            if (isRepeat(element)) return;
            answerText = element
                .getAttribute("key")!
                .split(",")
                .join("\n\t");

            break;

        case "et-reference":
            if (!store.USER_SETTINGS.showReference) return;
            answerText = element.innerHTML;
            // content.style.whiteSpace = "normal";

            break;
    }
    return {
        text: answerText,
        type: tag,
        element: element,
    };
}

/**通过检测父节点，解决答案重复的问题*/
function isRepeat(answerNode: HTMLElement) {
    let parentElement: HTMLElement = answerNode,
        parentTag: string;
    let webFlag = 0;
    let mobileFlag = 0;
    try {
        for (let i = 0; i < 9; i++) {
            if (i !== 0) {
                parentElement = parentElement.parentElement as HTMLElement;
            }

            parentTag = parentElement.tagName;
            if (parentTag == "ET-MOBILE-ONLY") mobileFlag++;
            if (parentTag == "ET-WEB-ONLY") webFlag++;
        }
    } catch (error) {
        // if (USER_SETTINGS.debugMode) console.log(error);
    } finally {
        if (webFlag && mobileFlag) {
            //针对web下嵌套mobile的题目，如视听说2的3-2-3
            if (webFlag > 1) {
                //针对4重嵌套，unit test常见
                return true;
            } else {
                return false;
            }
        } else if (webFlag) {
            //web和mobile只留其一，这里保留mobile，丢弃web
            return true;
        } else {
            return false;
        }
    }
}
