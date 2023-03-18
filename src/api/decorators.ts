import logger from "../utils/logger";
import { IErrorDetail } from "./types";

/** js的throw，似乎只能throw string，没法throw object，数据会丢失 */
export function backendErrorToString(errorDetail: IErrorDetail | null) {
    return errorDetail
        ? `异常id : ${errorDetail.id}\n具体信息 : ${errorDetail.message}`
        : undefined;
}

/**
 * 通过装饰器，实现请求失败时，输出定制化的提示信息
 *
 * 如果不对request进行装饰器包裹，异常直接输出至console
 *
 * 如果使用了装饰器，但是未提供message，输出默认值
 */
export function requestErrorHandler(message: string = "请求异常，稍后再试") {
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
                // logger.debug(error);

                logger.error(
                    {
                        message,
                    },
                    error.message,
                );
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

                logger.debug(`${storageKey}未执行过，开始执行`);
                sessionStorage.setItem(storageKey, new Date().toISOString());

                return result;
            } else {
                logger.debug(`${storageKey}已执行过，放弃执行`);
                return Promise.resolve();
            }
        };

        return descriptor;
    };
}
