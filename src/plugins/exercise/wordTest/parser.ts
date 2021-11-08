import { store } from "@src/store";
import { addMessage } from "@src/store/actions";

let wordTestTimer: any;
export function parseWordTest() {
    clearInterval(wordTestTimer); //manifest类型会重新加载页面，所以定时器会被自动清除，可以不用管

    wordTestTimer = setInterval(() => {
        try {
            store.messages = [];
            let answer = document.querySelector('ul[id^="wordTest"][style=""] > li:last-child')!
                .textContent;

            addMessage(answer as string);
        } catch (error) {}
    }, 2000);
}
