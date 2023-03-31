import "simplebar-react/dist/simplebar.min.css";

import { useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import SimpleBar from "simplebar-react";

import { Global, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Close, Info, SettingTwo } from "@icon-park/react";
import { animated, config, useSpring } from "@react-spring/web";

import metadata from "../../../metadata.json";
import { store, useStore } from "../../store";
import { MenuBar } from "../components/MenuBar";
import { MenuButton } from "../components/MenuButton";
import PopOver from "../components/PopOver";
import { About } from "./About";
import { ErrorRecord } from "./records/Error";
import { InfoRecord } from "./records/Info";
import { QuestionRecord } from "./records/Question";

function getAppTitle() {
    const defaultTitle = "EOCS网课助手";

    // console.log(process.env.COMPILE_PLATFORM)

    if (process.env.COMPILE_PLATFORM) {
        return metadata.projects[process.env.COMPILE_PLATFORM]?.title ?? defaultTitle;
    }

    return defaultTitle;
}

export function dispatchRecord(record: any) {
    let recordDisplay;

    switch (record.type) {
        case "info":
            recordDisplay = <InfoRecord record={record} />;
            break;

        case "question":
            recordDisplay = <QuestionRecord record={record} />;
            break;

        case "error":
            recordDisplay = <ErrorRecord record={record} />;
            break;

        default:
            recordDisplay = (
                <div
                    style={{
                        lineHeight: "24px",
                    }}
                >
                    {JSON.stringify(record)}
                </div>
            );
            break;
    }

    return recordDisplay;
}

const buffer = [
    {
        type: "info",
        timestamp: `${Math.random()}`,
        content: "这是一条信息",
    },
    {
        type: "unknown",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: {
            message: "这是一条未知类型的记录",
            id: "123",
        },
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
    {
        type: "error",
        timestamp: `${Math.random()}`,
        content: "这是一条未知类型的记录",
    },
];

let status = false;

const RecordContainer = styled.div(
    {
        border: "black 1px solid",
        borderRadius: 4,
        fontSize: 16,
        padding: 4,
    },
    ({ theme }) => ({
        "&:hover": {
            background: theme.colors.secondary,
        },
    }),
);

export function LogPanel() {
    const {
        visibility,
        logs,
        // position: { floating, log },
    } = useStore();

    const appTitle = useMemo(() => getAppTitle(), []);

    const [isDragging, setIsDragging] = useState(false);

    const theme = useTheme();

    // useEffect(() => {
    //     if (status) return;

    //     for (const [index, record] of buffer.entries()) {
    //         setTimeout(() => {
    //             store.logs.push(record);
    //         }, index * 200);
    //     }

    //     status = true;
    // }, []);

    // logger.debug({
    //     floating,
    // });

    const [spring, api] = useSpring(
        () => ({
            opacity: visibility.log ? 1 : 0,
            scale: visibility.log ? 1 : 0,
            // translate: visibility.log ? 0 : `${floating.y - log.y}px`,
            // transform: visibility.log ? "translateX(200px)" : `translateX(${floating.x - log.x}px)`,

            // x: visibility.log ? 100 : floating.x,
            // y: visibility.log ? 100 : floating.y,

            config: {
                ...config.wobbly,
            },
            onRest: () => {
                if (!visibility.log) {
                    setDisplay(false);
                }
            },
        }),
        [visibility.log],
    );

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (visibility.log) {
            setDisplay(true);
        }
    }, [visibility.log]);

    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 600,
                height: 100,
            }}
            minWidth={350}
            maxWidth={600}
            minHeight={100}
            maxHeight={600}
            bounds="window"
            cancel="#log-panel-menu-buttons"
            dragHandleClassName="log-panel-menu-bar"
            onDragStart={() => {
                setIsDragging(true);
            }}
            onDragStop={() => {
                setIsDragging(false);
            }}
            // 默认grid为1，导致rerender次数过多，看起来很卡顿
            // 所以主动调大grid增加卡顿感，掩盖因为render导致的卡顿
            resizeGrid={[20, 20]}
            enableResizing={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
            }}
        >
            <animated.div
                style={{
                    zIndex: 99,
                    width: "100%",
                    maxHeight: 600,

                    background: "rgba(255, 255, 255, 0.95)",
                    border: "black 2px solid",
                    borderRadius: 10,
                    boxShadow:
                        "0 11px 15px -7px rgba(0, 0, 0, 0.2),0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)",
                    display: display ? "flex" : "none",
                    flexDirection: "column",
                    lineHeight: "24px !important",
                    ...spring,
                }}
            >
                <MenuBar
                    id="log-panel-menu-bar"
                    className="log-panel-menu-bar"
                    isDragging={isDragging}
                >
                    <div
                        style={{
                            fontSize: 24,
                        }}
                    >
                        {appTitle}
                    </div>

                    <div
                        id="log-panel-menu-buttons"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <PopOver
                            key="about"
                            content={<About />}
                            delay
                            backgroundColor="rgba(255, 255, 255, 0.95)"
                            placement="right"
                            border
                        >
                            <MenuButton>
                                <Info
                                    theme="filled"
                                    size="28"
                                    fill={theme.colors.active}
                                    strokeWidth={5}
                                />
                            </MenuButton>
                        </PopOver>

                        <PopOver
                            key="config"
                            content={`${visibility.config ? "关闭" : "打开"}设置面板`}
                        >
                            <MenuButton
                                onClick={() => {
                                    store.setVisibility("config", !visibility.config);
                                }}
                                style={{
                                    lineHeight: "normal",
                                    marginLeft: 4,
                                }}
                            >
                                {/* ⚙️ */}
                                <SettingTwo
                                    theme="multi-color"
                                    size="28"
                                    fill={["#333", "#E6E6E6", "#000000", "#ffffff"]}
                                    strokeWidth={3}
                                />
                            </MenuButton>
                        </PopOver>

                        <PopOver key="minimize" content="最小化当前窗口">
                            <MenuButton
                                onClick={() => {
                                    store.setVisibility("log", false);
                                    store.setVisibility("floating", true);
                                }}
                                style={{
                                    lineHeight: "normal",
                                    marginLeft: 4,
                                }}
                            >
                                {/* ❌ */}
                                <Close
                                    theme="filled"
                                    size="28"
                                    fill={theme.colors.error}
                                    strokeWidth={7}
                                />
                            </MenuButton>
                        </PopOver>
                    </div>
                </MenuBar>

                <SimpleBar
                    id="log-panel-log-container"
                    style={{
                        borderTop: "black 2px solid",
                        padding: "4px 8px",
                        flexGrow: 1,
                        maxHeight: 500,
                    }}
                    // scrollbarMinSize={8} 这个没用
                >
                    <Global
                        styles={{
                            ".simplebar-track.simplebar-vertical": {
                                width: "9px !important",
                            },
                        }}
                    />

                    {logs.map((record, index) => {
                        return (
                            // hasExtra => !disabled，避免页面上的PopOver过多，略微优化一下性能
                            <PopOver
                                key={record.timestamp}
                                content={record.extra}
                                placement={"right"}
                                disabled={record.extra === undefined}
                                delay={record.type === "error"}
                            >
                                <RecordContainer
                                    key={record.timestamp}
                                    style={{
                                        marginTop: index === 0 ? 0 : 4,
                                        fontFamily: 'Georgia, "Times New Roman", Times, serif',
                                        textAlign: "start",
                                        // font-family: 华文新魏 !important;
                                        lineHeight: "normal !important", // 某些页面，会修改lineHeight，所以手动重置回来
                                    }}
                                >
                                    {dispatchRecord(record)}
                                </RecordContainer>
                            </PopOver>
                        );
                    })}
                </SimpleBar>
            </animated.div>
        </Rnd>
    );
}
