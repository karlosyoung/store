/**
 * Created by qiaozm on 2016/7/12.
 * 接口地址配置模块
 */
var React=require('react-native');
//var serviceName="http://192.168.1.128:8080/sunsoft-app/";
var serviceName="http://www.ygzykj.cn:8080/sunsoft-app/";
//var serviceName="http://www.ygzykj.com/sunsoft-app/";
module.exports={

/********************************零售接口********************************************/
//零售列表接口地址
retailList:serviceName+'retail/getRetailList.json',
//零售轮播图接口地址
getSlidead:serviceName+'main/getSlidead.json',
//推荐尺码获取接口地址
computeClothingSize:serviceName+'goods/computeClotHingSize.json',
//零售尺码列表
//getSizeInfo:serviceName+'goods/getSizeInfo.json',
//零售特体尺码列表
selectByTypeIdValue:serviceName+'goods/selectByTypeIdValue.json',
//获取特体计算尺码
getRecommendclothingSize:serviceName+'goods/getRecommendClothingSize.json',
//获取零售详情数据接口
retailDetailList:serviceName+'retail/retailSizeListDetails.json',
//零售获取厂商信息接口地址
findSupplierById:serviceName+ 'supplier/findById.json',
//零售立即购买接口地址
schoolGoodsDetail:serviceName+'retail/retailPurchaseImmediately.json',
//零售加入购物车接口地址
addShopCartGoods:serviceName+'shoppingCart/addShoppingCartUserIdOrGoodsId.json',
//零售提交订单接口地址
retailCreateOrder:serviceName+'retail/retailSubmitOrders.json',
//获取在线可用支付方式列表地址
getOnlineEnabledPaymentList:serviceName+'pay/getOnlineEnabledPaymentList.json',


/****************************订单接口***********************************************/
//获取订单列表地址
selectMyOrderPage:serviceName+'order/selectRetailAndUnityBuyOrderTOPage.json',
//取消订单 确认订单接口地址
cancelOrderOrconfirmReceipt:serviceName+'order/cancelOrderOrconfirmReceipt.json',
//订单列表订单详情付款接口地址
getPayDetail:serviceName+'pay/getPayDetail.json',
//订单列表订单详情接口地址
appSelectOrderDetailInfo:serviceName+'order/appSelectOrderDetailInfo.json',
//删除订单
deleteOrderByOrderSn:serviceName+'order/deleteOrderByOrderSn.json',
//售后服务
selectRetailAndUnityBuyOrderTOPage:serviceName+'order/selectRetailAndUnityBuyOrderTOPage.json',
//再次购买接口地址
againPurchase:serviceName+'shoppingCart/againPurchase.json',
/****************************订购反馈接口***********************************************/
//订购反馈列表接口地址
getnoticelistbyschoolid:serviceName+'notice/getNoticelistBySchoolid.json',
//跳转到订购反馈饼图页面
toFeedback:serviceName+'notice/feedback.shtml',
//添加订购反馈信息
addCommentInfo:serviceName+'notice/addCommentInfo.json'
};