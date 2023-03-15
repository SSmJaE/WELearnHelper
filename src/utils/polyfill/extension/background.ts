import { IExtensionMessage } from "./types";

async function handleContentMessage(
    message: IExtensionMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
) {
    const {
        payload: { url, init },
    } = message;

    const messageToContent: IExtensionMessage = {
        extensionName: message.extensionName,
        sessionId: message.sessionId,
        sessionSource: "background",
        sessionTarget: "content",
        type: "request",
        payload: undefined,
    };

    try {
        const response = await fetch(url, init);

        messageToContent.payload = {
            // 只能发送jsonable的数据，Promise不行
            text: await response.text(),
            ok: response.ok,
        };
    } catch (error) {
        console.error(error);

        messageToContent.payload = {
            text: `fetch error: ${error}`,
            ok: false,
        };
    }

    sendResponse(messageToContent);

    return true;
}

chrome.runtime.onMessage.addListener(handleContentMessage);
