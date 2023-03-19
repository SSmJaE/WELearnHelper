export type ExtensionMessageType = "request" | "getValue" | "setValue";

export interface IExtensionMessage<T = any> {
    extensionName?: string;
    sessionId: string;
    sessionSource: "inject" | "content" | "background";
    sessionTarget: "inject" | "content" | "background";
    type: ExtensionMessageType;
    payload: T;
}

export type ExtensionMessageCallback<T = any> = (
    extensionMessage: IExtensionMessage<T>,
) => Promise<void>;
