export function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

type InfoType = "normal" | "error" | "success" | "info" | "hr";

import { Global } from "../global";

export async function addMessage(info: string | number | null, type: InfoType = "normal") {
    //除了添加分隔线以外的情况，消息都不应为空
    if (type !== "hr") {
        if (info === null || info === "") return;
    }
    Global.messages.push({ info: String(info), type: type });

    if (Global.USER_SETTINGS.autoSlide) {
        await sleep(10); //等待message渲染完成，不然不会拉到最底
        (<HTMLElement>document.querySelector("#container-messages")).scrollBy(0, 1000);
    }
}

/**实现拖动*/
export function makeDraggable(handle: HTMLElement, container: HTMLElement) {
    function getProperty(ele: HTMLElement, prop: any) {
        return parseInt(window.getComputedStyle(ele)[prop]);
    }

    let draggable = false,
        pastX: number,
        pastY: number,
        containerWidth: number,
        containerHeight: number,
        containerLeft = getProperty(container, "left"),
        containerTop = getProperty(container, "top"),
        windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

    handle.addEventListener(
        "mousedown",
        (e) => {
            handle.style.cursor = "grabbing";
            draggable = true;
            pastX = e.clientX;
            pastY = e.clientY;
            containerWidth = getProperty(container, "width");
            containerHeight = getProperty(container, "height");
        },
        false,
    );

    document.addEventListener("mousemove", (e) => {
        if (draggable === true) {
            let currentX = e.clientX,
                currentY = e.clientY,
                diffX = currentX - pastX,
                diffY = currentY - pastY;

            let targetX = containerLeft + diffX;
            let targetY = containerTop + diffY;

            if (targetX <= 0) targetX = 0;
            if (targetY <= 0) targetY = 0;
            if (targetX >= windowWidth - containerWidth) targetX = windowWidth - containerWidth;
            if (targetY >= windowHeight - containerHeight) targetY = windowHeight - containerHeight;

            container.style.left = targetX + "px";
            container.style.top = targetY + "px";
        }
    });

    handle.addEventListener(
        "mouseup",
        () => {
            handle.style.cursor = "grab";
            draggable = false;
            containerLeft = getProperty(container, "left");
            containerTop = getProperty(container, "top");
        },
        false,
    );
    //防止意外未退出拖动状态
    document.body.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Escape") {
                // console.log(e);
                handle.style.cursor = "grab";
                draggable = false;
                containerLeft = getProperty(container, "left");
                containerTop = getProperty(container, "top");
            }
        },
        false,
    );
}

/** 通过装饰器，实现请求失败时，输出定制化的提示信息 */
export function requestErrorHandler(message: string = "请求异常，稍后再试") {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            result.catch((error: Error) => {
                addMessage(`${message}`, "error");
                // addMessage(`${error}`, "error");
            });
            return result;
        };

        return descriptor;
    };
}
