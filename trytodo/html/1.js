QFARE("", "QFARE", "-1", "QFARE"), SELF("", "普通政策", "-1", "SELF"), SPEC("", "特殊政策", "-1", "SPEC"), KCABIN("",
"K位政策", "-1", "KCABIN"), DIFF_POLICY("", "加价政策", "-1", "DIFF_POLICY"), SPEC_BOOKING("", "特殊预定", "-1",
"SPEC_BOOKING"),

MANUAL("", "手工订单", "-1", "MANUAL"), HANDWORK("", "手工订单", "-1", "HANDWORK"), API("", "API订单导入", "-1", "API"),

SPEC_APPLY("", "特殊申请", "-1", "SPEC_APPLY"), PRI_BOOKING("", "私有预定", "-1", "PRI_BOOKING"), SPEC_BAOJI_APPLY("",
"包机政策申请", "-1", "SPEC_BAOJI_APPLY"), SPEC_BAOJI_BOOKING("", "包机政策预订", "-1", "SPEC_BAOJI_BOOKING"),

// 低价产品请在isLowCostPolicy（）方法里面添加 ran.yang
GTT("", "GTT", "-1", "GTT"), TF("", "TF", "-1", "TF"), GTTB2B("", "HB2B", "-1", "GTTB2B"), SSS("", "春秋廉航",
"-1", "SSS"), LOWPRICE("", "LOWPRICE", "-1", "LOWPRICE"),

// //航信异常全量收单开关 1 开启时使用政策类型
NOTAV("", "开启时使用政策类型", "-1", "notav"),

DEMAND("", "需求单", "-1", "DEMAND"),

PRI_APPLY("", "私有申请", "-1", "PRI_APPLY"), PROCUREMENT("", "官网代购", "-1", "PROCUREMENT"), AFARE("", "国际运价直连",
"-1", "AFARE"),

// 公共运价下面一手政策
COM_ONE_WAY_E_POLICY("", "E政策公布运价单程", "-1", "COM_ONE_WAY_E_POLICY"), COM_ROUND_E_POLICY("", "E政策公布运价往返", "-1",
"COM_ROUND_E_POLICY"),

// 公共运价下面全局加价政策
COM_ONE_WAY_G_POLICY("", "公布运价单程全局", "-1", "COM_ONE_WAY_G_POLICY"), COM_ROUND_G_POLICY("", "公布运价往返全局", "-1",
"COM_ROUND_G_POLICY"),

OTAONEWAY("oow", "自有-单程", "3", "OTA_ONE_WAY_POLICY"), OTAROUNDTRIP("ort", "自有-往返", "4", "OTA_ROUND_TRIP_POLICY"), OTAHALFRT(
"oht", "自有-往返1/2RT", "7", "OTA_ROUND_TRIP_POLICY"), // 这项目前只被excel政策导入用到，其他情况请用"自有-往返"

OTAONEWAYTRANS("oowt", "自有-单程中转", "5", "OTA_ONE_WAY_TRANS_POLICY"), OTAROUNDTRANS("oowrt", "自有-往返中转", "6",
"OTA_ROUND_TRANS_POLICY"),

OTAMULTITRANS("omt", "自有-缺口", "8", "OTA_MULTI_TRANS_POLICY"),

/**
* 普通-单程
*/
COMONEWAY("cow", "公布运价-单程", "1", "COM_ONE_WAY_TRIP_POLICY"),
/**
* 普通-往返
*/
COMROUNDTRIP("crt", "公布运价-往返", "2", "COM_ROUND_TRIP_POLICY"),
/**
* 小团政策-单程
*/
TUANONEWAY("tow", "小团-单程", "9", "TUAN_ONE_WAY_POLICY"),
/**
* 小团政策-往返
*/
TUANROUNDTRIP("trt", "小团-往返", "10", "TUAN_ROUND_TRIP_POLICY"), B2B_ONEWAY_POLICY("eow", "E政策加价-单程", "12",
"B2B_ONEWAY_POLICY"), B2B_RETURNTRIP_POLICY("ert", "E政策加价-往返", "13", "B2B_RETURN_POLICY"), B2B_POLICY(
"b2b", "E政策B2B", "11", "B2B_POLICY"),

/**
* 自由行政策
*/
SST_HOTEL("sst", "自由行酒店", "31", "SST_HOTEL"), SST_RETURN("srn", "自由行-往返", "32", "SST_RETURN_POLICY"), SST_RETURNTRANS(
"srt", "自由行-往返中转", "33", "SST_RETURNTRANS_POLICY"),

/**
* plus政策
*/
PLUS_POLICY("plus", "plus政策", "-1", "PLUS_POLICY"),

/**
* GDS_private
*/
GDS_ONEWAY_POLICY("gop", "GDS调价-单程", "14", "GDS_ONEWAY_POLICY"),

GDS_ROUNDTRIP_POLICY("grp", "GDS调价-往返", "15", "GDS_ROUNDTRIP_POLICY"),

GDS_ONEWAY_AMADEUS("amo", "amadeus调价-单程", "45", "GDS_ONEWAY_AMADEUS"),

GDS_ROUNDTRIP_AMADEUS("amr", "amadeus调价-往返", "46", "GDS_ROUNDTRIP_AMADEUS"),

GDS_ONEWAY_SABRE("sao", "sabre调价-单程", "47", "GDS_ONEWAY_SABRE"),

GDS_ROUNDTRIP_SABRE("sar", "sabre调价-往返", "48", "GDS_ROUNDTRIP_SABRE"),

PUBLIC_POLICY("ppp", "新公布运价", "18", "PUBLIC_POLICY"),

DISTRIBUTE_ONEWAY_POLICY("dop", "采购商政策-单程", "49", "DISTRIBUTE_ONEWAY_POLICY"),

DISTRIBUTE_ROUNDTRIP_POLICY("drp", "采购商政策-往返", "50", "DISTRIBUTE_ROUNDTRIP_POLICY"),

ADJUST_PRICE_POLICY("app", "调价政策", "70", "ADJUST_PRICE_POLICY"),

CTRIP_ADJUST_PRICE_POLICY("cpp", "携程调价政策", "72", "CTRIP_ADJUST_PRICE_POLICY"),

//这个枚举只给服务平台用，判断是否走AFARE流程或者政策流程，其他无用。
ADJUST_PRICE_AFARE_OFFICIAL("app", "官网调价政策", "71", "ADJUST_PRICE_AFARE_OFFICIAL"),

END_LINE_POLICY("end", "the last", "99999", "END_LINE_POLICY");