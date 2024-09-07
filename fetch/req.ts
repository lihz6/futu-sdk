import * as proto from 'futu-sdk/proto';

export default {
  // 全局协议
  /**< 初始化连接 */
  InitWebSocket: {
    cmd: 1,
    name: proto.InitWebSocket,
    description: '初始化连接',
  },
  /**< 获取全局状态 */
  GetGlobalState: {
    cmd: 1002,
    name: proto.GetGlobalState,
    description: '获取全局状态',
  },
  /**< 心跳 */
  KeepAlive: {
    cmd: 1004,
    name: proto.KeepAlive,
    description: '心跳',
  },
  /**< 获取用户信息 */
  GetUserInfo: {
    cmd: 1005,
    name: proto.GetUserInfo,
    description: '获取用户信息',
  },
  /**< 获取延迟统计 */
  GetDelayStatistics: {
    cmd: 1007,
    name: proto.GetDelayStatistics,
    description: '获取延迟统计',
  },
  // 行情-实时数据协议
  /**< 订阅或者反订阅 */
  QotSub: {
    cmd: 3001,
    name: proto.Qot_Sub,
    description: '订阅或者反订阅',
  },
  /**< 注册推送 */
  QotRegQotPush: {
    cmd: 3002,
    name: proto.Qot_RegQotPush,
    description: '注册推送',
  },
  /**< 获取订阅信息 */
  QotGetSubInfo: {
    cmd: 3003,
    name: proto.Qot_GetSubInfo,
    description: '获取订阅信息',
  },
  /**< 获取基本行情 */
  QotGetBasicQot: {
    cmd: 3004,
    name: proto.Qot_GetBasicQot,
    description: '获取基本行情',
  },
  /**< 获取K线 */
  QotGetKL: {
    cmd: 3006,
    name: proto.Qot_GetKL,
    description: '获取K线',
  },
  /**< 获取分时 */
  QotGetRT: {
    cmd: 3008,
    name: proto.Qot_GetRT,
    description: '获取分时',
  },
  /**< 获取逐笔 */
  QotGetTicker: {
    cmd: 3010,
    name: proto.Qot_GetTicker,
    description: '获取逐笔',
  },
  /**< 获取买卖盘 */
  QotGetOrderBook: {
    cmd: 3012,
    name: proto.Qot_GetOrderBook,
    description: '获取买卖盘',
  },
  /**< 获取经纪队列 */
  QotGetBroker: {
    cmd: 3014,
    name: proto.Qot_GetBroker,
    description: '获取经纪队列',
  },

  //	行情-历史数据协议
  QotGetHistoryKL: {
    cmd: 3100,
    name: proto.Qot_GetHistoryKL,
    description: '获取历史K线',
  } /**< 获取历史K线 */,
  QotGetHistoryKLPoints: {
    cmd: 3101,
    name: proto.Qot_GetHistoryKLPoints,
    description: '获取多只股票历史单点K线',
  } /**< 获取多只股票历史单点K线 */,
  QotGetRehab: {
    cmd: 3102,
    name: proto.Qot_GetRehab,
    description: '获取复权信息',
  } /**< 获取复权信息 */,
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
  QotGetSuspend: {
    cmd: 3201,
    name: proto.Qot_GetSuspend,
    description: '获取股票停牌信息',
  } /**< 获取股票停牌信息 */,
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
  QotGetOptionChain: {
    cmd: 3209,
    name: proto.Qot_GetOptionChain,
    description: '获取期权链',
  } /**< 获取期权链 */,
  QotGetWarrant: {
    cmd: 3210,
    name: proto.Qot_GetWarrant,
    description: '获取涡轮',
  } /**< 获取涡轮 */,
  QotGetCapitalFlow: {
    cmd: 3211,
    name: proto.Qot_GetCapitalFlow,
    description: '获取资金流向',
  } /**< 获取资金流向 */,
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
  QotStockFilter: {
    cmd: 3215,
    name: proto.Qot_StockFilter,
    description: '条件选股',
  } /**< 条件选股 */,
  QotGetCodeChange: {
    cmd: 3216,
    name: proto.Qot_GetCodeChange,
    description: '获取股票代码变化信息',
  } /**< 获取股票代码变化信息*/,
  QotGetIpoList: {
    cmd: 3217,
    name: proto.Qot_GetIpoList,
    description: '获取新股IPO',
  } /**< 获取新股IPO */,
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
  TrdGetAccList: {
    cmd: 2001,
    name: proto.Trd_GetAccList,
    description: '获取交易账户列表',
  } /**< 获取交易账户列表 */,
  TrdUnlockTrade: {
    cmd: 2005,
    name: proto.Trd_UnlockTrade,
    description: '解锁或锁定交易',
  } /**< 解锁或锁定交易 */,
  TrdSubAccPush: {
    cmd: 2008,
    name: proto.Trd_SubAccPush,
    description: '订阅接收推送数据的交易账户',
  } /**< 订阅接收推送数据的交易账户 */,
  TrdGetFunds: {
    cmd: 2101,
    name: proto.Trd_GetFunds,
    description: '获取账户资金',
  } /**< 获取账户资金 */,
  TrdGetPositionList: {
    cmd: 2102,
    name: proto.Trd_GetPositionList,
    description: '获取账户持仓',
  } /**< 获取账户持仓 */,
  TrdGetMaxTrdQtys: {
    cmd: 2111,
    name: proto.Trd_GetMaxTrdQtys,
    description: '获取最大交易数量',
  } /**< 获取最大交易数量 */,
  TrdGetOrderList: {
    cmd: 2201,
    name: proto.Trd_GetOrderList,
    description: '获取订单列表',
  } /**< 获取订单列表 */,
  TrdPlaceOrder: {
    cmd: 2202,
    name: proto.Trd_PlaceOrder,
    description: '下单',
  } /**< 下单 */,
  TrdModifyOrder: {
    cmd: 2205,
    name: proto.Trd_ModifyOrder,
    description: '修改订单',
  } /**< 修改订单 */,

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
