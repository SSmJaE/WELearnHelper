import { IExtensionMessage } from "./types";

const EXTENSION_NAME = "eocs-helper";

/** 消息来自inject */
async function fromInjectToContent(messageEvent: MessageEvent<IExtensionMessage>) {
    const message = messageEvent.data;

    if (!message.extensionName || message.extensionName !== EXTENSION_NAME) {
        return;
    }

    // 因为background可以直接通过chrome.runtime.sendMessage的responseCallback来直接返回响应
    // 所以消息只可能是inject => content 或者 content => inject
    if (!(message.sessionSource === "inject" && message.sessionTarget === "content")) {
        // await fromInjectToContent(message);
        return;
    }

    // 这里要求payload是字符串，
    // 是为了保证，如果payload无法被JSON.stringify，错误会在inject中报出，容易调试
    // const payload = JSON.parse(message.payload);
    const { payload } = message;
    let returnPayload: any = undefined;

    switch (message.type) {
        case "request": //转发跨域请求给background
            const messageToBackground: IExtensionMessage = {
                extensionName: message.extensionName,
                sessionId: message.sessionId,
                sessionSource: "content",
                sessionTarget: "background",
                type: "request",
                payload: message.payload,
            };

            returnPayload = await new Promise<IExtensionMessage>((resolve) =>
                // 原来可以直接获取到response啊，我以为得自己维护一套事件监听
                chrome.runtime.sendMessage(
                    messageToBackground,
                    (messageFromBackground: IExtensionMessage) => {
                        console.log("[content] : messageFromBackground");
                        console.log(messageFromBackground);
                        resolve(messageFromBackground);
                    },
                ),
            );

            break;
        case "setValue":
            {
                const { key, value } = payload;

                returnPayload = await new Promise<void>((resolve) => {
                    // 只有sync api，并不是非要用sync
                    chrome.storage.sync.set({ [key]: value }, function () {
                        console.log(`[content] : ${key} is set to ${value}`);
                        resolve();
                    });
                });
            }

            break;
        case "getValue":
            {
                const { key, defaultValue } = payload;

                returnPayload = await new Promise((resolve) => {
                    chrome.storage.sync.get(key, function (result) {
                        // 提前序列化，不用在每次使用时序列化
                        let temp: any;
                        try {
                            temp = JSON.parse(result[key]);
                        } catch (e) {
                            temp = result[key];
                        }

                        if (!temp) {
                            chrome.storage.sync.set({ [key]: defaultValue });
                            temp = defaultValue;
                        }

                        console.log(`[content] : ${key} is ${temp}`);

                        resolve(temp);
                    });
                });
            }

            break;
        default:
            const errorMessage = `fromInjectToContent: message.type ${message.type} is not supported`;
            console.error(errorMessage);
            returnPayload = errorMessage;

            break;
    }

    // 将响应转发给inject
    const messageToInject: IExtensionMessage = {
        extensionName: message.extensionName,
        sessionId: message.sessionId,
        sessionSource: "content",
        sessionTarget: "inject",
        type: message.type,
        payload: returnPayload,
    };

    window.postMessage(messageToInject, "*");
}

// /** 消息来(返回)自background
//  * content可以访问storage，所以这里只会处理跨域请求，也就是type == "response"
//  */
// async function fromBackgroundToContent(message: IExtensionMessage) {
//     if (message.type !== "response") {
//         console.error("fromBackgroundToContent: message.type !== 'response'");
//         return;
//     }

//     const payload = JSON.parse(message.payload);
//     let returnPayload: any = undefined;

//     return returnPayload;
// }

// async function handleExtensionMessage() {
// else if (message.sessionSource === "background" && message.sessionTarget === "content") {
//     await fromBackgroundToContent(message);
// }
// }

window.addEventListener("message", fromInjectToContent, false);
