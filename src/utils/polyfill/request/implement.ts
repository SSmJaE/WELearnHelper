import { GM_xmlhttpRequest } from "$";
import queryString from "query-string";

import metadata from "@/metadata";
import { injectToContent } from "@utils/polyfill/extension/inject";

import {
    CustomRequestInit,
    CustomRequestMethod,
    CustomRequestResponse,
    GM_xmlhttpResponse,
} from "./types";

/**
 * 如果url以/开头，则自动拼接BASE_URL，比如 /api/xxx => [apiServer]/api/xxx
 *
 * 不然，则直接使用url，比如 https://www.baidu.com => https://www.baidu.com
 */
export function getFullUrl(url: string, query: any) {
    for (const [, value] of Object.entries(query || {})) {
        if (typeof value === "object")
            throw new Error("query params不应为嵌套对象，拍平或者手动序列化子对象");
    }

    return queryString.stringifyUrl({
        url: url.startsWith("/") ? metadata.apiServer + url : url,
        query: query,
    });
}

/**对crx sendMessage的封装，以实现一致的fetch风格的request通用接口 */
export async function requestForExtension<T = any>(
    url: string,
    { body, query, ...realisticInit }: CustomRequestInit & { method: CustomRequestMethod } = {
        method: "GET",
        headers: {},
        body: undefined,
        query: undefined,
    },
): Promise<CustomRequestResponse<T>> {
    return new Promise(async (resolve, reject) => {
        injectToContent(
            "request",
            {
                url: getFullUrl(url, query),
                init: {
                    ...realisticInit,
                    body: JSON.stringify(body),
                },
            },
            async (extensionMessage) => {
                const {
                    payload: { text, ok },
                } = extensionMessage;

                if (ok) {
                    resolve({
                        text: () => new Promise<string>((resolve) => resolve(text)),
                        json: () => new Promise<any>((resolve) => resolve(JSON.parse(text))),
                    });
                } else {
                    reject(extensionMessage);
                }
            },
        );
    });
}

/**对GM_xmlhttpRequest的封装，以实现一致的fetch风格的request通用接口 */
export function requestForUserscript<T = any>(
    url: string,
    { method, headers, body, query }: CustomRequestInit & { method: CustomRequestMethod } = {
        method: "GET",
        headers: {},
        body: undefined,
        query: undefined,
    },
) {
    // 避免在浏览器环境(非脚本管理器)下报错
    typeof GM_xmlhttpRequest === "function" || function GM_xmlhttpRequest() {};

    return new Promise<CustomRequestResponse<T>>((resolve, reject) => {
        GM_xmlhttpRequest({
            url: getFullUrl(url, query),
            method: method as any,
            headers,
            data: typeof body === "object" ? JSON.stringify(body) : body,
            timeout: 5000,
            responseType: "json",
            // @ts-ignore
            onload(response: GM_xmlhttpResponse) {
                const { status: statusCode } = response;
                if (statusCode >= 200 && statusCode <= 300) {
                    resolve({
                        text: () =>
                            new Promise<string>((resolve) => resolve(response.responseText)),
                        json: () => new Promise((resolve) => resolve(response.response as any)),
                    });
                } else {
                    reject(response);
                }
            },
            // @ts-ignore
            onabort: (response: GM_xmlhttpResponse) => reject(response),
            // @ts-ignore
            onerror: (response: GM_xmlhttpResponse) => reject(response),
            // @ts-ignore
            ontimeout: (response: GM_xmlhttpResponse) => reject(response),
        });
    });
}

export default process.env.CRX ? requestForExtension : requestForUserscript;
