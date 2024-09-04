import crypto from 'crypto';

export interface WsUrl {
  host?: string;
  /** 默认WebSocket端口是33333, 不要传API端口11111 */
  port?: number;
  /** WebSocket密钥，必传（即可ssl设为false也要传，否则不能建立连接） */
  key: string;
}

export const getWsUrl = ({ host = '127.0.0.1', port = 33333, key }: WsUrl) => {
  const url = `ws://${host}:${port}`;
  const secret = key ? crypto.createHash('md5').update(key).digest('hex') : '';
  return { url, secret };
};
