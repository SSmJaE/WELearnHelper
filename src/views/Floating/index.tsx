import { css, keyframes } from "@emotion/react";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { store, useStore } from "../../store";
import PopOver from "../components/PopOver";

export function FloatingBall() {
    const {
        visibility,
        position: { floating, log },
    } = useStore();

    const [isDragging, setIsDragging] = useState(false);

    // useEffect(() => {
    //     store.setPosition("floating", {
    //         x: log.x,
    //         y: log.y,
    //     });
    // }, [log.x, log.y]);

    // const breathingColor = "rgba(84, 223, 130, 0.75)";
    const inhaleColor = "limegreen";
    const exhaleColor = "rgba(84, 223, 130, 0.75)";

    // const breathing = keyframes
    //     from {
    //         box-shadow: 0px 0px 5px 0px ${breathingColor} inset;
    //     }
    //     to {
    //         box-shadow: 0px 0px 25px 0px ${breathingColor} inset;
    //     }
    // `;

    const [spring, api] = useSpring(() => ({
        from: {
            boxShadow: `0px 0px 5px 0px ${exhaleColor} inset`,
        },
        to: [
            {
                boxShadow: `0px 0px 25px 0px ${inhaleColor} inset`,
            },
            {
                boxShadow: `0px 0px 5px 0px ${exhaleColor} inset`,
            },
        ],
        config: {
            // ...config.wobbly,
            duration: 3000,
        },
        loop: true,
    }));

    return (
        <Draggable
            handle="#floating-ball"
            bounds="body"
            onStart={() => {
                setIsDragging(true);
            }}
            // onDrag={(e, data) => {
            //     store.setPosition("floating", {
            //         x: data.x,
            //         y: data.y,
            //     });
            // }}
            onStop={(e, data) => {
                setIsDragging(false);
                // store.setPosition("floating", {
                //     x: data.x,
                //     y: data.y,
                // });
            }}
            // position={{
            //     x: floating.x,
            //     y: floating.y,
            // }}
        >
            <animated.div
                id="floating-ball"
                style={{
                    position: "absolute",
                    top: 100,
                    right: 100,
                    zIndex: 101,
                    background: "rgba(255, 255, 255, 0.95)",
                    // border: "black 2px solid",
                    borderRadius: "50%",
                    width: 70,
                    height: 70,
                    display: visibility.floating ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: isDragging ? "grabbing" : "grab",
                    /* animation: `${breathing} s linear infinite`, */
                    ...(visibility.floating ? spring : {}), // 避免动画在隐藏时执行
                }}
                onDoubleClick={() => {
                    store.setVisibility("floating", false);
                    store.setVisibility("log", true);
                }}
            >
                <PopOver
                    content={"双击悬浮球可以显示日志面板"}
                    disabled={isDragging}
                    placement={"top"}
                    offsetPixel={24}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        悬浮球
                    </div>
                </PopOver>
            </animated.div>
        </Draggable>
    );
}
