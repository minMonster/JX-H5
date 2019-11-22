# jx-app h5 端

* author：Monster

* tel: 15075653544

* QQ: 597080722

有疑问可以随时找我

## 环境
node + npm
默认使用最稳定版本 node 就可以

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# 项目架构

cli2.0 + VUX UI库 + axios

# 本机开发

本地开发需要在浏览器 BASE_URL 后面拼接 token
token 是存在 sessionStorage 里面的

```javascript
// http://localhost:8081/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiVXNlcklEXCI6MTAwMDI3OCxcIk90aGVyVXNlcklEXCI6Mjc4LFwiVXNlclR5cGVcIjpcIlVzZXJcIixcIk5hbWVcIjpcIuKclGVuc29uXCIsXCJsb2dpbk5hbWVcIjpcIjE3NzYzMzA4Mzc3XCJ9IiwibmJmIjoxNTcyOTY3MDM4LCJleHAiOjE1NzMwNTM0Mzh9.e5y1Mkb5gl57mIwBWP2X6BgmViDwFOSTvmxIUCNjZFw
```

# 与安卓交互操作是通过 jsbridge.js 来 进行交互的

```javascript
import { setupWebViewJavascriptBridge } from '@/common/jsbridge'

setupWebViewJavascriptBridge((bridge) => {
  bridge.callHandler('callPhone', {phone: this.detail.phone});
});
```

# 安卓需要跳转的路由都注册在 native-route.js
```javascript
// src/native-route.js
```
