<div align="center">
  <a target="__blank" href="https://www.npmjs.com/package/futu-sdk"><img src="https://img.shields.io/npm/v/futu-sdk"/></a>
  <a target="__blank" href="https://www.npmjs.com/package/futu-sdk"><img src="https://img.shields.io/npm/dt/futu-sdk.svg"/></a>
</div>

## 说明

[`futu-sdk`](https://www.npmjs.com/package/futu-sdk)用于对接[富途 OpenAPI 量化接口](https://openapi.futunn.com/futu-api-doc/intro/intro.html?lang=zh-cn)的网关程序 OpenD. 虽然富途官方提供了配套的 `futu-api`, 但如果你在使用 `futu-api` 过程中遇到了一些卡点，可以尝试选择 `futu-sdk` 来对接。这些卡点可能是：

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

对应官方[获取交易业务账户列表](https://openapi.futunn.com/futu-api-doc/trade/get-acc-list.html)的例子，`futu-sdk` 简化了建立连接逻辑，提供了基于 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) / [`Generator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)(`Sub` 和 `SubAccPush` 两个接口返回是 `Generator`，其他都是 `Promise`) 的接口和类型支持。

```ts
import { getFutuApi } from 'futu-sdk';
// import { Trd_Common } from 'futu-sdk/proto';

const { webRequest, webSocket } = getFutuApi('ws://127.0.0.1:33333', '9d261112869397f0');
try {
  const { accList } = await webRequest.GetAccList({ userID: 0, needGeneralSecAccount: true });
  console.log({ accList });
} finally {
  webSocket.close();
}
```

其他接口的使用方式如此类推，需要特别注意的是 `futu-sdk` 统一简化了两个数据结构：

- 请求参数：只需传入 `req`, 自动将 `req` 装箱为 `{ c2s: req }`;
- 响应结果：直接使用 `res`, 自动将 `{ s2c: res }` 拆箱为 `res`.
