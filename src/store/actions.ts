import { sleep } from "@src/utils/common";
import { store } from "./index";

/**添加多条消息 */
export async function addMessage(message: Array<string | number>, type?: InfoType): Promise<void>;
export async function addMessage(message: Array<Message>): Promise<void>;
/**添加一条消息 */
export async function addMessage(message: string | number, type?: InfoType): Promise<void>;
export async function addMessage(
    message: Array<string | number> | Array<Message> | string | number,
    type: InfoType = "normal",
) {
    function scrollDown() {
        (<HTMLElement>document.querySelector("#container-messages")).scrollBy(0, 1000);
    }

    async function add(finalInfo: string, finalType: InfoType, single = true) {
        if (finalType !== "hr") {
            //除了添加分隔线以外的情况，消息都不应为空
            if (finalInfo === "") return;
        }
        store.messages.push({ info: finalInfo, type: finalType });

        if (store.USER_SETTINGS.autoSlide && single === true) {
            await sleep(10); //等待message渲染完成，不然不会拉到最底
            scrollDown();
        }
    }

    if (Array.isArray(message)) {
        for (const line of message) {
            if (typeof line === "object") {
                //Message[]
                await add(line.info, line.type, false);
            } else {
                //未提供消息类型，(string|number)[]
                await add(String(line), type ?? "normal", false);
            }
        }
        scrollDown();
    } else {
        //可能提供了type，所以用默认值参数
        await add(String(message), type);
    }
}

/** 清空消息 */
export function clearMessage() {
    store.messages = [];
}
