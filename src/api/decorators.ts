import logger from "../utils/logger";

function errorMessageFactory(
    error: Error,
    message: string = "请求异常，稍后再试",
    mode: "message" | "originError" | "both" = "message",
) {
    let toDisplay = "";

    switch (mode) {
        case "message":
            toDisplay += message;
            break;

        case "originError":
            toDisplay += `${error.message}`;
            break;

        case "both":
            toDisplay += message + `<br />${error.message}`;
            break;
    }

    logger.error(`${toDisplay}`);
}

/** 通过装饰器，实现请求失败时，输出定制化的提示信息
 *
 * 如果不对request进行装饰器包裹，异常直接输出至console
 *
 * 如果使用了装饰器，但是未提供message，输出默认值
 */
export function requestErrorHandler(
    message: string = "请求异常，稍后再试",
    mode: "message" | "originError" | "both" = "message",
) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            // let result = undefined;

            // try {
            //     if (originalMethod && typeof originalMethod.then === "function") {
            //         originalMethod.catch((error: Error) => {
            //             throw error;
            //         });
            //     }

            //     result = originalMethod.apply(this, args);
            // } catch (error) {
            // errorMessageFactory(error as Error, message, mode);
            // } finally {
            //     return result;
            // }
            const result = originalMethod.apply(this, args);
            result.catch((error: Error) => {
                errorMessageFactory(error as Error, message, mode);
            });

            return result;
        };

        return descriptor;
    };
}

/** 通过装饰器，实现每次会话仅请求一次——限流 */
export function perSession(storageKey: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const hasChecked = sessionStorage.getItem(storageKey);
            if (!hasChecked) {
                const result = originalMethod.apply(this, args);

                console.log(`${storageKey}未执行过，开始执行`);
                sessionStorage.setItem(storageKey, new Date().toISOString());

                return result;
            } else {
                console.log(`${storageKey}已执行过，放弃执行`);
                return Promise.resolve();
            }
        };

        return descriptor;
    };
}
