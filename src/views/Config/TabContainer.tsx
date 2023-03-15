import { store, useStore } from "../../store";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

import { animated, config, useSpringRef, useTransition } from "@react-spring/web";

export interface IPanel {
    label: string;
    content: JSX.Element;
}

const TabHeader = styled.div({
    height: 30,
    fontSize: 20,
    cursor: "pointer",
    border: "1px solid black",
    // borderRight: "1px solid black",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "华文新魏",
    lineHeight: "normal",
});

export function TabContainer({ panel }: { panel: IPanel[] }) {
    const { tabIndex } = useStore();

    const [hoverTab, setHoverTab] = useState<null | number>(null);

    const theme = useTheme();

    const [direction, setDirection] = useState(true);

    const transRef = useSpringRef();

    // const [transitions, api] = useTransition(
    const transitions = useTransition(
        // [tabIndex],
        tabIndex,
        // (tabIndex) => tabIndex,
        // () => ({
        {
            ref: transRef,
            // keys: tabIndex,

            from: {
                // transform: `translate3d(${dir === 1 ? 100 : -100}%,0,0) scale(0.8)`,
                // transform: "translate3d(100%,0,0) scale(0.8)",
                transform: `translate(0,${direction ? 100 : -100}%)`,
                scale: 0.8,
                // top: direction ? "100%" : "-100%",
                position: "absolute",
                opacity: 0, // 如果旧元素的item只有2，新元素的item有4，加上淡出效果，看起来舒服点，就不折腾zIndex和backgroundColor了
            },
            enter: {
                transform: "translate(0,0%)",
                scale: 1,
                position: "relative",
                opacity: 1,
                // top: "0%",
            },
            leave: {
                // transform: `translate3d(${dir === 1 ? -100 : 100}%,0,0) scale(0.8)`,
                // transform: "translate3d(-100%,0,0) scale(0.8)",
                // transform: `${
                //     direction ? "translate3d(-100%,0,0)" : "translate3d(100%,0,0)"
                // } scale(0.8)`,
                transform: `translate(0,${direction ? -100 : 100}%)`,
                scale: 0.8,
                position: "absolute",
                opacity: 0,
                // top: direction ? "-100%" : "100%",
                // opacity: 0,
            },
            // config: { duration: 600 },
            config: {
                ...config.wobbly,
            },
            // exitBeforeEnter: true,
            // unique: true,
            // }),
        },
        // [tabIndex, direction],
    );

    useEffect(() => {
        transRef.start();
        // api.start();
    }, [tabIndex]);

    return (
        <div
            style={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "row",
                position: "relative",
            }}
        >
            <div
                style={{
                    // position: "fixed",
                    minWidth: 100,
                    margin: "8px 0px 8px 8px",
                    // top: 0,
                    // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
            >
                {panel.map((p, index) => (
                    <TabHeader
                        key={`${p.label}-${index}-header`}
                        onClick={() => {
                            store.setTabIndex(index);
                            setDirection(index > tabIndex);
                        }}
                        onMouseEnter={() => {
                            setHoverTab(index);
                        }}
                        onMouseLeave={() => {
                            setHoverTab(null);
                        }}
                        style={{
                            backgroundColor:
                                tabIndex === index
                                    ? theme.colors.active
                                    : hoverTab === index
                                    ? theme.colors.secondary
                                    : "white",
                            color: tabIndex === index ? "white" : "black",
                            marginTop: index === 0 ? 0 : 8,
                            lineHeight: "normal",
                            fontFamily: "华文新魏",
                        }}
                    >
                        {p.label}
                    </TabHeader>
                ))}
            </div>

            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    // width: 500,
                    margin: 8,

                    // height: "max-content",
                }}
            >
                {transitions((style: any, index) => (
                    <animated.div
                        key={`${panel[index].label}-${index}-content}`}
                        style={{
                            width: "100%",
                            // height: "100%",
                            flexGrow: 1,
                            // display: "flex",
                            // flexDirection: "column",
                            // margin: 8,
                            // padding: 8,
                            // position: "absolute",
                            ...style,
                            // height: "500px",
                            // width: "calc(100% - 80px)",
                            // marginLeft: 100,
                            lineHeight: "normal",
                            fontFamily: "华文新魏",
                        }}
                    >
                        {panel[index].content}
                    </animated.div>
                ))}

                {/* {panel.map((p, index) =>
                tabIndex === index ? (
                    <div
                        key={`${p.label}-content}`}
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            height: "100%",
                            // width: "calc(100% - 80px)",
                            // marginLeft: 100,
                        }}
                    >
                        {p.content}
                    </div>
                ) : (
                    <></>
                ),
            )} */}
            </div>
        </div>
    );
}
