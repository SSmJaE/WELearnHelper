import { injectToContent } from "./extension/inject";

declare let GM_setValue: any;

/**
 * 调用GM_setValue或者chrome.storage
 */
export async function setValue(key: string, value: any) {
    typeof GM_setValue === "function" || function GM_setValue() {};
    console.log(GM_setValue);
    if (process.env.CRX) {
        injectToContent("setValue", {
            key: key,
            value: value,
        });
    } else {
        GM_setValue(key, JSON.stringify(value));
    }
}

declare let GM_getValue: any;

/**
 * 调用GM_getValue或者chrome.storage
 *
 * 如果调用的是GM_getValue，返回JSON.parse后的结果 */
export async function getValue(key: string, defaultValue?: any) {
    if (!window.GM_getValue) {
        window.GM_getValue = () => {};
    }
    // typeof GM_getValue === "function" || function GM_getValue() {};
    console.log(GM_getValue);

    let returnValue: any;
    if (process.env.CRX) {
        returnValue = injectToContent("getValue", {
            key: key,
            defaultValue: defaultValue,
        });

        // console.error(returnValue);
    } else {
        const temp = GM_getValue(key, defaultValue);
        try {
            returnValue = JSON.parse(temp);
        } catch (error) {
            returnValue = temp;
        }
    }
    return returnValue;
}
