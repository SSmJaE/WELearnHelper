import path from "path";
import * as fs from "fs";

import webpack, { Configuration } from "webpack";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import PACKAGE_JSON from "./package.json";
import rules from "./webpack.rules";

const config: Configuration = {
    entry: "./src/main.ts",
    output: {
        //__dirname即当前文件所在目录的路径，此处是根目录
        path: path.resolve(__dirname, "./dist"),
        filename: `WELearnHelper${PACKAGE_JSON.version}.user.js`,
    },
    module: {
        rules: rules,
    },
    plugins: [
        // 使用webpack打包vue文件，必须需要这个插件
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: "Output Management",
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
    resolve: {
        //import的时候，可以不用写扩展名
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
            "@src": path.resolve(__dirname, "./src/"),
            "@utils": path.resolve(__dirname, "./src/utils/"),
            "@assets": path.resolve(__dirname, "./assets/"),
            "@plugins": path.resolve(__dirname, "./src/plugins/"),
        },
    },
};

export default config;
