import path from "node:path";
import { UserConfig } from "vite";

export const commonConfig: UserConfig = {
    resolve: {
        alias: {
            "@": path.resolve(__dirname),
            "@src": path.resolve(__dirname, "src"),
            "@api": path.resolve(__dirname, "src/api"),
            "@components": path.resolve(__dirname, "src/views/components"),
            "@views": path.resolve(__dirname, "src/views"),
            "@store": path.resolve(__dirname, "src/store"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@static": path.resolve(__dirname, "src/static"),
        },
    },
};
