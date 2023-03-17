import {
    IWELearnExerciseSettings,
    WELearnExerciseSettings,
} from "@src/projects/welearn/exercise/setting";
import { IWELearnExamSettings, WELearnExamSettings } from "@src/projects/welearn/exam/setting";
import { IWELearnTimeSettings, WELearnTimeSettings } from "@src/projects/welearn/time/setting";
import { store } from "@store";
import { getValue } from "@utils/polyfill";
import { commonSettings } from "./common";
import logger from "../logger";

/**用于自动转换string至指定类型 */
export interface GenericSetting<T = any, K extends keyof T = keyof T> {
    id: K;
    name: string;
    readonly?: boolean;
    default: T[K];
    valueType: K extends keyof T
        ? T[K] extends infer V
            ? V extends boolean
                ? "boolean"
                : V extends string
                ? "string"
                : V extends number
                ? "number"
                : never
            : never
        : never;

    description: string;
}

// 保留映射关系，但是没有数量约束
export type GenericSettingArray<T, K extends keyof T = keyof T> = {
    [E in keyof T]: GenericSetting<T, E>;
}[K][];

// 有4个，只允许1个
// type GenericSettingArray<T, K extends keyof T = keyof T> = [keyof T] extends [never]
//     ? []
//     : [GenericSetting<T, K>, ...GenericSettingArray<Omit<T, K>>];

// 有数量约束，但是只能保留第一个元素的映射关系
// type GenericSettingArray<T, K extends keyof T = keyof T> = [keyof T] extends [never]
//     ? []
//     : K extends keyof T
//     ? [GenericSetting<T, K>, ...GenericSettingArray<Omit<T, K>>]
//     : never;

// 有数量约束，但是只能保留第一个元素的映射关系

// type GenericSettingArray<T, K extends keyof T = keyof T> = [keyof T] extends [never]
//     ? []
//     : [
//           {
//               [E in keyof T]: [GenericSetting<T, E>];
//           }[K],
//           ...GenericSettingArray<Omit<T, K>>,
//       ];

export interface SectionSetting<T = any> {
    title: string;
    settings: GenericSettingArray<T>;
}

export type IWELearnSettings = IWELearnTimeSettings &
    IWELearnExamSettings &
    IWELearnExerciseSettings;

/**
 * 合并所有插件的设置
 *
 * 可能有重名的section，会合并
 */
export function mergeSettings(...arrayOfSectionSettings: SectionSetting[][]) {
    const sectionSettings: SectionSetting[] = [];

    for (const sections of arrayOfSectionSettings) {
        for (const section of sections) {
            if (!sectionSettings.some((exist) => exist.title == section.title))
                sectionSettings.push({ title: section.title, settings: [] });

            let index: number | undefined;
            for (let i = 0; i < sectionSettings.length; i++) {
                if (sectionSettings[i].title == section.title) {
                    index = i;
                }
            }
            if (typeof index == "undefined") throw Error("error during get index ");
            for (const generic of section.settings) {
                const settings = sectionSettings[index].settings;
                if (!settings.some((setting) => setting.id == generic.id))
                    sectionSettings[index].settings.push(generic);
            }
        }
    }

    return sectionSettings;
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
    const sectionSettings = mergeSettings(
        WELearnExamSettings,
        WELearnExerciseSettings,
        WELearnTimeSettings,
        commonSettings,
    );

    store.sectionSettings = sectionSettings;

    // TODO 是都需要检查取出的值的合法性？
    // 不能直接=，需要保证object的引用不变，因为subscribe了
    store.setUserSettings(await getValue("userSettings", {}));
    logger.debug("设置已读取", { ...store.userSettings });

    // 设置默认值
    if (Object.keys(store.userSettings).length === 0) {
        store.setDefaultValues();
        logger.debug("设置为空，已初始化", { ...store.userSettings });
    }
}
