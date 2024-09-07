import * as proto from 'futu-sdk/proto';
import { generator } from '../utils';
import REQ from './req';

export type Message = { protobuf: Uint8Array; errorCode: number; errorMessage: string };

export type RequestFn = (cmd: number, buf: Uint8Array, callback: (message: Message) => void) => () => void;

const decodeMessage = ({ protobuf, errorCode, errorMessage }: Message, decode: (protobuf: Uint8Array) => any) => {
  if (errorCode) {
    throw new Error(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
  }
  const { s2c, retMsg, retType } = decode(protobuf);
  if (retType) {
    throw new Error(`retType: ${retType}, retMsg: ${retMsg}`);
  }
  return s2c;
};

export class WebRequest {
  private request: (cnd: (typeof REQ)[keyof typeof REQ], req: any, timeout?: number) => Promise<any>;
  private subscribe: (cnd: (typeof REQ)[keyof typeof REQ], req: any) => Generator<Promise<any>>;

  constructor(requestFn: Promise<RequestFn>) {
    this.request = ({ name, cmd, description }, req, timeout = 5000) => {
      return new Promise<any>(async (resolve, reject) => {
        const buf = name.Request.encode(name.Request.create(req) as any).finish();

        const unsubscribe = (await requestFn)(cmd, buf, message => {
          try {
            resolve(decodeMessage(message, name.Response.decode));
          } catch ({ message }: any) {
            reject(new Error(`${description}, ${message}`));
          } finally {
            clearTimeout(id);
            unsubscribe();
          }
        });

        const id = setTimeout(() => {
          reject(new Error(`${description} timeout`));
          unsubscribe();
        }, timeout);
      });
    };

    this.subscribe = ({ name, cmd, description }, req) => {
      return generator<any>(async (resolve, reject) => {
        const buf = name.Request.encode(name.Request.create(req) as any).finish();
        return (await requestFn)(cmd, buf, message => {
          try {
            resolve(decodeMessage(message, name.Response.decode));
          } catch ({ message }: any) {
            reject(new Error(`${description}, ${message}`));
          }
        });
      });
    };
  }
  /**
   * @brief 初始化连接
   * @param [in] stReq 请求包，具体字段请参考InitWebSocket.proto协议
   */
  InitWebSocket = (
    c2s: proto.InitWebSocket.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.InitWebSocket.IResponse['s2c']> => {
    return this.request(REQ.InitWebSocket, { c2s }, timeout);
  };
  /**
   * @brief 订阅，反订阅
   * @param [in] stReq 请求包，具体字段请参考Qot_Sub.proto协议
   */
  Sub = (c2s: proto.Qot_Sub.IRequest['c2s']): Generator<Promise<proto.Qot_Sub.IResponse['s2c']>> => {
    return this.subscribe(REQ.QotSub, { c2s });
  };
  /**
   * @brief 获取交易帐号列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetAccList.proto协议
   */
  GetAccList = (
    c2s: proto.Trd_GetAccList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetAccList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetAccList, { c2s }, timeout);
  };
  /**
   * @brief 解锁，针对OpenD解锁一次即可
   * @param [in] stReq 请求包，具体字段请参考Trd_UnlockTrade.proto协议
   */
  UnlockTrade = (
    c2s: proto.Trd_UnlockTrade.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_UnlockTrade.IResponse['s2c']> => {
    return this.request(REQ.TrdUnlockTrade, { c2s }, timeout);
  };
  /**
   * @brief 订阅接收推送数据的交易账户
   * @param [in] stReq 请求包，具体字段请参考Trd_SubAccPush.proto协议
   */
  SubAccPush = (
    c2s: proto.Trd_SubAccPush.IRequest['c2s'],
  ): Generator<Promise<proto.Trd_SubAccPush.IResponse['s2c']>> => {
    return this.subscribe(REQ.TrdSubAccPush, { c2s });
  };
  /**
   * @brief 获取账户资金
   * @param [in] stReq 请求包，具体字段请参考Trd_GetFunds.proto协议
   */
  GetFunds = (
    c2s: proto.Trd_GetFunds.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetFunds.IResponse['s2c']> => {
    return this.request(REQ.TrdGetFunds, { c2s }, timeout);
  };
  /**
   * @brief 获取账户持仓
   * @param [in] stReq 请求包，具体字段请参考Trd_GetPositionList.proto协议
   */
  GetPositionList = (
    c2s: proto.Trd_GetPositionList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetPositionList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetPositionList, { c2s }, timeout);
  };
  /**
   * @brief 获取最大交易数量
   * @param [in] stReq 请求包，具体字段请参考Trd_GetMaxTrdQtys.proto协议
   */
  GetMaxTrdQtys = (
    c2s: proto.Trd_GetMaxTrdQtys.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetMaxTrdQtys.IResponse['s2c']> => {
    return this.request(REQ.TrdGetMaxTrdQtys, { c2s }, timeout);
  };
  /**
   * @brief 获取当日订单列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderList.proto协议
   */
  GetOrderList = (
    c2s: proto.Trd_GetOrderList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetOrderList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetOrderList, { c2s }, timeout);
  };
  /**
   * @brief 下单
   * @param [in] stReq 请求包，具体字段请参考Trd_PlaceOrder.proto协议，PacketID不需填写，发送时接口会填
   */
  PlaceOrder = (
    c2s: proto.Trd_PlaceOrder.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_PlaceOrder.IResponse['s2c']> => {
    return this.request(REQ.TrdPlaceOrder, { c2s }, timeout);
  };
  /**
   * @brief 修改订单
   * @param [in] stReq 请求包，具体字段请参考Trd_ModifyOrder.proto协议，PacketID不需填写，发送时接口会填
   */
  ModifyOrder = (
    c2s: proto.Trd_ModifyOrder.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_ModifyOrder.IResponse['s2c']> => {
    return this.request(REQ.TrdModifyOrder, { c2s }, timeout);
  };
  /**
   * @brief 获取当日成交列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderFillList.proto协议
   */
  GetOrderFillList = (
    c2s: proto.Trd_GetOrderFillList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetOrderFillList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetOrderFillList, { c2s }, timeout);
  };
  /**
   * @brief 获取历史订单列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetHistoryOrderList.proto协议
   */
  GetHistoryOrderList = (
    c2s: proto.Trd_GetHistoryOrderList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetHistoryOrderList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetHistoryOrderList, { c2s }, timeout);
  };
  /**
   * @brief 获取历史成交列表
   * @param [in] stReq 请求包，具体字段请参考Trd_GetHistoryOrderFillList.proto协议
   */
  GetHistoryOrderFillList = (
    c2s: proto.Trd_GetHistoryOrderFillList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetHistoryOrderFillList.IResponse['s2c']> => {
    return this.request(REQ.TrdGetHistoryOrderFillList, { c2s }, timeout);
  };
  /**
   * @brief 获取融资融券数据
   * @param [in] stReq 请求包，具体字段请参考Trd_GetMarginRatio.proto协议
   */
  GetMarginRatio = (
    c2s: proto.Trd_GetMarginRatio.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetMarginRatio.IResponse['s2c']> => {
    return this.request(REQ.TrdGetMarginRatio, { c2s }, timeout);
  };

  /**
   * @brief 获取订单收费明细数据
   * @param [in] stReq 请求包，具体字段请参考Trd_GetOrderFee.proto协议
   */
  GetOrderFee = (
    c2s: proto.Trd_GetOrderFee.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Trd_GetOrderFee.IResponse['s2c']> => {
    return this.request(REQ.TrdGetOrderFee, { c2s }, timeout);
  };

  /**
   * @brief 请求全局状态
   * @praram 具体字段请参考GetGlobalState.proto协议
   */
  GetGlobalState = (
    c2s: proto.GetGlobalState.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.GetGlobalState.IResponse['s2c']> => {
    return this.request(REQ.GetGlobalState, { c2s }, timeout);
  };
  /**
   * @brief 注册推送
   * @param 具体字段请参考Qot_RegQotPush.proto协议
   */
  RegQotPush = (
    c2s: proto.Qot_RegQotPush.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_RegQotPush.IResponse['s2c']> => {
    return this.request(REQ.QotRegQotPush, { c2s }, timeout);
  };
  /**
   * @brief 获取订阅信息
   * @praram 具体字段请参考Qot_GetSubInfo.proto协议
   */
  GetSubInfo = (
    c2s: proto.GetUserInfo.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetSubInfo.IResponse['s2c']> => {
    return this.request(REQ.QotGetSubInfo, { c2s }, timeout);
  };
  /**
   * @brief 获取逐笔
   * @praram 具体字段请参考Qot_GetTicker.proto协议
   */
  GetTicker = (
    c2s: proto.Qot_GetTicker.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetTicker.IResponse['s2c']> => {
    return this.request(REQ.QotGetTicker, { c2s }, timeout);
  };
  /**
   * @brief 获取报价
   * @praram 具体字段请参考Qot_GetBasicQot.proto协议
   */
  GetBasicQot = (
    c2s: proto.Qot_GetBasicQot.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetBasicQot.IResponse['s2c']> => {
    return this.request(REQ.QotGetBasicQot, { c2s }, timeout);
  };
  /**
   * @brief 获取摆盘
   * @praram 具体字段请参考Qot_GetOrderBook.proto协议
   */
  GetOrderBook = (
    c2s: proto.Qot_GetOrderBook.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetOrderBook.IResponse['s2c']> => {
    return this.request(REQ.QotGetOrderBook, { c2s }, timeout);
  };
  /**
   * @brief 获取K线
   * @praram 具体字段请参考Qot_GetKL.proto协议
   */
  GetKL = (c2s: proto.Qot_GetKL.IRequest['c2s'], timeout = 5000): Promise<proto.Qot_GetKL.IResponse['s2c']> => {
    return this.request(REQ.QotGetKL, { c2s }, timeout);
  };
  /**
   * @brief 获取分时
   * @praram 具体字段请参考Qot_GetRT.proto协议
   */
  GetRT = (c2s: proto.Qot_GetRT.IRequest['c2s'], timeout = 5000): Promise<proto.Qot_GetRT.IResponse['s2c']> => {
    return this.request(REQ.QotGetRT, { c2s }, timeout);
  };
  /**
   * @brief 获取经纪队列
   * @praram 具体字段请参考Qot_GetBroker.proto协议
   */
  GetBroker = (
    c2s: proto.Qot_GetBroker.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetBroker.IResponse['s2c']> => {
    return this.request(REQ.QotGetBroker, { c2s }, timeout);
  };
  /**
   * @brief 在线请求历史复权信息，不读本地历史数据DB
   * @praram 具体字段请参考Qot_RequestRehab.proto协议
   */
  RequestRehab = (
    c2s: proto.Qot_RequestRehab.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_RequestRehab.IResponse['s2c']> => {
    return this.request(REQ.QotRequestRehab, { c2s }, timeout);
  };
  /**
   * @brief 在线请求历史K线，不读本地历史数据DB
   * @praram 具体字段请参考Qot_RequestHistoryKL.proto协议
   */
  RequestHistoryKL = (
    c2s: proto.Qot_RequestHistoryKL.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_RequestHistoryKL.IResponse['s2c']> => {
    return this.request(REQ.QotRequestHistoryKL, { c2s }, timeout);
  };
  /**
   * @brief 获取历史K线已经用掉的额度
   * @praram 具体字段请参考Qot_RequestHistoryKLQuota.proto协议
   */
  RequestHistoryKLQuota = (
    c2s: proto.Qot_RequestHistoryKLQuota.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_RequestHistoryKLQuota.IResponse['s2c']> => {
    return this.request(REQ.QotRequestHistoryKLQuota, { c2s }, timeout);
  };
  /**
   * @brief 获取静态信息
   * @praram 具体字段请参考Qot_GetStaticInfo.proto协议
   */
  GetStaticInfo = (
    c2s: proto.Qot_GetStaticInfo.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetStaticInfo.IResponse['s2c']> => {
    return this.request(REQ.QotGetStaticInfo, { c2s }, timeout);
  };
  /**
   * @brief 获取股票快照
   * @praram 具体字段请参考Qot_GetSecuritySnapshot.proto协议
   */
  GetSecuritySnapshot = (
    c2s: proto.Qot_GetSecuritySnapshot.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetSecuritySnapshot.IResponse['s2c']> => {
    return this.request(REQ.QotGetSecuritySnapshot, { c2s }, timeout);
  };
  /**
   * @brief 获取板块集合下的板块
   * @praram 具体字段请参考Qot_GetPlateSet.proto协议
   */
  GetPlateSet = (
    c2s: proto.Qot_GetPlateSet.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetPlateSet.IResponse['s2c']> => {
    return this.request(REQ.QotGetPlateSet, { c2s }, timeout);
  };
  /**
   * @brief 获取板块下的股票
   * @praram 具体字段请参考Qot_GetPlateSecurity.proto协议
   */
  GetPlateSecurity = (
    c2s: proto.Qot_GetPlateSecurity.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetPlateSecurity.IResponse['s2c']> => {
    return this.request(REQ.QotGetPlateSecurity, { c2s }, timeout);
  };
  /**
   * @brief 获取相关股票
   * @praram 具体字段请参考Qot_GetReference.proto协议
   */
  GetReference = (
    c2s: proto.Qot_GetReference.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetReference.IResponse['s2c']> => {
    return this.request(REQ.QotGetReference, { c2s }, timeout);
  };
  /**
   * @brief 获取股票所属的板块
   * @praram 具体字段请参考Qot_GetOwnerPlate.proto协议
   */
  GetOwnerPlate = (
    c2s: proto.Qot_GetOwnerPlate.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetOwnerPlate.IResponse['s2c']> => {
    return this.request(REQ.QotGetOwnerPlate, { c2s }, timeout);
  };
  /**
   * @brief 获取大股东持股变化列表
   * @praram 具体字段请参考Qot_GetHoldingChangeList.proto协议
   */
  GetHoldingChangeList = (
    c2s: proto.Qot_GetHoldingChangeList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetHoldingChangeList.IResponse['s2c']> => {
    return this.request(REQ.QotGetHoldingChangeList, { c2s }, timeout);
  };
  /**
   * @brief 筛选期权
   * @praram 具体字段请参考Qot_GetOptionChain.proto协议
   */
  GetOptionChain = (
    c2s: proto.Qot_GetOptionChain.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetOptionChain.IResponse['s2c']> => {
    return this.request(REQ.QotGetOptionChain, { c2s }, timeout);
  };
  /**
   * @brief 筛选窝轮
   * @praram 具体字段请参考Qot_GetWarrant.proto协议
   */
  GetWarrant = (
    c2s: proto.Qot_GetWarrant.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetWarrant.IResponse['s2c']> => {
    return this.request(REQ.QotGetWarrant, { c2s }, timeout);
  };
  /**
   * @brief 获取资金流向
   * @praram 具体字段请参考Qot_GetCapitalFlow.proto协议
   */
  GetCapitalFlow = (
    c2s: proto.Qot_GetCapitalFlow.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetCapitalFlow.IResponse['s2c']> => {
    return this.request(REQ.QotGetCapitalFlow, { c2s }, timeout);
  };
  /**
   * @brief 获取资金分布
   * @praram 具体字段请参考Qot_GetCapitalDistribution.proto协议
   */
  GetCapitalDistribution = (
    c2s: proto.Qot_GetCapitalDistribution.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetCapitalDistribution.IResponse['s2c']> => {
    return this.request(REQ.QotGetCapitalDistribution, { c2s }, timeout);
  };
  /**
   * @brief 获取自选股分组下的股票
   * @praram 具体字段请参考Qot_GetUserSecurity.proto协议
   */
  GetUserSecurity = (
    c2s: proto.Qot_GetUserSecurity.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetUserSecurity.IResponse['s2c']> => {
    return this.request(REQ.QotGetUserSecurity, { c2s }, timeout);
  };
  /**
   * @brief 修改自选股分组下的股票
   * @praram 具体字段请参考Qot_ModifyUserSecurity.proto协议
   */
  ModifyUserSecurity = (
    c2s: proto.Qot_ModifyUserSecurity.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_ModifyUserSecurity.IResponse['s2c']> => {
    return this.request(REQ.QotModifyUserSecurity, { c2s }, timeout);
  };
  /**
   * @brief 条件选股
   * @praram 具体字段请参考Qot_StockFilter.proto协议
   */
  StockFilter = (
    c2s: proto.Qot_StockFilter.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_StockFilter.IResponse['s2c']> => {
    return this.request(REQ.QotStockFilter, { c2s }, timeout);
  };
  /**
   * @brief 获取股票代码变化信息
   * @praram 具体字段请参考Qot_GetCodeChange.proto协议
   */
  GetCodeChange = (
    c2s: proto.Qot_GetCodeChange.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetCodeChange.IResponse['s2c']> => {
    return this.request(REQ.QotGetCodeChange, { c2s }, timeout);
  };
  /**
   * @brief 新股IPO
   * @praram 具体字段请参考Qot_GetIpoList.proto协议
   */
  GetIpoList = (
    c2s: proto.Qot_GetIpoList.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetIpoList.IResponse['s2c']> => {
    return this.request(REQ.QotGetIpoList, { c2s }, timeout);
  };
  /**
   * @brief 期货合约资料
   * @praram 具体字段请参考Qot_GetFutureInfo.proto协议
   */
  GetFutureInfo = (
    c2s: proto.Qot_GetFutureInfo.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetFutureInfo.IResponse['s2c']> => {
    return this.request(REQ.QotGetFutureInfo, { c2s }, timeout);
  };
  /**
   * @brief 获取市场交易日
   * @praram 具体字段请参考QotRequestTradeDate.proto协议
   */
  RequestTradeDate = (
    c2s: proto.Qot_RequestTradeDate.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_RequestTradeDate.IResponse['s2c']> => {
    return this.request(REQ.QotRequestTradeDate, { c2s }, timeout);
  };
  /**
   * @brief 设置到价提醒
   * @praram 具体字段请参考QotSetPriceReminder.proto协议
   */
  SetPriceReminder = (
    c2s: proto.Qot_SetPriceReminder.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_SetPriceReminder.IResponse['s2c']> => {
    return this.request(REQ.QotSetPriceReminder, { c2s }, timeout);
  };
  /**
   * @brief 获取到价提醒
   * @praram 具体字段请参考QotGetPriceReminder.proto协议
   */
  GetPriceReminder = (
    c2s: proto.Qot_GetPriceReminder.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetPriceReminder.IResponse['s2c']> => {
    return this.request(REQ.QotGetPriceReminder, { c2s }, timeout);
  };
  /**
   * @brief 获取自选股分组列表
   * @praram 具体字段请参考QotGetUserSecurityGroup.proto协议
   */
  GetUserSecurityGroup = (
    c2s: proto.Qot_GetUserSecurityGroup.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetUserSecurityGroup.IResponse['s2c']> => {
    return this.request(REQ.QotGetUserSecurityGroup, { c2s }, timeout);
  };
  /**
   * @brief 获取股票对应市场状态
   * @praram 具体字段请参考QotGetMarketState.proto协议
   */
  GetMarketState = (
    c2s: proto.Qot_GetMarketState.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetMarketState.IResponse['s2c']> => {
    return this.request(REQ.QotGetMarketState, { c2s }, timeout);
  };
  /**
   * @brief 获取期权链到期日
   * @praram 具体字段请参考QotGetOptionExpirationDate.proto协议
   */
  GetOptionExpirationDate = (
    c2s: proto.Qot_GetOptionExpirationDate.IRequest['c2s'],
    timeout = 5000,
  ): Promise<proto.Qot_GetOptionExpirationDate.IResponse['s2c']> => {
    return this.request(REQ.QotGetOptionExpirationDate, { c2s }, timeout);
  };
}
