import styled from "@emotion/styled";
import { animated, config, Spring, useSpring } from "@react-spring/web";

// import Typist from "react-typist";
export const InlineTag = styled(animated.span)({
    marginRight: 4,
    // border: "1px dashed black",
    borderRadius: 4,
    padding: "2px 4px",
    // lineHeight: "1.5em",
    height: "24px",
    position: "relative",
    userSelect: "none",
});

export function useSlideIn() {
    const spring = useSpring({
        from: { opacity: 1, left: "-100%" },
        to: { opacity: 1, left: "0%" },
        config: {
            ...config.gentle,
        },
    });

    return spring;
}
