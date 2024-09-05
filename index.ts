import WebSocket from 'ws';
import { encodeBuffer, decodeBuffer, getWsUrl, WsUrl } from './utils';
import { WebRequest } from './fetch';

export interface IWebRequest extends Omit<WebRequest, 'InitWebSocket'> {}

export const getWebRequest = (wsUrl: WsUrl): IWebRequest => {
  const { url, secret } = getWsUrl(wsUrl);
  const sessionResolve = new Map<number, (result: any) => void>();

  const websocket = new WebSocket(url);
  websocket.binaryType = 'arraybuffer';

  let closeEvent: WebSocket.CloseEvent;

  const getWebRequest = (WebSocketInited: Promise<boolean>) => {
    return new WebRequest(async (cmd, protobuf) => {
      const { session, message } = encodeBuffer(cmd, protobuf);
      if ((await WebSocketInited) && closeEvent) {
        const { code, reason, type } = closeEvent;
        throw new Error(`closed, ${JSON.stringify({ code, reason, type })}`);
      }
      try {
        return await new Promise<any>((resolve, reject) => {
          sessionResolve.set(session, resolve);
          websocket.send(message);
          setTimeout(() => {
            reject(new Error('timeout'));
          }, 10 * 1000);
        });
      } finally {
        sessionResolve.delete(session);
      }
    });
  };

  const webSocketInited = new Promise<boolean>((resolve, reject) => {
    websocket.onopen = () => {
      getWebRequest(Promise.resolve(true))
        .InitWebSocket({ websocketKey: secret, programmingLanguage: 'JavaScript' })
        .then(() => resolve(true));
    };

    websocket.onmessage = event => {
      const { session, message } = decodeBuffer(event.data as ArrayBuffer);
      sessionResolve.get(session)?.(message);
    };

    websocket.onerror = error => {
      reject(new Error(error.message));
    };

    websocket.onclose = event => {
      closeEvent = event;
    };
  });
  return getWebRequest(webSocketInited);
};
