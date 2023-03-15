import { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { animated, config, useSpring } from "@react-spring/web";

import { store, useStore } from "../../store";
import { MenuBar } from "../components/MenuBar";
import { MenuButton } from "../components/MenuButton";
import PopOver from "../components/PopOver";
import { ConfigSection } from "./ConfigSection";
import { IPanel, TabContainer } from "./TabContainer";

export const ConfigItem = styled.div(
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
                    display: display ? "flex" : "none",
                    ...spring,
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
                            ❌
                        </MenuButton>
                    </PopOver>
                </MenuBar>

                <TabContainer panel={panel} />
            </ConfigPanelContainer>
        </Draggable>
    );
}
