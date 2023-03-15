import implement from "./implement";
import { CustomRequestInit, CustomRequestMethod } from "./types";

// interface RequestProxy {
//     <T = any>(url: string, init?: CustomRequestInit):
//         | Promise<CustomXhrResponse<T>>
//         | Promise<CustomFetchResponse<T>>;
// }

class Request extends Function {
    __self__: any;

    constructor() {
        super("...args", "return this.__self__.__call__(...args)");
        const self = this.bind(this);
        this.__self__ = self;
        return self;
    }

    __call__(
        url: string,
        init: CustomRequestInit & { method: CustomRequestMethod } = { method: "GET" },
    ) {
        return implement(url, init);
    }

    post<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "POST" });
    }
    delete<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "DELETE" });
    }
    put<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "PUT" });
    }
    patch<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "PATCH" });
    }
    get<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "GET" });
    }
    head<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "HEAD" });
    }
    options<T = any>(url: string, init: CustomRequestInit = {}) {
        return implement<T>(url, { ...init, method: "OPTIONS" });
    }
}

/**
 * 提供类似axios的接口
 *
 * 既可以axios(url, init)——默认请求方式为get
 *
 * 也可以axios.get()    axios.post()
 */
export default new Request();
