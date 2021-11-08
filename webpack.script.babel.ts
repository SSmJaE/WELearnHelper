import fs from "fs";

import webpack, { Configuration } from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.babel";

const config: Configuration = {
    mode: "production",
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            CRX: false,
            LITE: false,
        }),
        new webpack.BannerPlugin({
            banner: fs.readFileSync("./headers.js", "utf8"),
            raw: true,
            entryOnly: true,
        }),
    ],
    externals: {
        vue: "Vue",
        $: "jQuery",
    },
};

export default merge(common, config);
