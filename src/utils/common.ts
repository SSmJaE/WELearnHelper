import { addMessage } from "@src/store/actions";

import Communication from "./bridge";

export const injectToContent = process.env.CRX
    ? new Communication("client", "inject", "content")
    : ({} as Communication);

export function sleep(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function getProperty(ele: HTMLElement, prop: any) {
    return parseInt(window.getComputedStyle(ele)[prop], 10);
}

/**实现拖动，带边界检测*/
export function makeDraggable(handle: HTMLElement, container: HTMLElement) {
    let draggable = false,
        pastX: number,
        pastY: number,
        containerLeft: number,
        containerTop: number,
        containerWidth: number,
        containerHeight: number,
        windowWidth: number,
        windowHeight: number;

    handle.addEventListener(
        "mousedown",
        (e) => {
            handle.style.cursor = "grabbing";
            draggable = true;

            pastX = e.clientX;
            pastY = e.clientY;

            containerLeft = getProperty(container, "left");
            containerTop = getProperty(container, "top");
            containerWidth = getProperty(container, "width");
            containerHeight = getProperty(container, "height");

            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
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
                handle.style.cursor = "grab";
                draggable = false;

                containerLeft = getProperty(container, "left");
                containerTop = getProperty(container, "top");
            }
        },
        false,
    );
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
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const result = originalMethod.apply(this, args);
            result.catch((error: Error) => {
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

                addMessage(`${toDisplay}`, "error");
            });
            return result;
        };

        return descriptor;
    };
}

/**调用GM_setValue或者chrome.storage
 *
 * 如果调用的是GM_setValue，会对value进行JSON.stringify */
export async function setValue(key: string, value: any) {
    typeof GM_setValue === "function" || function GM_setValue() {};

    if (process.env.CRX) {
        await injectToContent.request({
            type: "setValue",
            key: key,
            value: value,
        });
    } else {
        GM_setValue(key, JSON.stringify(value));
    }
}

/**调用GM_getValue或者chrome.storage
 *
 * 如果调用的是GM_getValue，返回JSON.parse后的结果 */
export async function getValue(key: string, defaultValue?: any) {
    typeof GM_getValue === "function" || function GM_getValue() {};

    let returnValue: any;
    if (process.env.CRX) {
        returnValue = await injectToContent.request({
            type: "getValue",
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

/**针对带数字索引的答案 */
export async function copyToClipboard(text: string) {
    // await navigator.clipboard.writeText(text.replace(/^.*、/, ""));

    const copyFrom = document.createElement("textarea");

    copyFrom.textContent = text.replace(/^.*、/, "");

    document.body.appendChild(copyFrom);

    copyFrom.select();

    document.execCommand("copy");

    copyFrom.blur();

    document.body.removeChild(copyFrom);
}

/**
 * 注册按钮至侧边栏，class应为iconfont class
 */
export function appendToSideBar(id: string, className: string, name: string) {
    try {
        if (!document.querySelector("sidebar-button-style")) {
            let buttonStyle = document.createElement("style");
            buttonStyle.id = "sidebar-button-style";
            buttonStyle.setAttribute("type", "text/css");
            buttonStyle.innerHTML = `
            .courseware_sidebar_2 .sidebar-button {
                color: white;
                z-index: 100;
                font-size: 23px;
                cursor: pointer;
                position: relative;
                left: 15px;
                top: 5px;
                text-align: center; 
            }

            .courseware_sidebar_2 .sidebar-button:hover {
                color: rgb(0,230,227);
                background: #3b3b3b 100px 100px;
            }
            
            .courseware_sidebar_2 .sidebar-button a { 
                color: #494949; 
                font-size: 14px; 
                line-height: 20px;
                position: relative;
                left: -15px;
            }

            .courseware_sidebar_2 .sidebar-button:hover a {
                color: #ccc;
            }
            `;

            document.body.append(buttonStyle);
        }

        let button = document.createElement("span");
        button.id = `${id}`;
        button.className = `sidebar-button ${className}`;
        button.innerHTML = `<a>${name}</a>`;

        document.querySelector(".courseware_sidebar_2 ul.c_s_2 li")!.appendChild(button);

        return button;

        //可以跨域添加元素，但是无法跨域操作元素
        // (top.frames[0].document.querySelector(
        //     "container-setting-button",
        // ) as HTMLElement).style.display = "none";
        //todo 还是说，必须要分成两步？不然解释不了为什么上方可以修改style
    } catch (error) {
        console.log(error);
    }
}
