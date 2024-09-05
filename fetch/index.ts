import * as proto from 'futu-sdk/proto';

const C2S = {
  // 全局协议
  InitWebSocket: { cmd: 1, name: proto.InitWebSocket, description: '初始化连接' } /**< 初始化连接 */,
  GetGlobalState: { cmd: 1002, name: proto.GetGlobalState, description: '获取全局状态' } /**< 获取全局状态 */,
  KeepAlive: { cmd: 1004, name: proto.KeepAlive, description: '心跳' } /**< 心跳 */,
  GetUserInfo: { cmd: 1005, name: proto.GetUserInfo, description: '获取用户信息' } /**< 获取用户信息 */,
  GetDelayStatistics: { cmd: 1007, name: proto.GetDelayStatistics, description: '获取延迟统计' } /**< 获取延迟统计 */,
  // 行情-实时数据协议
  QotSub: { cmd: 3001, name: proto.Qot_Sub, description: '订阅或者反订阅' } /**< 订阅或者反订阅 */,
  QotRegQotPush: { cmd: 3002, name: proto.Qot_RegQotPush, description: '注册推送' } /**< 注册推送 */,
  QotGetSubInfo: { cmd: 3003, name: proto.Qot_GetSubInfo, description: '获取订阅信息' } /**< 获取订阅信息 */,
  QotGetBasicQot: { cmd: 3004, name: proto.Qot_GetBasicQot, description: '获取基本行情' } /**< 获取基本行情 */,
  QotGetKL: { cmd: 3006, name: proto.Qot_GetKL, description: '获取K线' } /**< 获取K线 */,
  QotGetRT: { cmd: 3008, name: proto.Qot_GetRT, description: '获取分时' } /**< 获取分时 */,
  QotGetTicker: { cmd: 3010, name: proto.Qot_GetTicker, description: '获取逐笔' } /**< 获取逐笔 */,
  QotGetOrderBook: { cmd: 3012, name: proto.Qot_GetOrderBook, description: '获取买卖盘' } /**< 获取买卖盘 */,
  QotGetBroker: { cmd: 3014, name: proto.Qot_GetBroker, description: '获取经纪队列' } /**< 获取经纪队列 */,

  //	行情-历史数据协议
  QotGetHistoryKL: { cmd: 3100, name: proto.Qot_GetHistoryKL, description: '获取历史K线' } /**< 获取历史K线 */,
  QotGetHistoryKLPoints: {
    cmd: 3101,
    name: proto.Qot_GetHistoryKLPoints,
    description: '获取多只股票历史单点K线',
  } /**< 获取多只股票历史单点K线 */,
  QotGetRehab: { cmd: 3102, name: proto.Qot_GetRehab, description: '获取复权信息' } /**< 获取复权信息 */,
  QotRequestHistoryKL: {
    cmd: 3103,
    name: proto.Qot_RequestHistoryKL,
    description: '拉取历史K线，不读本地历史数据DB',
  } /**< 拉取历史K线，不读本地历史数据DB */,
  QotRequestHistoryKLQuota: {
    cmd: 3104,
    name: proto.Qot_RequestHistoryKLQuota,
    description: '拉取历史K线已经用掉的额度',
  } /**< 拉取历史K线已经用掉的额度 */,
  QotRequestRehab: {
    cmd: 3105,
    name: proto.Qot_RequestRehab,
    description: '拉取复权信息，不读本地历史数据DB',
  } /**< 拉取复权信息，不读本地历史数据DB */,

  // 行情-其他数据协议
  QotGetSuspend: { cmd: 3201, name: proto.Qot_GetSuspend, description: '获取股票停牌信息' } /**< 获取股票停牌信息 */,
  QotGetStaticInfo: {
    cmd: 3202,
    name: proto.Qot_GetStaticInfo,
    description: '获取股票静态信息',
  } /**< 获取股票静态信息 */,
  QotGetSecuritySnapshot: {
    cmd: 3203,
    name: proto.Qot_GetSecuritySnapshot,
    description: '获取股票快照',
  } /**< 获取股票快照 */,
  QotGetPlateSet: {
    cmd: 3204,
    name: proto.Qot_GetPlateSet,
    description: '获取板块集合下的板块',
  } /**< 获取板块集合下的板块 */,
  QotGetPlateSecurity: {
    cmd: 3205,
    name: proto.Qot_GetPlateSecurity,
    description: '获取板块下的股票',
  } /**< 获取板块下的股票 */,
  QotGetReference: {
    cmd: 3206,
    name: proto.Qot_GetReference,
    description: '获取正股相关股票，暂时只有窝轮',
  } /**< 获取正股相关股票，暂时只有窝轮 */,
  QotGetOwnerPlate: {
    cmd: 3207,
    name: proto.Qot_GetOwnerPlate,
    description: '获取股票所属板块',
  } /**< 获取股票所属板块 */,
  QotGetHoldingChangeList: {
    cmd: 3208,
    name: proto.Qot_GetHoldingChangeList,
    description: '获取大股东持股变化列表',
  } /**< 获取大股东持股变化列表 */,
  QotGetOptionChain: { cmd: 3209, name: proto.Qot_GetOptionChain, description: '获取期权链' } /**< 获取期权链 */,
  QotGetWarrant: { cmd: 3210, name: proto.Qot_GetWarrant, description: '获取涡轮' } /**< 获取涡轮 */,
  QotGetCapitalFlow: { cmd: 3211, name: proto.Qot_GetCapitalFlow, description: '获取资金流向' } /**< 获取资金流向 */,
  QotGetCapitalDistribution: {
    cmd: 3212,
    name: proto.Qot_GetCapitalDistribution,
    description: '获取资金分布',
  } /**< 获取资金分布 */,
  QotGetUserSecurity: {
    cmd: 3213,
    name: proto.Qot_GetUserSecurity,
    description: '获取自选股分组下的股票',
  } /**< 获取自选股分组下的股票 */,
  QotModifyUserSecurity: {
    cmd: 3214,
    name: proto.Qot_ModifyUserSecurity,
    description: '修改自选股分组下的股票',
  } /**< 修改自选股分组下的股票 */,
  QotStockFilter: { cmd: 3215, name: proto.Qot_StockFilter, description: '条件选股' } /**< 条件选股 */,
  QotGetCodeChange: {
    cmd: 3216,
    name: proto.Qot_GetCodeChange,
    description: '获取股票代码变化信息',
  } /**< 获取股票代码变化信息*/,
  QotGetIpoList: { cmd: 3217, name: proto.Qot_GetIpoList, description: '获取新股IPO' } /**< 获取新股IPO */,
  QotGetFutureInfo: {
    cmd: 3218,
    name: proto.Qot_GetFutureInfo,
    description: '获取期货合约资料',
  } /**< 获取期货合约资料 */,
  QotRequestTradeDate: {
    cmd: 3219,
    name: proto.Qot_RequestTradeDate,
    description: '获取市场交易日',
  } /**< 获取市场交易日 */,
  QotSetPriceReminder: {
    cmd: 3220,
    name: proto.Qot_SetPriceReminder,
    description: '设置到价提醒',
  } /**< 设置到价提醒 */,
  QotGetPriceReminder: {
    cmd: 3221,
    name: proto.Qot_GetPriceReminder,
    description: '获取到价提醒',
  } /**< 获取到价提醒 */,
  QotGetUserSecurityGroup: {
    cmd: 3222,
    name: proto.Qot_GetUserSecurityGroup,
    description: '获取自选股分组列表',
  } /**< 获取自选股分组列表 */,
  QotGetMarketState: {
    cmd: 3223,
    name: proto.Qot_GetMarketState,
    description: '获取股票对应市场状态',
  } /**< 获取股票对应市场状态 */,
  QotGetOptionExpirationDate: {
    cmd: 3224,
    name: proto.Qot_GetOptionExpirationDate,
    description: '获取期权链到期日',
  } /**< 获取期权链到期日 */,

  // 交易协议
  TrdGetAccList: { cmd: 2001, name: proto.Trd_GetAccList, description: '获取交易账户列表' } /**< 获取交易账户列表 */,
  TrdUnlockTrade: { cmd: 2005, name: proto.Trd_UnlockTrade, description: '解锁或锁定交易' } /**< 解锁或锁定交易 */,
  TrdSubAccPush: {
    cmd: 2008,
    name: proto.Trd_SubAccPush,
    description: '订阅接收推送数据的交易账户',
  } /**< 订阅接收推送数据的交易账户 */,
  TrdGetFunds: { cmd: 2101, name: proto.Trd_GetFunds, description: '获取账户资金' } /**< 获取账户资金 */,
  TrdGetPositionList: { cmd: 2102, name: proto.Trd_GetPositionList, description: '获取账户持仓' } /**< 获取账户持仓 */,
  TrdGetMaxTrdQtys: {
    cmd: 2111,
    name: proto.Trd_GetMaxTrdQtys,
    description: '获取最大交易数量',
  } /**< 获取最大交易数量 */,
  TrdGetOrderList: { cmd: 2201, name: proto.Trd_GetOrderList, description: '获取订单列表' } /**< 获取订单列表 */,
  TrdPlaceOrder: { cmd: 2202, name: proto.Trd_PlaceOrder, description: '下单' } /**< 下单 */,
  TrdModifyOrder: { cmd: 2205, name: proto.Trd_ModifyOrder, description: '修改订单' } /**< 修改订单 */,

  TrdGetOrderFillList: {
    cmd: 2211,
    name: proto.Trd_GetOrderFillList,
    description: '获取成交列表',
  } /**< 获取成交列表 */,

  TrdGetHistoryOrderList: {
    cmd: 2221,
    name: proto.Trd_GetHistoryOrderList,
    description: '获取历史订单列表',
  } /**< 获取历史订单列表 */,
  TrdGetHistoryOrderFillList: {
    cmd: 2222,
    name: proto.Trd_GetHistoryOrderFillList,
    description: '获取历史成交列表',
  } /**< 获取历史成交列表 */,
  TrdGetMarginRatio: {
    cmd: 2223,
    name: proto.Trd_GetMarginRatio,
    description: '获取融资融券数据',
  } /**< 获取融资融券数据 */,
  TrdGetOrderFee: {
    cmd: 2225,
    name: proto.Trd_GetOrderFee,
    description: '获取订单收费明细数据',
  } /**< 获取订单收费明细数据 */,
};

