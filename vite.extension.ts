import dotenv from "dotenv";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import metadata from "./metadata.json";
import { commonConfig } from "./vite.common";

dotenv.config(); // load env vars from .env

import { visualizer } from "rollup-plugin-visualizer";
// console.log(process.env);

// https://vitejs.dev/config/
export default defineConfig({
    ...commonConfig,
    define: {
        "process.env.COMPILE_PLATFORM": JSON.stringify(process.env.COMPILE_PLATFORM),
        "process.env.CRX": true,
    },
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                index: "src/index.tsx",
                inject: "src/utils/polyfill/extension/inject.ts",
                content: "src/utils/polyfill/extension/content.ts",
                background: "src/utils/polyfill/extension/background.ts",
            },
            output: {
                dir: "dist",
                entryFileNames: "[name].js",
                // sourcemap: "inline",
            },
            plugins: [visualizer()],
            external: ["$"],
        },
    },
});
