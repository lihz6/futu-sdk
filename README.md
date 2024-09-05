## 说明

本 SDK 用于对接[富途 OpenAPI 量化接口](https://openapi.futunn.com/futu-api-doc/intro/intro.html?lang=zh-cn)的网关程序 OpenD. 虽然富途官方提供了配套的[`futu-api`](https://www.npmjs.com/package/futu-api)，但如果你在使用 `futu-api` 过程中遇到了一些卡点，可以尝试选择[`futu-sdk`](https://www.npmjs.com/package/futu-sdk)来对接。这些卡点可能是：

- 依赖缺失(如 `long`, `WebSocket`, `memcpy`)、不兼容(`node >=0.8 <=0.12`)或过于老旧(如 `bytebuffer`)
- 模块化接口不一致(`commonjs` 与 `esm` 混用)
- 缺少类型支持和提示等

## 使用

#### 1. 安装

本 SDK 提供可直接执行的 [commonjs](https://nodejs.org/api/modules.html) 和 [esm](https://nodejs.org/api/esm.html) 模块，也可以在 [nextjs](https://nextjs.org/), [nestjs](https://nestjs.com/), [create-react-app](https://create-react-app.dev/) 等开发环境下安装使用。

```bash
$ npm install --save futu-sdk
```

#### 2. 使用

对应官方[获取交易业务账户列表](https://openapi.futunn.com/futu-api-doc/trade/get-acc-list.html)的例子，`futu-sdk`简化了连接逻辑和请求参数，提供了基于 `Promise` 的接口和类型支持。

```ts
import { getWebRequest } from 'futu-sdk';
// import { Trd_Common } from 'futu-sdk/proto';

const webRequest = getWebRequest({ key: '7522027ccf5a06b1' });

const { accList } = await webRequest.GetAccList({ userID: 0, needGeneralSecAccount: true });

console.log(accList);
```

### 支持

目前还有大部分接口未补充类型注释(见[fetch/index.ts](https://github.com/lihz6/futu-sdk/blob/master/fetch/index.ts)), 欢迎补充。
