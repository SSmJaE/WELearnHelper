// const { merge } = require("webpack-merge");
// const common = require("./webpack.common.babel.js");

import { merge } from "webpack-merge";
import common from "./webpack.common.babel.js";

export default merge(common, {
    mode: "production",
    // devtool: "source-map",
});
