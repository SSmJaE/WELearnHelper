import { css, Global, Theme, ThemeProvider } from "@emotion/react";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { ConfigPanel } from "./Config";
import { FloatingBall } from "./Floating";
import { LogPanel } from "./Log";

export const theme: Theme = {
    colors: {
        primary: "rgb(255, 255, 255)", // 60%
        secondary: "rgb(230, 230, 230)", // 30%
        active: "#2196f3", // 10%
        activeSecondary: "rgb(231, 243, 255)",
        error: "rgb(231, 71, 93)",
    },
    answerTypeColorMapping: {
        GPT: "orange",
        标答: "limegreen",
        无答案: "rgb(231, 71, 93)",
    },
};

export default function App() {
    return (
        <>
            <Global
                // 某些页面，会修改lineHeight，所以手动重置回来
                styles={css`
                    #eocs-helper {
                        all: initial;
                        font-family: 华文新魏 !important;
                        line-height: normal !important;
                        /* 页面可能很长，所以这里使用 fixed 定位 */
                        position: fixed;
                        top: 0;
                        left: 0;
                    }
                `}
            ></Global>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    <LogPanel />
                    <ConfigPanel />
                    <FloatingBall />
                </ErrorBoundary>
            </ThemeProvider>
        </>
    );
}
