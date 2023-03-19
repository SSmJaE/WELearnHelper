export type CustomRequestMethod = "POST" | "DELETE" | "PUT" | "PATCH" | "GET" | "HEAD" | "OPTIONS";

// export type CustomRequestInit = RequestInit & { query?: any; body?: any };
export type CustomRequestInit = {
    method?: CustomRequestMethod;
    headers?: any;
    query?: any;
    body?: any;
};

export interface RequestMessagePayload {
    text: string;
    ok: boolean;
}

export interface CustomRequestResponse<T = any> {
    json(): Promise<T>;
    text(): Promise<string>;
}

export interface GM_xmlhttpResponse {
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
