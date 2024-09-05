import * as proto from 'futu-sdk/proto';
import REQ from './req';

export class WebRequest {
  private request: ({ cmd, name, description }: (typeof REQ)[keyof typeof REQ], req: any) => Promise<any>;

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
  InitWebSocket = (req: proto.InitWebSocket.IRequest['c2s']): Promise<proto.InitWebSocket.IResponse['s2c']> => {
    return this.request(REQ.InitWebSocket, req);
  };
  /**
   * @brief 订阅，反订阅
   * @param [in] stReq 请求包，具体字段请参考Qot_Sub.proto协议
   */
  Sub = (req: proto.Qot_Sub.IRequest['c2s']): Promise<proto.Qot_Sub.IResponse['s2c']> => {
    return this.request(REQ.QotSub, req);
  };
  /**
   * @brief 获取交易帐号列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetAccList.proto协议
   */
  GetAccList = (req: proto.Trd_GetAccList.IRequest['c2s']): Promise<proto.Trd_GetAccList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetAccList, req);
  };
  /**
   * @brief 解锁，针对OpenD解锁一次即可
   * @param [in] stReq 请求包，具体字段请参考Trd_UnlockTrade.proto协议
   */
  UnlockTrade = (req: proto.Trd_UnlockTrade.IRequest['c2s']): Promise<proto.Trd_UnlockTrade.IResponse['s2c']> => {
    return this.request(REQ.TrdUnlockTrade, req);
  };
  /**
   * @brief 订阅接收推送数据的交易账户
   * @param [in] stReq 请求包，具体字段请参考Trd_SubAccPush.proto协议
   */
  SubAccPush = (req: proto.Trd_SubAccPush.IRequest['c2s']): Promise<proto.Trd_SubAccPush.IResponse['s2c']> => {
    return this.request(REQ.TrdSubAccPush, req);
  };
  /**
   * @brief 获取账户资金
   * @param [in] stReq 请求包，具体字段请参考Trd_GetFunds.proto协议
   */
  GetFunds = (req: proto.Trd_GetFunds.IRequest['c2s']): Promise<proto.Trd_GetFunds.IResponse['s2c']> => {
    return this.request(REQ.TrdGetFunds, req);
  };
  /**
   * @brief 获取账户持仓
   * @param [in] stReq 请求包，具体字段请参考Trd_GetPositionList.proto协议
   */
  GetPositionList = (
    req: proto.Trd_GetPositionList.IRequest['c2s']
  ): Promise<proto.Trd_GetPositionList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetPositionList, req);
  };
  /**
   * @brief 获取最大交易数量
   * @param [in] stReq 请求包，具体字段请参考Trd_GetMaxTrdQtys.proto协议
   */
  GetMaxTrdQtys = (req: proto.Trd_GetMaxTrdQtys.IRequest['c2s']): Promise<proto.Trd_GetMaxTrdQtys.IResponse['s2c']> => {
    return this.request(REQ.TrdGetMaxTrdQtys, req);
  };
  /**
   * @brief 获取当日订单列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderList.proto协议
   */
  GetOrderList = (req: proto.Trd_GetOrderList.IRequest['c2s']): Promise<proto.Trd_GetOrderList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetOrderList, req);
  };
  /**
   * @brief 下单
   * @param [in] stReq 请求包，具体字段请参考Trd_PlaceOrder.proto协议，PacketID不需填写，发送时接口会填
   */
  PlaceOrder = (req: proto.Trd_PlaceOrder.IRequest['c2s']): Promise<proto.Trd_PlaceOrder.IResponse['s2c']> => {
    return this.request(REQ.TrdPlaceOrder, req);
  };
  /**
   * @brief 修改订单
   * @param [in] stReq 请求包，具体字段请参考Trd_ModifyOrder.proto协议，PacketID不需填写，发送时接口会填
   */
  ModifyOrder = (req: proto.Trd_ModifyOrder.IRequest['c2s']): Promise<proto.Trd_ModifyOrder.IResponse['s2c']> => {
    return this.request(REQ.TrdModifyOrder, req);
  };
  /**
   * @brief 获取当日成交列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderFillList.proto协议
   */
  GetOrderFillList = (
    req: proto.Trd_GetOrderFillList.IRequest['c2s']
  ): Promise<proto.Trd_GetOrderFillList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetOrderFillList, req);
  };
  /**
   * @brief 获取历史订单列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetHistoryOrderList.proto协议
   */
  GetHistoryOrderList = (
    req: proto.Trd_GetHistoryOrderList.IRequest['c2s']
  ): Promise<proto.Trd_GetHistoryOrderList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetHistoryOrderList, req);
  };
  /**
   * @brief 获取历史成交列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetHistoryOrderFillList.proto协议
   */
  GetHistoryOrderFillList = (
    req: proto.Trd_GetHistoryOrderFillList.IRequest['c2s']
  ): Promise<proto.Trd_GetHistoryOrderFillList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetHistoryOrderFillList, req);
  };
  /**
   * @brief 获取融资融券数据
   * @param [in] stReq 请求包，具体字段请参考Trd_GetMarginRatio.proto协议
   */
  GetMarginRatio = (
    req: proto.Trd_GetMarginRatio.IRequest['c2s']
  ): Promise<proto.Trd_GetMarginRatio.IResponse['s2c']> => {
    return this.request(REQ.TrdGetMarginRatio, req);
  };

  /**
   * @brief 获取订单收费明细数据
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderFee.proto协议
   */
  GetOrderFee = (req: proto.Trd_GetOrderFee.IRequest['c2s']): Promise<proto.Trd_GetOrderFee.IResponse['s2c']> => {
    return this.request(REQ.TrdGetOrderFee, req);
  };

  /**
   * @brief 请求全局状态
   * @praram 具体字段请参考GetGlobalState.proto协议
   */
  GetGlobalState = (req: proto.GetGlobalState.IRequest['c2s']): Promise<proto.GetGlobalState.IResponse['s2c']> => {
    return this.request(REQ.GetGlobalState, req);
  };
  /**
   * @brief 注册推送
   * @param 具体字段请参考Qot_RegQotPush.proto协议
   */
  RegQotPush = (req: proto.Qot_RegQotPush.IRequest['c2s']): Promise<proto.Qot_RegQotPush.IResponse['s2c']> => {
    return this.request(REQ.QotRegQotPush, req);
  };
  /**
   * @brief 获取订阅信息
   * @praram 具体字段请参考Qot_GetSubInfo.proto协议
   */
  GetSubInfo = (req: proto.GetUserInfo.IRequest['c2s']): Promise<proto.Qot_GetSubInfo.IResponse['s2c']> => {
    return this.request(REQ.QotGetSubInfo, req);
  };
  /**
   * @brief 获取逐笔
   * @praram 具体字段请参考Qot_GetTicker.proto协议
   */
  GetTicker = (req: proto.Qot_GetTicker.IRequest['c2s']): Promise<proto.Qot_GetTicker.IResponse['s2c']> => {
    return this.request(REQ.QotGetTicker, req);
  };
  /**
   * @brief 获取报价
   * @praram 具体字段请参考Qot_GetBasicQot.proto协议
   */
  GetBasicQot = (req: proto.Qot_GetBasicQot.IRequest['c2s']): Promise<proto.Qot_GetBasicQot.IResponse['s2c']> => {
    return this.request(REQ.QotGetBasicQot, req);
  };
  /**
   * @brief 获取摆盘
   * @praram 具体字段请参考Qot_GetOrderBook.proto协议
   */
  GetOrderBook = (req: proto.Qot_GetOrderBook.IRequest['c2s']): Promise<proto.Qot_GetOrderBook.IResponse['s2c']> => {
    return this.request(REQ.QotGetOrderBook, req);
  };
  /**
   * @brief 获取K线
   * @praram 具体字段请参考Qot_GetKL.proto协议
   */
  GetKL = (req: proto.Qot_GetKL.IRequest['c2s']): Promise<proto.Qot_GetKL.IResponse['s2c']> => {
    return this.request(REQ.QotGetKL, req);
  };
  /**
   * @brief 获取分时
   * @praram 具体字段请参考Qot_GetRT.proto协议
   */
  GetRT = (req: proto.Qot_GetRT.IRequest['c2s']): Promise<proto.Qot_GetRT.IResponse['s2c']> => {
    return this.request(REQ.QotGetRT, req);
  };
  /**
   * @brief 获取经纪队列
   * @praram 具体字段请参考Qot_GetBroker.proto协议
   */
  GetBroker = (req: proto.Qot_GetBroker.IRequest['c2s']): Promise<proto.Qot_GetBroker.IResponse['s2c']> => {
    return this.request(REQ.QotGetBroker, req);
  };
  /**
   * @brief 在线请求历史复权信息，不读本地历史数据DB
   * @praram 具体字段请参考Qot_RequestRehab.proto协议
   */
  RequestRehab = (req: proto.Qot_RequestRehab.IRequest['c2s']): Promise<proto.Qot_RequestRehab.IResponse['s2c']> => {
    return this.request(REQ.QotRequestRehab, req);
  };
  /**
   * @brief 在线请求历史K线，不读本地历史数据DB
   * @praram 具体字段请参考Qot_RequestHistoryKL.proto协议
   */
  RequestHistoryKL = (
    req: proto.Qot_RequestHistoryKL.IRequest['c2s']
  ): Promise<proto.Qot_RequestHistoryKL.IResponse['s2c']> => {
    return this.request(REQ.QotRequestHistoryKL, req);
  };
  /**
   * @brief 获取历史K线已经用掉的额度
   * @praram 具体字段请参考Qot_RequestHistoryKLQuota.proto协议
   */
  RequestHistoryKLQuota = (
    req: proto.Qot_RequestHistoryKLQuota.IRequest['c2s']
  ): Promise<proto.Qot_RequestHistoryKLQuota.IResponse['s2c']> => {
    return this.request(REQ.QotRequestHistoryKLQuota, req);
  };
  /**
   * @brief 获取静态信息
   * @praram 具体字段请参考Qot_GetStaticInfo.proto协议
   */
  GetStaticInfo = (req: proto.Qot_GetStaticInfo.IRequest['c2s']): Promise<proto.Qot_GetStaticInfo.IResponse['s2c']> => {
    return this.request(REQ.QotGetStaticInfo, req);
  };
  /**
   * @brief 获取股票快照
   * @praram 具体字段请参考Qot_GetSecuritySnapshot.proto协议
   */
  GetSecuritySnapshot = (
    req: proto.Qot_GetSecuritySnapshot.IRequest['c2s']
  ): Promise<proto.Qot_GetSecuritySnapshot.IResponse['s2c']> => {
    return this.request(REQ.QotGetSecuritySnapshot, req);
  };
  /**
   * @brief 获取板块集合下的板块
   * @praram 具体字段请参考Qot_GetPlateSet.proto协议
   */
  GetPlateSet = (req: proto.Qot_GetPlateSet.IRequest['c2s']): Promise<proto.Qot_GetPlateSet.IResponse['s2c']> => {
    return this.request(REQ.QotGetPlateSet, req);
  };
  /**
   * @brief 获取板块下的股票
   * @praram 具体字段请参考Qot_GetPlateSecurity.proto协议
   */
  GetPlateSecurity = (
    req: proto.Qot_GetPlateSecurity.IRequest['c2s']
  ): Promise<proto.Qot_GetPlateSecurity.IResponse['s2c']> => {
    return this.request(REQ.QotGetPlateSecurity, req);
  };
  /**
   * @brief 获取相关股票
   * @praram 具体字段请参考Qot_GetReference.proto协议
   */
  GetReference = (req: proto.Qot_GetReference.IRequest['c2s']): Promise<proto.Qot_GetReference.IResponse['s2c']> => {
    return this.request(REQ.QotGetReference, req);
  };
  /**
   * @brief 获取股票所属的板块
   * @praram 具体字段请参考Qot_GetOwnerPlate.proto协议
   */
  GetOwnerPlate = (req: proto.Qot_GetOwnerPlate.IRequest['c2s']): Promise<proto.Qot_GetOwnerPlate.IResponse['s2c']> => {
    return this.request(REQ.QotGetOwnerPlate, req);
  };
  /**
   * @brief 获取大股东持股变化列表
   * @praram 具体字段请参考Qot_GetHoldingChangeList.proto协议
   */
  GetHoldingChangeList = (
    req: proto.Qot_GetHoldingChangeList.IRequest['c2s']
  ): Promise<proto.Qot_GetHoldingChangeList.IResponse['s2c']> => {
    return this.request(REQ.QotGetHoldingChangeList, req);
  };
  /**
   * @brief 筛选期权
   * @praram 具体字段请参考Qot_GetOptionChain.proto协议
   */
  GetOptionChain = (
    req: proto.Qot_GetOptionChain.IRequest['c2s']
  ): Promise<proto.Qot_GetOptionChain.IResponse['s2c']> => {
    return this.request(REQ.QotGetOptionChain, req);
  };
  /**
   * @brief 筛选窝轮
   * @praram 具体字段请参考Qot_GetWarrant.proto协议
   */
  GetWarrant = (req: proto.Qot_GetWarrant.IRequest['c2s']): Promise<proto.Qot_GetWarrant.IResponse['s2c']> => {
    return this.request(REQ.QotGetWarrant, req);
  };
  /**
   * @brief 获取资金流向
   * @praram 具体字段请参考Qot_GetCapitalFlow.proto协议
   */
  GetCapitalFlow = (
    req: proto.Qot_GetCapitalFlow.IRequest['c2s']
  ): Promise<proto.Qot_GetCapitalFlow.IResponse['s2c']> => {
    return this.request(REQ.QotGetCapitalFlow, req);
  };
  /**
   * @brief 获取资金分布
   * @praram 具体字段请参考Qot_GetCapitalDistribution.proto协议
   */
  GetCapitalDistribution = (
    req: proto.Qot_GetCapitalDistribution.IRequest['c2s']
  ): Promise<proto.Qot_GetCapitalDistribution.IResponse['s2c']> => {
    return this.request(REQ.QotGetCapitalDistribution, req);
  };
  /**
   * @brief 获取自选股分组下的股票
   * @praram 具体字段请参考Qot_GetUserSecurity.proto协议
   */
  GetUserSecurity = (
    req: proto.Qot_GetUserSecurity.IRequest['c2s']
  ): Promise<proto.Qot_GetUserSecurity.IResponse['s2c']> => {
    return this.request(REQ.QotGetUserSecurity, req);
  };
  /**
   * @brief 修改自选股分组下的股票
   * @praram 具体字段请参考Qot_ModifyUserSecurity.proto协议
   */
  ModifyUserSecurity = (
    req: proto.Qot_ModifyUserSecurity.IRequest['c2s']
  ): Promise<proto.Qot_ModifyUserSecurity.IResponse['s2c']> => {
    return this.request(REQ.QotModifyUserSecurity, req);
  };
  /**
   * @brief 条件选股
   * @praram 具体字段请参考Qot_StockFilter.proto协议
   */
  StockFilter = (req: proto.Qot_StockFilter.IRequest['c2s']): Promise<proto.Qot_StockFilter.IResponse['s2c']> => {
    return this.request(REQ.QotStockFilter, req);
  };
  /**
   * @brief 获取股票代码变化信息
   * @praram 具体字段请参考Qot_GetCodeChange.proto协议
   */
  GetCodeChange = (req: proto.Qot_GetCodeChange.IRequest['c2s']): Promise<proto.Qot_GetCodeChange.IResponse['s2c']> => {
    return this.request(REQ.QotGetCodeChange, req);
  };
  /**
   * @brief 新股IPO
   * @praram 具体字段请参考Qot_GetIpoList.proto协议
   */
  GetIpoList = (req: proto.Qot_GetIpoList.IRequest['c2s']): Promise<proto.Qot_GetIpoList.IResponse['s2c']> => {
    return this.request(REQ.QotGetIpoList, req);
  };
  /**
   * @brief 期货合约资料
   * @praram 具体字段请参考Qot_GetFutureInfo.proto协议
   */
  GetFutureInfo = (req: proto.Qot_GetFutureInfo.IRequest['c2s']): Promise<proto.Qot_GetFutureInfo.IResponse['s2c']> => {
    return this.request(REQ.QotGetFutureInfo, req);
  };
  /**
   * @brief 获取市场交易日
   * @praram 具体字段请参考QotRequestTradeDate.proto协议
   */
  RequestTradeDate = (
    req: proto.Qot_RequestTradeDate.IRequest['c2s']
  ): Promise<proto.Qot_RequestTradeDate.IResponse['s2c']> => {
    return this.request(REQ.QotRequestTradeDate, req);
  };
  /**
   * @brief 设置到价提醒
   * @praram 具体字段请参考QotSetPriceReminder.proto协议
   */
  SetPriceReminder = (
    req: proto.Qot_SetPriceReminder.IRequest['c2s']
  ): Promise<proto.Qot_SetPriceReminder.IResponse['s2c']> => {
    return this.request(REQ.QotSetPriceReminder, req);
  };
  /**
   * @brief 获取到价提醒
   * @praram 具体字段请参考QotGetPriceReminder.proto协议
   */
  GetPriceReminder = (
    req: proto.Qot_GetPriceReminder.IRequest['c2s']
  ): Promise<proto.Qot_GetPriceReminder.IResponse['s2c']> => {
    return this.request(REQ.QotGetPriceReminder, req);
  };
  /**
   * @brief 获取自选股分组列表
   * @praram 具体字段请参考QotGetUserSecurityGroup.proto协议
   */
  GetUserSecurityGroup = (
    req: proto.Qot_GetUserSecurityGroup.IRequest['c2s']
  ): Promise<proto.Qot_GetUserSecurityGroup.IResponse['s2c']> => {
    return this.request(REQ.QotGetUserSecurityGroup, req);
  };
  /**
   * @brief 获取股票对应市场状态
   * @praram 具体字段请参考QotGetMarketState.proto协议
   */
  GetMarketState = (
    req: proto.Qot_GetMarketState.IRequest['c2s']
  ): Promise<proto.Qot_GetMarketState.IResponse['s2c']> => {
    return this.request(REQ.QotGetMarketState, req);
  };
  /**
   * @brief 获取期权链到期日
   * @praram 具体字段请参考QotGetOptionExpirationDate.proto协议
   */
  GetOptionExpirationDate = (
    req: proto.Qot_GetOptionExpirationDate.IRequest['c2s']
  ): Promise<proto.Qot_GetOptionExpirationDate.IResponse['s2c']> => {
    return this.request(REQ.QotGetOptionExpirationDate, req);
  };
}
