const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizePlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./common.config.js");
const {version} = require("./utils.js");
const webpack = require("webpack");

module.exports = merge(common,{
    module: {
        rules: [{
            use: [{
                    loader: miniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../../"
                    }
                },
                "css-loader", "postcss-loader", "less-loader"
            ],
            test: /\.(css|less)$/,
        }]
    },
    plugins: [
        new optimizePlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
        new miniCssExtractPlugin({
            filename: `css/${version}/[name].css`,
        }),
        // new webpack.DefinePlugin({
        //     "process.env.NODE_ENV" : "production",
        //     "dev" : false
        // }),
        // 不需要添加 --mode production 会自动添加次功能
        // new uflify()
    ]
})