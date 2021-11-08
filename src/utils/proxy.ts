import requestBase, { Init, CustomXhrResponse, CustomFetchResponse } from "./request-base";

interface RequestProxy {
    <T = any>(url: string, init?: Init):
        | Promise<CustomXhrResponse<T>>
        | Promise<CustomFetchResponse<T>>;
}

class RequestProxy extends Function {
    __self__: any;

    constructor() {
        super("...args", "return this.__self__.__call__(...args)");
        const self = this.bind(this);
        this.__self__ = self;
        return self;
    }

    __call__(url: string, init: Init = { method: "GET" }) {
        return requestBase(url, init);
    }

    post<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "POST" });
    }
    delete<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "DELETE" });
    }
    put<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "PUT" });
    }
    patch<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "PATCH" });
    }
    get<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "GET" });
    }
    head<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "HEAD" });
    }
    options<T = any>(url: string, init: Init = {}) {
        return requestBase<T>(url, { ...init, method: "OPTIONS" });
    }
}

/**提供类似axios的接口
 *
 * 既可以axios(url, init)——默认请求方式为get
 *
 * 也可以axios.get()    axios.post()
 */
const finalRequest = new RequestProxy();

export default finalRequest;
