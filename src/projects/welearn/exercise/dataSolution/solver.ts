import { store } from "@src/store";
import { sleep } from "@src/utils";

export async function solveDataSolution(answers: any[]) {
    const inputOnPaper = document.querySelectorAll("input[data-itemtype]") as NodeListOf<
        HTMLInputElement
    >;
    let inputOrder = 0;

    for (const answer of answers) {
        await sleep(store.userSettings.solveInterval);
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
