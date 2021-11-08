import { store } from "@src/store";
import { sleep } from "@src/utils/common";

export async function solveManifest(answers: any[]) {
    let inputPatternOnPaper = document.querySelectorAll(
        '.pattern input[type="text"]',
    ) as NodeListOf<HTMLInputElement>;
    let inputOrder = 0;

    let optionLabelOnPaper = document.querySelectorAll("label[for]") as NodeListOf<
        HTMLLabelElement
    >;

    for (const answer of answers) {
        await sleep(store.USER_SETTINGS.solveInterval);
        switch (answer.type) {
            case "blank":
                for (const inputAnswer of answer.text.split(",")) {
                    try {
                        inputPatternOnPaper[inputOrder].value = inputAnswer;
                    } catch (error) {
                        document.querySelector(".pattern textarea")!.textContent = inputAnswer;
                    } finally {
                        inputOrder++;
                    }
                }

                break;
            case "textarea":
                (document.querySelector(".pattern textarea") as HTMLTextAreaElement).value =
                    store.USER_SETTINGS.defaultBlankAnswer;

                break;
            case "choice":
                for (const label of optionLabelOnPaper) {
                    if (label.getAttribute("for")!.split("_")[1] == answer.identifier) {
                        label.click();
                        try {
                            let labelHeight = label.getBoundingClientRect().top; //自动跳转页面至选项处
                            document.querySelector("#divTest")!.scrollTo(0, labelHeight - 50);
                        } catch (error) {}
                    }
                }

                break;
        }
    }
}