const REQ = {
  QotUpdateRT: { cmd: 3009, name: proto.Qot_UpdateRT, description: '获取分时' } /**< 获取分时 */,
  QotUpdateTicker: { cmd: 3011, name: proto.Qot_UpdateTicker, description: '推送逐笔' } /**< 推送逐笔 */,
  QotUpdateOrderBook: { cmd: 3013, name: proto.Qot_UpdateOrderBook, description: '推送买卖盘' } /**< 推送买卖盘 */,
  QotUpdateBroker: { cmd: 3015, name: proto.Qot_UpdateBroker, description: '推送经纪队列' } /**< 推送经纪队列 */,
  QotUpdatePriceReminder: {
    cmd: 3019,
    name: proto.Qot_UpdatePriceReminder,
    description: '推送到价提醒',
  } /**< 推送到价提醒 */,
  TrdUpdateOrder: {
    cmd: 2208,
    name: proto.Trd_UpdateOrder,
    description: '订单状态变动通知(推送)',
  } /**< 订单状态变动通知(推送) */,
  TrdUpdateOrderFill: {
    cmd: 2218,
    name: proto.Trd_UpdateOrderFill,
    description: '成交通知(推送)',
  } /**< 成交通知(推送) */,

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

export class WebRequest {
  private request: ({ cmd, name, description }: (typeof C2S)[keyof typeof C2S], req: any) => Promise<any>;

  constructor(
    requestFn: (
      cmd: number,
      protobuf: Uint8Array
    ) => Promise<{ protobuf: Uint8Array; errorCode: number; errorMessage: string }>
  ) {
    this.request = async ({ name, cmd, description }, req) => {
      const c2s = name.Request.create({ c2s: req }) as any;
      const { protobuf, errorCode, errorMessage } = await requestFn(cmd, name.Request.encode(c2s).finish());
      if (errorCode) {
        throw new Error(`${description}, errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
      }
      const { s2c, retMsg, retType } = name.Response.decode(protobuf);
      if (retType) {
        throw new Error(`${description}, retType: ${retType}, retMsg: ${retMsg}`);
      }
      return s2c;
    };
  }
  /**
   * @brief 初始化连接
   * @param [in] stReq 请求包，具体字段请参考InitWebSocket.proto协议
   */
  InitWebSocket(req: proto.InitWebSocket.IRequest['c2s']): Promise<proto.InitWebSocket.IResponse['s2c']> {
    return this.request(C2S.InitWebSocket, req);
  }
  /**
   * @brief 订阅，反订阅
   * @param [in] stReq 请求包，具体字段请参考Qot_Sub.proto协议
   */
  Sub(req: proto.Qot_Sub.IRequest['c2s']): Promise<proto.Qot_Sub.IResponse['s2c']> {
    return this.request(C2S.QotSub, req);
  }
  /**
   * @brief 获取交易帐号列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetAccList.proto协议
   */
  GetAccList(req: proto.Trd_GetAccList.IRequest['c2s']): Promise<proto.Trd_GetAccList.IResponse['s2c']> {
    return this.request(C2S.TrdGetAccList, req);
  }
  /**
   * @brief 解锁，针对OpenD解锁一次即可
   * @param [in] stReq 请求包，具体字段请参考Trd_UnlockTrade.proto协议
   */
  UnlockTrade(req) {
    return this.request(C2S.TrdUnlockTrade, req);
  }
  /**
   * @brief 订阅接收推送数据的交易账户
   * @param [in] stReq 请求包，具体字段请参考Trd_SubAccPush.proto协议
   */
  SubAccPush(req) {
    return this.request(C2S.TrdSubAccPush, req);
  }
  /**
   * @brief 获取账户资金
   * @param [in] stReq 请求包，具体字段请参考Trd_GetFunds.proto协议
   */
  GetFunds(req) {
    return this.request(C2S.TrdGetFunds, req);
  }
  /**
   * @brief 获取账户持仓
   * @param [in] stReq 请求包，具体字段请参考Trd_GetPositionList.proto协议
   */
  GetPositionList(req) {
    return this.request(C2S.TrdGetPositionList, req);
  }
  /**
   * @brief 获取最大交易数量
   * @param [in] stReq 请求包，具体字段请参考Trd_GetMaxTrdQtys.proto协议
   */
  GetMaxTrdQtys(req) {
    return this.request(C2S.TrdGetMaxTrdQtys, req);
  }
  /**
   * @brief 获取当日订单列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderList.proto协议
   */
  GetOrderList(req) {
    return this.request(C2S.TrdGetOrderList, req);
  }
  /**
   * @brief 下单
   * @param [in] stReq 请求包，具体字段请参考Trd_PlaceOrder.proto协议，PacketID不需填写，发送时接口会填
   */
  PlaceOrder(req) {
    return this.request(C2S.TrdPlaceOrder, req);
  }
  /**
   * @brief 修改订单
   * @param [in] stReq 请求包，具体字段请参考Trd_ModifyOrder.proto协议，PacketID不需填写，发送时接口会填
   */
  ModifyOrder(req) {
    return this.request(C2S.TrdModifyOrder, req);
  }
  /**
   * @brief 获取当日成交列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderFillList.proto协议
   */
  GetOrderFillList(req) {
    return this.request(C2S.TrdGetOrderFillList, req);
  }
  /**
   * @brief 获取历史订单列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetHistoryOrderList.proto协议
   */
  GetHistoryOrderList(
    req: proto.Trd_GetHistoryOrderList.IRequest['c2s']
  ): Promise<proto.Trd_GetHistoryOrderList.IResponse['s2c']> {
    return this.request(C2S.TrdGetHistoryOrderList, req);
  }
  /**
   * @brief 获取历史成交列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetHistoryOrderFillList.proto协议
   */
  GetHistoryOrderFillList(
    req: proto.Trd_GetHistoryOrderFillList.IRequest['c2s']
  ): Promise<proto.Trd_GetHistoryOrderFillList.IResponse['s2c']> {
    return this.request(C2S.TrdGetHistoryOrderFillList, req);
  }
  /**
   * @brief 获取融资融券数据
   * @param [in] stReq 请求包，具体字段请参考Trd_GetMarginRatio.proto协议
   */
  GetMarginRatio(req) {
    return this.request(C2S.TrdGetMarginRatio, req);
  }

  /**
   * @brief 获取订单收费明细数据
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderFee.proto协议
   */
  GetOrderFee(req: proto.Trd_GetOrderFee.IRequest['c2s']): Promise<proto.Trd_GetOrderFee.IResponse['s2c']> {
    return this.request(C2S.TrdGetOrderFee, req);
  }

  /**
   * @brief 请求全局状态
   * @praram 具体字段请参考GetGlobalState.proto协议
   */
  GetGlobalState(req) {
    return this.request(C2S.GetGlobalState, req);
  }
  /**
   * @brief 注册推送
   * @param 具体字段请参考Qot_RegQotPush.proto协议
   */
  RegQotPush(req) {
    return this.request(C2S.QotRegQotPush, req);
  }
  /**
   * @brief 获取订阅信息
   * @praram 具体字段请参考Qot_GetSubInfo.proto协议
   */
  GetSubInfo(req) {
    return this.request(C2S.QotGetSubInfo, req);
  }
  /**
   * @brief 获取逐笔
   * @praram 具体字段请参考Qot_GetTicker.proto协议
   */
  GetTicker(req) {
    return this.request(C2S.QotGetTicker, req);
  }
  /**
   * @brief 获取报价
   * @praram 具体字段请参考Qot_GetBasicQot.proto协议
   */
  GetBasicQot(req) {
    return this.request(C2S.QotGetBasicQot, req);
  }
  /**
   * @brief 获取摆盘
   * @praram 具体字段请参考Qot_GetOrderBook.proto协议
   */
  GetOrderBook(req) {
    return this.request(C2S.QotGetOrderBook, req);
  }
  /**
   * @brief 获取K线
   * @praram 具体字段请参考Qot_GetKL.proto协议
   */
  GetKL(req) {
    return this.request(C2S.QotGetKL, req);
  }
  /**
   * @brief 获取分时
   * @praram 具体字段请参考Qot_GetRT.proto协议
   */
  GetRT(req) {
    return this.request(C2S.QotGetRT, req);
  }
  /**
   * @brief 获取经纪队列
   * @praram 具体字段请参考Qot_GetBroker.proto协议
   */
  GetBroker(req) {
    return this.request(C2S.QotGetBroker, req);
  }
  /**
   * @brief 在线请求历史复权信息，不读本地历史数据DB
   * @praram 具体字段请参考Qot_RequestRehab.proto协议
   */
  RequestRehab(req) {
    return this.request(C2S.QotRequestRehab, req);
  }
  /**
   * @brief 在线请求历史K线，不读本地历史数据DB
   * @praram 具体字段请参考Qot_RequestHistoryKL.proto协议
   */
  RequestHistoryKL(req) {
    return this.request(C2S.QotRequestHistoryKL, req);
  }
  /**
   * @brief 获取历史K线已经用掉的额度
   * @praram 具体字段请参考Qot_RequestHistoryKLQuota.proto协议
   */
  RequestHistoryKLQuota(req) {
    return this.request(C2S.QotRequestHistoryKLQuota, req);
  }
  /**
   * @brief 获取静态信息
   * @praram 具体字段请参考Qot_GetStaticInfo.proto协议
   */
  GetStaticInfo(req) {
    return this.request(C2S.QotGetStaticInfo, req);
  }
  /**
   * @brief 获取股票快照
   * @praram 具体字段请参考Qot_GetSecuritySnapshot.proto协议
   */
  GetSecuritySnapshot(req) {
    return this.request(C2S.QotGetSecuritySnapshot, req);
  }
  /**
   * @brief 获取板块集合下的板块
   * @praram 具体字段请参考Qot_GetPlateSet.proto协议
   */
  GetPlateSet(req) {
    return this.request(C2S.QotGetPlateSet, req);
  }
  /**
   * @brief 获取板块下的股票
   * @praram 具体字段请参考Qot_GetPlateSecurity.proto协议
   */
  GetPlateSecurity(req) {
    return this.request(C2S.QotGetPlateSecurity, req);
  }
  /**
   * @brief 获取相关股票
   * @praram 具体字段请参考Qot_GetReference.proto协议
   */
  GetReference(req) {
    return this.request(C2S.QotGetReference, req);
  }
  /**
   * @brief 获取股票所属的板块
   * @praram 具体字段请参考Qot_GetOwnerPlate.proto协议
   */
  GetOwnerPlate(req) {
    return this.request(C2S.QotGetOwnerPlate, req);
  }
  /**
   * @brief 获取大股东持股变化列表
   * @praram 具体字段请参考Qot_GetHoldingChangeList.proto协议
   */
  GetHoldingChangeList(req) {
    return this.request(C2S.QotGetHoldingChangeList, req);
  }
  /**
   * @brief 筛选期权
   * @praram 具体字段请参考Qot_GetOptionChain.proto协议
   */
  GetOptionChain(req) {
    return this.request(C2S.QotGetOptionChain, req);
  }
  /**
   * @brief 筛选窝轮
   * @praram 具体字段请参考Qot_GetWarrant.proto协议
   */
  GetWarrant(req) {
    return this.request(C2S.QotGetWarrant, req);
  }
  /**
   * @brief 获取资金流向
   * @praram 具体字段请参考Qot_GetCapitalFlow.proto协议
   */
  GetCapitalFlow(req) {
    return this.request(C2S.QotGetCapitalFlow, req);
  }
  /**
   * @brief 获取资金分布
   * @praram 具体字段请参考Qot_GetCapitalDistribution.proto协议
   */
  GetCapitalDistribution(req) {
    return this.request(C2S.QotGetCapitalDistribution, req);
  }
  /**
   * @brief 获取自选股分组下的股票
   * @praram 具体字段请参考Qot_GetUserSecurity.proto协议
   */
  GetUserSecurity(req) {
    return this.request(C2S.QotGetUserSecurity, req);
  }
  /**
   * @brief 修改自选股分组下的股票
   * @praram 具体字段请参考Qot_ModifyUserSecurity.proto协议
   */
  ModifyUserSecurity(req) {
    return this.request(C2S.QotModifyUserSecurity, req);
  }
  /**
   * @brief 条件选股
   * @praram 具体字段请参考Qot_StockFilter.proto协议
   */
  StockFilter(req) {
    return this.request(C2S.QotStockFilter, req);
  }
  /**
   * @brief 获取股票代码变化信息
   * @praram 具体字段请参考Qot_GetCodeChange.proto协议
   */
  GetCodeChange(req) {
    return this.request(C2S.QotGetCodeChange, req);
  }
  /**
   * @brief 新股IPO
   * @praram 具体字段请参考Qot_GetIpoList.proto协议
   */
  GetIpoList(req) {
    return this.request(C2S.QotGetIpoList, req);
  }
  /**
   * @brief 期货合约资料
   * @praram 具体字段请参考Qot_GetFutureInfo.proto协议
   */
  GetFutureInfo(req) {
    return this.request(C2S.QotGetFutureInfo, req);
  }
  /**
   * @brief 获取市场交易日
   * @praram 具体字段请参考QotRequestTradeDate.proto协议
   */
  RequestTradeDate(req) {
    return this.request(C2S.QotRequestTradeDate, req);
  }
  /**
   * @brief 设置到价提醒
   * @praram 具体字段请参考QotSetPriceReminder.proto协议
   */
  SetPriceReminder(req) {
    return this.request(C2S.QotSetPriceReminder, req);
  }
  /**
   * @brief 获取到价提醒
   * @praram 具体字段请参考QotGetPriceReminder.proto协议
   */
  GetPriceReminder(req) {
    return this.request(C2S.QotGetPriceReminder, req);
  }
  /**
   * @brief 获取自选股分组列表
   * @praram 具体字段请参考QotGetUserSecurityGroup.proto协议
   */
  GetUserSecurityGroup(req) {
    return this.request(C2S.QotGetUserSecurityGroup, req);
  }
  /**
   * @brief 获取股票对应市场状态
   * @praram 具体字段请参考QotGetMarketState.proto协议
   */
  GetMarketState(req) {
    return this.request(C2S.QotGetMarketState, req);
  }
  /**
   * @brief 获取期权链到期日
   * @praram 具体字段请参考QotGetOptionExpirationDate.proto协议
   */
  GetOptionExpirationDate(req) {
    return this.request(C2S.QotGetOptionExpirationDate, req);
  }
}
