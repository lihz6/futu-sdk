import { getFutuApi } from '../';

test('futu-sdk GetAccList', async () => {
  await new Promise<void>(async resolve => {
    const { webRequest, webSocket } = getFutuApi('ws://127.0.0.1:33333', (process.env as any).WEBSOCKET_KEY);
    try {
      const { accList } = (await webRequest.GetAccList({ userID: 0, needGeneralSecAccount: true })) || {};
      expect(accList?.length || 0).toBeGreaterThan(0);
      webSocket.onclose = () => {
        resolve();
      };
    } finally {
      webSocket.close();
    }
  });
});
