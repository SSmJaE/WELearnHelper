// import { addMessage } from "@src/store/actions";
import logger from "@utils/logger";
import { store } from "@src/store";

let wordTestTimer: any;
export function parseWordTest() {
    clearInterval(wordTestTimer); //manifest类型会重新加载页面，所以定时器会被自动清除，可以不用管

    wordTestTimer = setInterval(() => {
        try {
            // store.messages = [];
            store.clearLogs();
            let answer = document.querySelector(
                'ul[id^="wordTest"][style=""] > li:last-child',
            )!.textContent;

            // TODO
            // addMessage(answer as string);
        } catch (error) {}
    }, 2000);
}
