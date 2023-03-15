import { css, Global, ThemeProvider } from "@emotion/react";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { ConfigPanel } from "./Config";
import { FloatingBall } from "./Floating";
import { LogPanel } from "./Log";

const theme = {
    closeButton: "hotpink",
    colors: {
        primary: "rgb(255, 255, 255)", // 60%
        secondary: "rgb(230, 230, 230)", // 30%
        active: "#2196f3", // 10%
        activeSecondary: "rgb(231, 243, 255)",
    },
};

export default function App() {
    return (
        <>
            <Global
                // 某些页面，会修改lineHeight，所以手动重置回来
                styles={css`
                    #ecos-helper {
                        all: initial;
                        font-family: 华文新魏 !important;
                        line-height: normal !important;
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
