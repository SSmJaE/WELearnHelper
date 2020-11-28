import path from "path";
import * as fs from "fs";

import webpack from "webpack";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import PACKAGE_JSON from "./package.json";

export default {
    entry: "./src/main.ts",
    output: {
        //__dirname即当前文件所在目录的路径，此处是根目录
        path: path.resolve(__dirname, "./dist"),
        filename: `WElearnHelper${PACKAGE_JSON.version}.user.js`,
    },
    module: {
        rules: [
            //webpack本身就可以识别js文件，所以不需要额外定义规则
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        // options: {
                        //     appendTsSuffixTo: [/\.vue$/],
                        // },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: "url-loader",
                        // options: {
                        //     limit: 8192,
                        // },
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
                exclude: /node_modules/,
            },
        ],
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
        new webpack.BannerPlugin({
            banner: fs.readFileSync("./headers.js", "utf8"),
            raw: true,
            entryOnly: true,
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
