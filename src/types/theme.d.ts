import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            primary: string;
            secondary: string;
            active: string;
            activeSecondary: string;
            error: string;
        };
    }
}
