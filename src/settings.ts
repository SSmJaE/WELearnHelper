interface GenericSetting {
    id: string;
    name: string;
    type?: "readonly" | "switch" | string;
    default: any;
    description: string;
}

interface SectionSetting {
    title: string;
    display?: boolean; //todo delete
    settings: GenericSetting[];
}

// 放置通用(全局)设置
export let controlCenter: SectionSetting[] = [
    {
        title: "用户",
        display: true, //就当是细颗粒度控制吧
        settings: [
            {
                id: "userAccount",
                name: "身份令牌",
                default: "default",
                description: "随意设定，累计每个人贡献的题目数量",
            },
            {
                id: "userPoints",
                name: "累计积分",
                type: "readonly",
                default: 0,
                description: "上传答案获取，暂无用处",
            },
        ],
    },
    {
        title: "悬浮窗",
        display: true,
        settings: [
            {
                id: "autoCopy",
                name: "自动复制",
                type: "switch",
                default: true,
                description: "开启时，点击悬浮窗的对应消息自动复制到粘贴板",
            },
            {
                id: "autoSlide",
                name: "自动下滑",
                type: "switch",
                default: true,
                description: "有新消息时，窗口是否自动下滑到新消息处",
            },
        ],
    },
];

/**
 * 合并所有插件的设置
 */
function mergeSettings(controlCenter: SectionSetting[], pluginSettings: SectionSetting[]) {
    for (const target of pluginSettings) {
        if (!controlCenter.some((section) => section.title == target.title))
            controlCenter.push({ title: target.title, display: target.display, settings: [] });

        let index: number | undefined;
        for (let i = 0; i < controlCenter.length; i++) {
            if (controlCenter[i].title == target.title) {
                index = i;
            }
        }
        if (typeof index === "undefined") throw Error("error during get index ");

        for (const generic of target.settings) {
            const settings = controlCenter[index].settings;
            if (!settings.some((setting) => setting.id == generic.id))
                controlCenter[index].settings.push(generic);
        }
    } //todo 根据当前页面，动态设置display
}

import { pluginSettings } from "./plugins/index";
mergeSettings(controlCenter, pluginSettings);

//*-----------------------------------------------------------------------------------

import { Global } from "./global";

/**
 * 通过集成了所有插件设置的设置中心，设置USER_SETTINGS的默认值
 */
export function setDefaultValues(controlCenter: SectionSetting[]) {
    //todo 是都需要检查gm取出的值的合法性？
    for (const section of controlCenter) {
        for (const generic of section.settings) {
            if (Global.USER_SETTINGS[generic.id] == undefined)
                Global.USER_SETTINGS[generic.id] = generic.default;
        }
    }
}

export function returnDefaultValues() {
    for (const section of controlCenter) {
        for (const generic of section.settings) {
            Global.USER_SETTINGS[generic.id] = generic.default;
        }
    }
}

//*-----------------------------------------------------------------------------------

// 判断设置按钮显示在窗口上，还是在侧边栏上
//仅在练习页面注册，考试页面不执行
if (
    location.href.includes("course.sflep.com/") &&
    !location.href.includes("course.sflep.com/2019/test/")
) {
    try {
        let settingButton = document.createElement("span");
        settingButton.id = "sidebar-setting-button";
        settingButton.className = "iconfont icon-setting";
        settingButton.innerHTML = `<a>助手</a>`;

        settingButton.onclick = () => {
            let settingBase = top.frames[0].document.querySelector(
                "#container-setting-base",
            ) as HTMLElement;
            settingBase.style.display = settingBase.style.display == "table" ? "none" : "table";
        };

        let settingStyle = document.createElement("style");
        settingStyle.setAttribute("type", "text/css");
        settingStyle.innerHTML = `
        #sidebar-setting-button {
            color: white;
            z-index: 100;
            font-size: 23px;
            cursor: pointer;
            position: relative;
            left: 15px;
            top: 5px;
            text-align: center; 
        }

        #sidebar-setting-button:hover {
            color: rgb(0,230,227);
            background: #3b3b3b 100px 100px;
        }
        
        #sidebar-setting-button a { 
            color: #494949; 
            font-size: 14px; 
            line-height: 20px;
            position: relative;
            left: -15px;
        }

        #sidebar-setting-button:hover a {
            color: #ccc;
        }
        `;

        document.querySelector(".courseware_sidebar_2 ul.c_s_2 li")!.appendChild(settingButton);
        document.body.append(settingStyle);

        //可以跨域添加元素，但是无法跨域操作元素
        // (top.frames[0].document.querySelector(
        //     "container-setting-button",
        // ) as HTMLElement).style.display = "none";
        //todo 还是说，必须要分成两步？不然解释不了为什么上方可以修改style
    } catch (error) {
        console.log(error);
    }
}
