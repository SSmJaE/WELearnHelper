import { useHover } from "ahooks";
import { createRef, useRef, useState } from "react";

import { store } from "@/src/store";
import logger, { IQuestionContent, IQuestionRecord } from "@/src/utils/logger";
import { useTheme } from "@emotion/react";
import { animated, config, useSpring, useSprings, useTrail } from "@react-spring/web";

import Button from "../../components/Button";
import { InlineTag, useSlideIn } from "../../components/InlineTag";
import { TypingAnimation } from "../../components/TypingAnimation";

function SolveButton({ content: { solve, answerText } }: { content: IQuestionContent }) {
    const [isHovering, setIsHovering] = useState(false);

    // let buttonText: string = "解答该题";

    // if (solve.couldSolve) {
    //     if (solve.hasSolved) {
    //         if (isHovering) {
    //             buttonText = "再次解答";
    //         } else {
    //             buttonText = "已解答👌";
    //         }
    //     }
    // } else {
    //     buttonText = "无法解答";
    // }

    // TODO 完成这个功能
    const buttonText = "无法解答";

    return (
        <Button
            // TODO
            disabled
            // disabled={!solve.couldSolve}
            onClick={() => {
                solve.solveThis(answerText);
            }}
            onMouseEnter={() => {
                setIsHovering(true);
            }}
            onMouseLeave={() => {
                setIsHovering(false);
            }}
        >
            {buttonText}
        </Button>
    );
}

function CopyButton({ answerText }: { answerText: string }) {
    const [buttonText, setButtonText] = useState("复制答案");

    return (
        <Button
            onClick={() => {
                // 这个有时候并不起作用
                navigator.clipboard.writeText(answerText);
                const copyFrom = document.createElement("textarea");

                copyFrom.textContent = answerText;

                document.body.appendChild(copyFrom);

                copyFrom.select();

                // 虽然这个方法已经被废弃，但是有用
                document.execCommand("copy");

                copyFrom.blur();

                document.body.removeChild(copyFrom);

                setButtonText("已复制👌");
                setTimeout(() => {
                    setButtonText("复制答案");
                }, 1000);
            }}
        >
            {buttonText}
        </Button>
    );
}

export function QuestionRecord({ record }: { record: IQuestionRecord }) {
    const [isHover, setHover] = useState(false);

    const theme = useTheme();

    const spring = useSlideIn();

    return (
        <animated.div
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            style={{
                position: "relative",
                lineHeight: "24px",
                // ...(store.userSettings.enableTyping ? spring : {}),
            }}
        >
            {/* 题号 */}
            <InlineTag
                style={{
                    ...spring,
                    backgroundColor: theme.colors.active,
                    color: "white",
                }}
            >
                {record.content.order}
            </InlineTag>
            <InlineTag
                style={{
                    ...spring,
                    // backgroundColor: "limegreen", // "red" "yellow"
                    backgroundColor: record.content.info.color
                        ? record.content.info.color
                        : theme.answerTypeColorMapping[record.content.info.content] ?? "gray",
                    color: "white",
                    fontFamily: "华文新魏",
                }}
            >
                {/* 标答、无答案、GPT */}
                {record.content.info.content}
            </InlineTag>
            {/* 至少两行的宽度，让inlineTag和inlineButton不会打架 */}

            {/* 不考虑虚拟列表的话，没必要conditional 选择typeit还是普通span */}

            {store.userSettings.enableTyping ? (
                <TypingAnimation
                    content={record.content.answerText}
                    startDelay={600}
                    interval={35}
                />
            ) : (
                <animated.span
                    style={{
                        ...spring,
                        position: "relative",
                    }}
                >
                    {record.content.answerText}
                </animated.span>
            )}

            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    display: isHover ? "flex" : "none",
                    // zIndex: ,
                }}
            >
                {/* hover时，显示在最后一行的最右边 */}
                {record.action &&
                    record.action.map(({ children, ...restProps }, index) => (
                        <Button key={index} {...restProps}>
                            {children}
                        </Button>
                    ))}
                <SolveButton content={record.content} />
                <CopyButton answerText={record.content.answerText} />
            </div>

            {/* <div>hover时，在面板外部显示的tooltip(题目解析，或者听力原文)</div> */}
        </animated.div>
    );
}
