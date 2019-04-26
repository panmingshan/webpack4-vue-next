const {
    resolve,
    getHappy,
    getHtmlWebpackPlugin,
    version,
    getEntryAndHtmlWebpackPluginObj 
} = require("./utils.js");

const webpack = require("webpack");
const cleanPlugin = require("clean-webpack-plugin");
const copy = require("copy-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const entryAndHtmlObj = getEntryAndHtmlWebpackPluginObj("../src/views");

module.exports = {
    entry: entryAndHtmlObj.entrys,
    //,getPath("./src/views/test2.js")
    output: {
        path: resolve("../build"),
        filename: `js/${version}/[name].js`,
        // publicPath : "http://www.baidu.com"
    },
    module: {
        // noParse : /jquery/,
        rules: [{
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "haha/[hash][name].[ext]",
                        limit: 8192,
                        outputPath: "image"
                        // publicPath : "../"
                    }
                }],
                test: /\.(jpg|jpeg|png|gif)$/
            },
            {
                test: /.js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ), //[getPath("../node_modules/")]
                use: [{
                    loader: "happypack/loader?id=jsloader",
                    // babel-loader?cacheDirectory=true
                    // options : {
                    //     presets : ["@babel/preset-env"]
                    // }
                }]
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            }
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: "html-loader",
            //         options : {
            //             attrs : ['img:src','img:data-src'],
            //         }
            //     }]
            // }
            // {
            //     use : ["style-loader","css-loader","sass-loader"],
            //     test : /\.scss$/
            // }
        ]
    },
    resolve: {
        extensions: [".js", ".vue", ".css", ".less", ".json"],
        modules: [
            resolve("../node_modules"),
            resolve("../src"),
        ],
        alias: {
            "@": resolve("../src"),
            // "$" : "jQuery"
        }
    },
    watchOptions: {
        ignored: [resolve("../node_modules")]
    },
    plugins: [
        new vueLoaderPlugin(),
        new copy([{
            from: resolve("../src/static"),
            to: resolve("../build/static")
        }]),
        getHappy("jsloader", ["babel-loader?cacheDirectory=true"]),
        new cleanPlugin(),
        new webpack.ProvidePlugin({

        }),
        ...entryAndHtmlObj.htmlWebpackPlugins
    ],
    externals : {
        vue : "Vue",
        jquery : "jQuery"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                //打包公共模块
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    name: 'commons' //提取出来的文件命名
                },
                // vendors: {
                //     test: /node_modules/,
                //     chunks: 'initial',
                //     name: 'vendor',
                //     priority: 10,
                //     enforce: true
                // }
            }
        }
    }
}