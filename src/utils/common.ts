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
