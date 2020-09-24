import { Global, DEBUG_MODE } from "@src/global";
import { addMessage, sleep } from "@src/utils/common";

let wordTestTimer: any;
export function parseWordTest() {
    clearInterval(wordTestTimer); //manifest类型会重新加载页面，所以定时器会被自动清除，可以不用管

    wordTestTimer = setInterval(() => {
        try {
            Global.messages = [];
            let answer = document.querySelector('ul[id^="wordTest"][style=""] > li:last-child')!
                .textContent;
            addMessage(answer);
        } catch (error) {}
    }, 2000);
}
