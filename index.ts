import crypto from 'crypto';
import WebSocket from 'ws';
import { encodeBuffer, decodeBuffer, WsUrl } from './utils';
import { WebRequest, RequestFn } from './fetch';

export interface IWebRequest extends Omit<WebRequest, 'InitWebSocket'> {}

/**
 * getFutuApi 内部实例化 WebSocket 连接，并基于 WebSocket 封装了的查询对象 WebRequest, 你可以使用 `webRequest` 查询各种接口，
 * 也可以使用 `webSocket` 来关闭连接(`webSocket.close()`)和实现事件监听(如 onclose/onopen/onmessage等)
 *
 * Example:
 *
 * ```ts
 * import { getFutuApi } from 'futu-sdk';
 * // import { Trd_Common } from 'futu-sdk/proto';
 *
 * const { webRequest, webSocket } = getFutuApi('ws://127.0.0.1:33333', '9d261112869397f0');
 * try {
 *   const { accList } = (await webRequest.GetAccList({ userID: 0, needGeneralSecAccount: true })) || {};
 *   console.log({ accList });
 * } finally {
 *   webSocket.close();
 * }
 * ```
 * @param wsUrl 连接本地 WebSocket 的地址，如 `ws://127.0.0.1:33333`
 * @param key WebSocket 密钥，每次启动 OpenD 可能都不一样
 * @returns `{ webRequest: WebRequest, webSocket: WebSocket }`
 */
export const getFutuApi = (wsUrl: string, key: string) => {
  const sessionCallback = new Map<number, (result: any) => void>();
  const webSocket = new WebSocket(wsUrl);

  webSocket.binaryType = 'arraybuffer';

  const requestFn: RequestFn = (cmd, protobuf, callback) => {
    const { session, message } = encodeBuffer(cmd, protobuf);
    if (webSocket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket closed');
    }
    webSocket.send(message);
    sessionCallback.set(session, callback);
    return () => {
      sessionCallback.delete(session);
    };
  };

  const requestFnPromise = new Promise<RequestFn>((resolve, reject) => {
    webSocket.addEventListener('open', () => {
      new WebRequest(Promise.resolve(requestFn))
        .InitWebSocket({
          websocketKey: key ? crypto.createHash('md5').update(key).digest('hex') : '',
          programmingLanguage: 'JavaScript',
        })
        .then(() => resolve(requestFn))
        .catch(reject);
    });

    webSocket.addEventListener('message', event => {
      const { session, message } = decodeBuffer(event.data as ArrayBuffer);
      sessionCallback.get(session)?.(message);
    });

    webSocket.addEventListener('close', event => {
      webSocket.removeAllListeners('message');
      webSocket.removeAllListeners('close');
      webSocket.removeAllListeners('open');
      reject(event);
    });
  });

  return { webSocket, webRequest: new WebRequest(requestFnPromise) as IWebRequest };
};

/**
 * @deprecated 已废弃，请使用 `const { webRequest } = getFutuApi(`ws://${host}:${port}`, key);`
 */
export const getWebRequest = ({ host = '127.0.0.1', port = 33333, key }: WsUrl): IWebRequest => {
  const { webRequest } = getFutuApi(`ws://${host}:${port}`, key);
  return webRequest;
};
