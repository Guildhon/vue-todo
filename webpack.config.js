const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,     // 默认是打包到另一个文件，如果超过1024则转成base64
                            name: 'images/[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
           'process.env': {
               NODE_ENV: isDev ?  '"development"' : '"production"'
           }
        }),
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'  // 调试时可以映射代码
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true,        // 错误显示在网页上
        },
        hot: true               // 组件热重载，需要下面两个插件配合
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}


module.exports = config

