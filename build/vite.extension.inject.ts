import { defineConfig } from "vite";

import { extensionConfig, generateBuildOptions } from "./vite.common";

export default defineConfig({
    ...extensionConfig,
    build: generateBuildOptions({
        fileName: "inject",
        filePath: "src/utils/polyfill/extension/inject.ts",
    }),
});
