import { Global } from "@src/global";
import { sleep } from "@src/utils/common";

export async function solveDataSolution(answers: any[]) {
    const inputOnPaper = document.querySelectorAll("input[data-itemtype]") as NodeListOf<
        HTMLInputElement
    >;
    let inputOrder = 0;

    for (const answer of answers) {
        await sleep(Global.USER_SETTINGS.solveInterval);
        switch (answer.type) {
            case "blank":
                // ready_in(inputOnPaper[inputOrder]);
                inputOnPaper[inputOrder].value = answer.text;
                // event_trigger(inputOnPaper[inputOrder]);

                inputOrder++;
                break;
            case "choice":
                answer.element.click();

                break;
        }
    }
}
