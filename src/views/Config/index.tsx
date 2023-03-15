import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { animated, config, useSpring, useTransition } from "@react-spring/web";

import { store, useStore } from "../../store";
import { GenericSetting } from "../../utils/setting";
import { MenuBar } from "../components/MenuBar";
import { MenuButton } from "../components/MenuButton";
import PopOver from "../components/PopOver";
import Switch from "../components/Switch";
import { IPanel, TabContainer } from "./TabContainer";
import { useDebounceFn } from "ahooks";

const ConfigItem = styled.div(
    {
        position: "relative",
        border: "1px solid black",
        padding: 8,
        // margin: 4,
        borderRadius: 4,
    },
    ({ theme }) => ({
        "&:hover": {
            boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.75)",
            // backgroundColor: theme.colors.secondary,
        },
    }),
);

function ConfigControl({
    genericSetting: { id, valueType, readonly },
}: {
    genericSetting: GenericSetting;
}) {
    const [displayStatus, setDisplayStatus] = useState(false);
    const [statusText, setStatusText] = useState("保存成功");

    // const transition = useTransition(displayStatus, {
    // TODO 对于mount、unmount，动画可能无效
    const spring = useSpring({
        from: {
            right: "-100%",
            opacity: 0,
        },
        to: {
            right: "0%",
            opacity: 1,
        },
    });
    // });

    const { userSettings } = useStore();

    const value = userSettings[id as keyof typeof userSettings];

    const [localValue, setLocalValue] = useState(value);

    const { run: onChangeDebounced } = useDebounceFn(
        (newValue: any) => {
            if (newValue === value) return;

            store.userSettings[id as keyof typeof userSettings] = newValue;
            setDisplayStatus(true);
            setStatusText("保存成功");
            // api.start();

            setTimeout(() => {
                setDisplayStatus(false);
            }, 1000);
        },
        {
            wait: 1000,
        },
    );

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        onChangeDebounced(localValue);
    }, [localValue]);

    let element: JSX.Element;

    switch (valueType) {
        case "string":
            element = (
                <textarea
                    value={localValue as string}
                    onBlur={(e) => setLocalValue(e.target.value)}
                    onChange={(e) => setLocalValue(e.target.value)}
                    disabled={readonly}
                    style={{
                        resize: "none",
                    }}
                ></textarea>
            );
            break;
        case "number":
            element = (
                <input
                    type={"number"}
                    value={localValue as number}
                    onBlur={(e) => setLocalValue(e.target.value)}
                    onChange={(e) => setLocalValue(e.target.value)}
                    style={{
                        width: 60,
                        textAlign: "center",
                    }}
                    disabled={readonly}
                    // step={100}
                ></input>
            );
            break;
        case "boolean":
            element = (
                <Switch
                    height={22}
                    checked={localValue as boolean}
                    onChange={setLocalValue}
                    disabled={readonly}
                />
            );
            break;
    }

    return (
        <div
            style={{
                lineHeight: "normal",

                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                position: "relative",
            }}
        >
            {/* {transition((style, item) => ( */}
            {displayStatus && (
                <animated.span
                    style={{
                        position: "relative",
                        // right: 0,
                        // width: "max-content",
                        marginRight: 4,
                        ...spring,
                    }}
                >
                    {statusText}
                </animated.span>
            )}
            {/* ))} */}
            <div
                style={{
                    maxWidth: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {element}
            </div>
        </div>
    );
}

function ConfigSection({ settings }: { settings: readonly GenericSetting[] }) {
    const theme = useTheme();

    return (
        <>
            {settings.map((setting, index) => {
                return (
                    <ConfigItem
                        key={index}
                        style={{
                            marginTop: index === 0 ? 0 : 8,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 20,
                                marginBottom: 8,
                                height: 40,
                                // border: "1px solid black",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                                lineHeight: "normal",
                            }}
                        >
                            {setting.name}

                            <div
                                style={{
                                    maxHeight: 40,
                                    // maxWidth: 200,

                                    display: "flex",
                                    alignItems: "center",
                                    // justifyContent: "space-between",

                                    lineHeight: "normal",
                                }}
                            >
                                <ConfigControl genericSetting={setting} />
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                // color: theme.colors.secondary,
                                color: "rgb(161, 156, 156)",
                                lineHeight: "normal",
                            }}
                        >
                            {setting.description}
                        </div>
                    </ConfigItem>
                );
            })}
        </>
    );
}

// const TabContainerMemoed = memo(TabContainer)

const ConfigPanelContainer = styled(animated.div)<{}>(
    {
        flexDirection: "column",

        width: 600,
        position: "absolute",
        top: 100,
        right: 100,
        zIndex: 101,

        background: "rgba(255, 255, 255, 0.95)",
        border: "black 2px solid",
        borderRadius: 10,
    },
    ({}) => ({}),
);

export function ConfigPanel() {
    const { sectionSettings, visibility } = useStore();

    const theme = useTheme();

    const panel: IPanel[] = useMemo(() => {
        return sectionSettings.map((sectionSetting, index) => ({
            label: sectionSetting.title,
            content: <ConfigSection settings={sectionSetting.settings} />,
        }));
    }, [sectionSettings]);

    const [isDragging, setIsDragging] = useState(false);

    const [spring, api] = useSpring(
        () => ({
            opacity: visibility.config ? 1 : 0,
            scale: visibility.config ? 1 : 0,

            config: {
                ...config.wobbly,
            },
            onRest: () => {
                if (!visibility.config) {
                    setDisplay(false);
                }
            },
        }),
        [visibility.config],
    );

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (visibility.config) {
            setDisplay(true);
        }
    }, [visibility.config]);

    return (
        <Draggable
            handle="#config-panel-menu-bar"
            cancel="#config-panel-close-button"
            bounds="body"
            onStart={() => {
                setIsDragging(true);
            }}
            onStop={() => {
                setIsDragging(false);
            }}
        >
            <ConfigPanelContainer
                id="config-panel"
                style={{
                    ...spring,
                    display: display ? "flex" : "none",
                }}
            >
                <MenuBar
                    id="config-panel-menu-bar"
                    isDragging={isDragging}
                    style={{
                        borderBottom: "2px solid black",
                    }}
                >
                    <div
                        style={{
                            fontSize: 24,
                            // paddingLeft: 8,
                        }}
                    >
                        设置面板
                    </div>

                    <PopOver content="关闭设置面板">
                        <MenuButton
                            id="config-panel-close-button"
                            style={{
                                lineHeight: "normal",
                            }}
                            onClick={() => {
                                store.setVisibility("config", false);
                            }}
                        >
                            {/* <Close theme="filled" size="28" fill={theme.colors.active} /> */}
                            {/* ✖️ */}❌
                        </MenuButton>
                    </PopOver>
                </MenuBar>

                <TabContainer panel={panel} />
            </ConfigPanelContainer>
        </Draggable>
    );
}
