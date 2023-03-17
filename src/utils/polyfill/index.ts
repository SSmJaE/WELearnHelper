import { GM_getValue, GM_setValue } from "$";

import logger from "../logger";
import { injectToContent } from "./extension/inject";

/**
 * 调用GM_setValue或者chrome.storage
 */
export async function setValue(key: string, value: any) {
    // 避免在浏览器环境(非脚本管理器)下报错
    typeof GM_setValue === "function" || function GM_setValue() {};

    if (process.env.CRX) {
        injectToContent("setValue", {
            key: key,
            value: value,
        });
    } else {
        await GM_setValue(key, JSON.stringify(value));
    }
}

/**
 * 调用GM_getValue或者chrome.storage
 *
 * 如果调用的是GM_getValue，返回JSON.parse后的结果 */
export async function getValue(key: string, defaultValue?: any) {
    // 避免在浏览器环境(非脚本管理器)下报错
    typeof GM_getValue === "function" || function GM_getValue() {};

    let returnValue: any = undefined;
    if (process.env.CRX) {
        returnValue = injectToContent("getValue", {
            key: key,
            defaultValue: defaultValue,
        });
    } else {
        const temp = await GM_getValue(key, defaultValue);
        try {
            returnValue = JSON.parse(temp);
        } catch (error) {
            returnValue = temp;
        }
    }
    return returnValue;
}
