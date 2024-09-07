import * as proto from 'futu-sdk/proto';

export default {
  /**< 获取分时 */
  QotUpdateRT: { cmd: 3009, name: proto.Qot_UpdateRT, description: '获取分时' },
  /**< 推送逐笔 */
  QotUpdateTicker: { cmd: 3011, name: proto.Qot_UpdateTicker, description: '推送逐笔' },
  /**< 推送买卖盘 */
  QotUpdateOrderBook: { cmd: 3013, name: proto.Qot_UpdateOrderBook, description: '推送买卖盘' },
  /**< 推送经纪队列 */
  QotUpdateBroker: { cmd: 3015, name: proto.Qot_UpdateBroker, description: '推送经纪队列' },
  /**< 推送到价提醒 */
  QotUpdatePriceReminder: {
    cmd: 3019,
    name: proto.Qot_UpdatePriceReminder,
    description: '推送到价提醒',
  },
  /**< 订单状态变动通知(推送) */
  TrdUpdateOrder: {
    cmd: 2208,
    name: proto.Trd_UpdateOrder,
    description: '订单状态变动通知(推送)',
  },
  /**< 成交通知(推送) */
  TrdUpdateOrderFill: {
    cmd: 2218,
    name: proto.Trd_UpdateOrderFill,
    description: '成交通知(推送)',
  },

  /**< 推送通知 */
  Notify: { cmd: 1003, name: proto.Notify, description: '推送通知' },
  /**< 推送基本行情 */
  QotUpdateBasicQot: {
    cmd: 3005,
    name: proto.Qot_UpdateBasicQot,
    description: '推送基本行情',
  },
  QotUpdateKL: { cmd: 3007, name: proto.Qot_UpdateKL, description: '推送K线' } /**< 推送K线 */,
};
