# vue-to

npm install

npm run build



#### 一些需要注意的
在package的scripts里面写webpack才会去调用项目下载本身的webpack，因为全局webpack可能会有问题，所以推荐在scripts里写

在webpack.config里面__dirname是指当前的目录

url-loader需要file-loader

vue-loader需要vue-template-compiler

css-loader配置style-loader会把css打包到js里

style-loader依赖stylus



