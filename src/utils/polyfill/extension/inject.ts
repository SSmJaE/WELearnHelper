import { isEqual } from "lodash";

import { ExtensionMessageCallback, ExtensionMessageType, IExtensionMessage } from "./types";

function injectJs(source: string) {
    const parent = document;

    const scriptElement = parent.createElement("script");
    scriptElement.setAttribute("type", "text/javascript");
    scriptElement.src = source;
    scriptElement.className = "injected-js";

    parent.documentElement.appendChild(scriptElement);

    return scriptElement;
}

// injectJs(chrome.runtime.getURL("main.js"));

const EXTENSION_NAME = "eocs-helper";

/**
 * 只有background可以跨域，所以需要通过background来转发跨域请求
 * 只有content可以和background通信，所以需要通过content来转发请求给background
 * content可以调用chrome.runtime.sendMessage，有callback参数，可以直接返回background的响应
 * inject不能调用chrome.runtime.sendMessage，只能用window.postMessage，没有callback参数，
 * 所以要自己实现一套事件监听，通过sessionId来区分不同的请求
 */
const sessions = new Map<string, ExtensionMessageCallback>();

export function injectToContent(
    type: ExtensionMessageType,
    payload: any,
    callback: ExtensionMessageCallback = async () => {},
) {
    // 只能发送jsonable的数据，Promise不行
    // 如果无法序列化，让其直接在inject中报错，方便调试
    const jsonablePayload = JSON.parse(JSON.stringify(payload));

    if (!isEqual(jsonablePayload, payload)) {
        throw new Error("payload is not jsonable");
    }

    const sessionId = String(Math.random());

    const messageToContent: IExtensionMessage = {
        extensionName: EXTENSION_NAME,
        sessionId,
        sessionSource: "inject",
        sessionTarget: "content",
        type,
        payload,
    };

    window.postMessage(messageToContent, "*");

    sessions.set(sessionId, callback);
}

async function fromContentToInject(messageEvent: MessageEvent<IExtensionMessage>) {
    const message = messageEvent.data;

    if (!message.extensionName || message.extensionName !== EXTENSION_NAME) {
        return;
    }

    if (!(message.sessionSource === "content" && message.sessionTarget === "inject")) {
        return;
    }

    const callback = sessions.get(message.sessionId);
    try {
        callback && (await callback(message));
    } catch (error) {
        console.error(error);
    } finally {
        sessions.delete(message.sessionId);
    }
}

window.addEventListener("message", fromContentToInject, false);
