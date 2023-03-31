import logger from "../logger";
import { injectToContent } from "./extension/inject";

// 避免在浏览器环境(非脚本管理器)下报错
// typeof GM_setValue === "function" || function GM_setValue() {};
// const GM_setValue = await import("$").then((module) => module.GM_setValue);

let hasInitializeSetValue = false;
let GM_setValue: any;

async function initializeSetValue() {
    if (process.env.CRX) {
        GM_setValue = (key: string, value: any) => {
            logger.debug("should not invoke placeholder function GM_setValue");
        };
    } else {
        GM_setValue = await import("$").then((module) => module.GM_setValue);
    }
}

/**
 * 调用GM_setValue或者chrome.storage
 */
export async function setValue(key: string, value: any) {
    // 确保只初始化一次GM_setValue，并且在调用GM_setValue之前初始化
    if (!hasInitializeSetValue) {
        await initializeSetValue();
        hasInitializeSetValue = true;
    }

    if (process.env.CRX) {
        injectToContent("setValue", {
            key: key,
            value: value,
        });
    } else {
        await GM_setValue(key, JSON.stringify(value));
    }
}

// 避免在浏览器环境(非脚本管理器)下报错
// typeof GM_getValue === "function" || function GM_getValue() {};
let hasInitializeGetValue = false;
let GM_getValue: any;

async function initializeGetValue() {
    if (process.env.CRX) {
        GM_getValue = (key: string, defaultValue?: any): any => {
            logger.debug("should not invoke placeholder function GM_getValue");
        };
    } else {
        GM_getValue = await import("$").then((module) => module.GM_getValue);
    }
}

/**
 * 调用GM_getValue或者chrome.storage
 *
 * 如果调用的是GM_getValue，返回JSON.parse后的结果 */
export async function getValue<T = any>(key: string, defaultValue?: any) {
    // 确保只初始化一次GM_getValue，并且在调用GM_getValue之前初始化
    if (!hasInitializeGetValue) {
        await initializeGetValue();
        hasInitializeGetValue = true;
    }

    let returnValue: any = undefined;
    if (process.env.CRX) {
        returnValue = await new Promise((resolve) => {
            injectToContent<any>(
                "getValue",
                {
                    key: key,
                    defaultValue: defaultValue,
                },
                async (extensionMessage) => {
                    const { payload } = extensionMessage;

                    resolve(payload);
                },
            );
        });
    } else {
        const temp = await GM_getValue(key, defaultValue);
        try {
            returnValue = JSON.parse(temp);
        } catch (error) {
            returnValue = temp;
        }
    }
    return returnValue as T;
}
