type METHOD = "POST" | "DELETE" | "PUT" | "PATCH" | "GET" | "HEAD" | "OPTIONS";

interface Init {
    method?: METHOD;
    headers?: object;
    body?: string | object;
} //todo 允许除了这三个以外的key

interface GM_xmlhttpResponse {
    /**
     * the final URL after all redirects from where the data was loaded
     */
    finalUrl: string;
    /**
     * the ready state
     */
    readyState: number;
    /**
     *the request status
     */
    status: number;
    /**
     * the request status text
     */
    statusText: string;
    /**
     * the request response headers
     */
    responseHeaders: object;
    /**
     * the response data as object if details.responseType was set
     */
    response: object;
    /**
     * the response data as XML document
     */
    responseXML: XMLDocument;
    /**
     *the response data as plain string
     */
    responseText: string;
}
import { BASE_URL } from "@src/global";

function generateFinalUrl(url: string) {
    return url.startsWith("/") ? BASE_URL + url : url;
}

declare let GM_xmlhttpRequest: any;

//todo promise内部类型应该怎么定义
export default function request(
    url: string,
    init: Init = { method: "GET", headers: {}, body: "" },
) {
    let body = typeof init.body === "object" ? JSON.stringify(init.body) : init.body;

    return new Promise<GM_xmlhttpResponse>((resolve, reject) => {
        GM_xmlhttpRequest({
            url: generateFinalUrl(url),
            method: init.method,
            headers: init.headers,
            data: body,
            timeout: 5000,
            responseType: "json",
            onload(response: GM_xmlhttpResponse) {
                const code = response.status;
                if (code >= 200 && code <= 300) resolve(response);
                else reject(response);
            },
            onabort: (response: GM_xmlhttpResponse) => reject(response),
            onerror: (response: GM_xmlhttpResponse) => reject(response),
            ontimeout: (response: GM_xmlhttpResponse) => reject(response),
        });
    });
}

// ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach(method => {
//     GM_fetch2.prototype[method] = (url: string, init: Init) => {
//         init = { ...init, method: <METHOD>method.toUpperCase() }
//         return GM_fetch.request(url, init)
//     };
// })

//todo onFail，可以自定义提示信息，并提供默认提示信息默认值
