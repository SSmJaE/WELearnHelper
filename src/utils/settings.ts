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
                valueType: "string",
                description: "随意设定，累计每个人贡献的题目数量",
            },
            {
                id: "userPoints",
                name: "累计积分",
                type: "readonly",
                default: 0,
                valueType: "number",
                description: "上传答案获取，暂无用处",
            },
            // {
            //     //离线模式应该不是让用户手动选择的，而是连接服务器失败之后自动操作的，作为备用方案
            //     id: "targetApi",
            //     name: "接口选择",
            //     type: "selection",
            //     default: 1,
            //     description: "默认使用哪个查题接口",
            // },
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
export function mergeSettings(controlCenter: SectionSetting[], pluginSettings: SectionSetting[]) {
    for (const target of pluginSettings) {
        if (!controlCenter.some((section) => section.title == target.title))
            controlCenter.push({ title: target.title, display: target.display, settings: [] });

        let index: number | undefined;
        for (let i = 0; i < controlCenter.length; i++) {
            if (controlCenter[i].title == target.title) {
                index = i;
            }
        }
        if (typeof index == "undefined") throw Error("error during get index ");

        for (const generic of target.settings) {
            const settings = controlCenter[index].settings;
            if (!settings.some((setting) => setting.id == generic.id))
                controlCenter[index].settings.push(generic);
        }
    } //todo 根据当前页面，动态设置display
}

//*-----------------------------------------------------------------------------------

import { store, DEBUG_MODE } from "@src/store";
import { getValue } from "@utils/common";

/**
 * 通过集成了所有插件设置的设置中心，设置USER_SETTINGS的默认值
 */
export function setDefaultValues(controlCenter: SectionSetting[]) {
    //todo 是都需要检查gm取出的值的合法性？
    for (const section of controlCenter) {
        for (const generic of section.settings) {
            if (store.USER_SETTINGS[generic.id] == undefined) {
                store.USER_SETTINGS[generic.id] = generic.default;
            }
        }
    }
}

export function returnDefaultValues() {
    for (const section of controlCenter) {
        for (const generic of section.settings) {
            store.USER_SETTINGS[generic.id] = generic.default;
        }
    }
}

/**
 * 应该最先读取油猴设置，完成USER_SETTINGS的初始化，有很多功能都是基于设置动态变化的
 *
 * 这样能保证执行各插件的initial时，USER_SETTINGS已经初始化完成，不会出现USER_SETTINGS为空的情况
 *
 * 实验表明，即使先初始化USER_SETTINGS, 仍旧先执行完毕plugin的initial，可以视为使用GM方法是异步执行的
 *
 * 所以此处执行完毕，USER_SETTINGS还是可能为空，需要手动在插件的initial中timeout
 *
 * 或者手动控制执行顺序以保证USER_SETTINGS不为空
 */
export async function initialUserSettings() {
    //每次启动都会初始化USER_SETTINGS，所以需要先集成所有插件的设置，因为是根据插件的设置设定前者的默认值
    const { pluginSettings } = await import("@plugins/index");
    mergeSettings(controlCenter, pluginSettings);
    generateSettingType(controlCenter);

    //唯一false情况为gm下server模式调整ui
    const flag = process.env.CRX ? true : DEBUG_MODE ? false : true;

    if (flag) {
        store.USER_SETTINGS = await getValue("USER_SETTINGS", {});
        setDefaultValues(controlCenter);
    }
}

export const SETTING_TYPES: {
    [settingId: string]: "boolean" | "number" | "float" | "string";
} = {};

/**为自动转换input事件值的类型，而提取每个设置的类型 */
function generateSettingType(controlCenter: SectionSetting[]) {
    //在mergeSettings之后调用，此时的controlCenter已包含所有插件的设置
    for (const section of controlCenter) {
        for (const generic of section.settings) {
            if (generic.type === "switch") {
                SETTING_TYPES[generic.id] = "boolean";
            } else {
                SETTING_TYPES[generic.id] = generic.valueType;
            }
        }
    }
}
