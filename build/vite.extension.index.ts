import path from "path";
import { defineConfig } from "vite";

import { extensionConfig, generateBuildOptions } from "./vite.common";

// console.log({
//     ...extensionConfig,
//     build: generateBuildOptions({
//         fileName: "index",
//         filePath: "src/index.tsx",
//     }),
// });

export default defineConfig({
    ...extensionConfig,
    build: generateBuildOptions({
        fileName: "index",
        filePath: "src/index.tsx",
    }),
});
