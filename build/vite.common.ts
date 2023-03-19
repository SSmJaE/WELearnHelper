import dotenv from "dotenv";
import path from "node:path";
import { BuildOptions, UserConfig } from "vite";

import react from "@vitejs/plugin-react";

dotenv.config(); // load env vars from .env

export const commonConfig: UserConfig = {
    resolve: {
        alias: {
            "@": path.resolve(process.cwd()),
            "@src": path.resolve(process.cwd(), "src"),
            "@api": path.resolve(process.cwd(), "src/api"),
            "@components": path.resolve(process.cwd(), "src/views/components"),
            "@views": path.resolve(process.cwd(), "src/views"),
            "@store": path.resolve(process.cwd(), "src/store"),
            "@utils": path.resolve(process.cwd(), "src/utils"),
            "@static": path.resolve(process.cwd(), "src/static"),
        },
    },
};

export const extensionConfig: UserConfig = {
    ...commonConfig,
    define: {
        "process.env.COMPILE_PLATFORM": JSON.stringify(process.env.COMPILE_PLATFORM),
        "process.env.CRX": true,
    },
    plugins: [react()],
};

export function generateBuildOptions({
    fileName,
    filePath,
}: {
    fileName: string;
    filePath: string;
}): BuildOptions {
    return {
        emptyOutDir: false,
        minify: false,
        rollupOptions: {
            input: {
                [fileName]: filePath,
            },
            output: {
                dir: "dist",
                entryFileNames: "[name].js",
                format: "iife",
                // sourcemap: "inline",
            },
            external: ["$"],
        },
    };
}
