const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        environment: {
            arrowFunction: true,
        }
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的方式，下面是按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // postcss这里将less处理后的css进行一个处理，例如添加前缀之类的操作
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }

                    },
                    "less-loader"
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            title: '自定义title'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}