import styled from "@emotion/styled";
import { useMount } from "ahooks";
import { useState } from "react";

// /**
//  * TypeIt的打字效果总是卡顿，自己实现
//  *
//  * 而且build之后，不知道为啥白屏
//  *
//  * */
// function TypingAnimation({
//     content,
//     startDelay = 600,
//     cursorChar = "█",
//     speed = 25,
// }: {
//     content: string;
//     startDelay: number;
//     cursorChar: string;
//     speed: number;
// }) {
//     const [displayedText, setDisplayedText] = useState("");

//     useMount(() => {
//         let charIndex = 0;

//         setTimeout(() => {
//             const interval = setInterval(() => {
//                 if (charIndex < content.length) {
//                     const text = content.slice(0, charIndex + 1) + cursorChar;
//                     setDisplayedText(text);

//                     charIndex++;
//                 } else {
//                     clearInterval(interval);
//                     setDisplayedText(content);
//                 }
//             }, speed);
//         }, startDelay);
//     });

//     return <>{displayedText}</>;
// }

const TypingAnimationContainer = styled.span<{
    count: number;
    duration: number;
    showCursor: boolean;
}>`
    line-height: normal;
    /* font-family: monospace; */
    /* 有中文的话，尤其是中英文混杂的情况，用不用monospace都一样了 */

    background: linear-gradient(#000000 0 0) 0 0
        ${(props) =>
            props.showCursor
                ? ", linear-gradient(-90deg, #000000 10px, #0000 0) 10px 0"
                : undefined};
    background-clip: text ${(props) => (props.showCursor ? ", padding-box" : undefined)};
    color: transparent;

    background-size: calc(${(props) => props.count} * 1ch) 200%;
    background-repeat: no-repeat;

    @keyframes typing {
        from {
            background-size: 0 200%;
        }
    }

    @keyframes cursor {
        50% {
            background-position: 0 -100%;
        }
    }

    animation: typing ${(props) => props.duration}ms linear 1 alternate;
    animation-timing-function: steps(${(props) => props.count});
`;

/** 还是纯css实现吧，js的实现，都很卡 */
export function TypingAnimation({
    content,
    startDelay = 600,
    interval = 25,
}: {
    content: string;
    startDelay: number;
    interval: number;
}) {
    const [shouldDisplay, setShouldDisplay] = useState(false);
    const [showCursor, setShowCursor] = useState(false);

    const duration = content.length * interval;

    useMount(() => {
        setTimeout(() => {
            setShouldDisplay(true);
            setShowCursor(true);

            setTimeout(() => {
                setShowCursor(false);
                // TODO 需要通过修改background-size来实现，这里改duration不起作用
            }, duration + 250);
        }, startDelay);
    });

    return shouldDisplay ? (
        <TypingAnimationContainer
            count={content.length}
            duration={duration}
            showCursor={showCursor}
        >
            {content}
        </TypingAnimationContainer>
    ) : (
        <></>
    );
}
