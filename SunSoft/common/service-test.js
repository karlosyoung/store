/**
 * Created by qiaozm on 2016/7/12.
 * 接口地址配置模块
 */
var React=require('react-native');

module.exports={

/********************************零售接口********************************************/
//零售列表接口地址
retailList:'http://192.168.1.222:8080/sunsoft-app/retail/getRetailList.json',
//零售轮播图接口地址
getSlidead:'http://192.168.1.222:8080/sunsoft-app/main/getSlidead.json',
//推荐尺码获取接口地址
computeClothingSize:'http://192.168.1.222:8080/sunsoft-app/goods/computeClotHingSize.json',
//零售尺码列表
getSizeInfo:'http://192.168.1.222:8080/sunsoft-app/goods/getSizeInfo.json',
//获取零售详情数据接口
retailDetailList:'http://192.168.1.222:8080/sunsoft-app/retail/retailDetailList.json',
//零售获取厂商信息接口地址
findSupplierById: 'http://192.168.1.222:8080/sunsoft-app/supplier/findById.json',
//零售立即购买接口地址
schoolGoodsDetail:'http://192.168.1.222:8080/sunsoft-app/retail/schoolGoodsDetail.json',
//零售加入购物车接口地址
addShopCartGoods:'http://192.168.1.222:8080/sunsoft-app/shoppingCart/addShopCartGoods.json',
//零售提交订单接口地址
retailCreateOrder:'http://192.168.1.222:8080/sunsoft-app/retail/retailCreateOrder.json',
//获取在线可用支付方式列表地址
getOnlineEnabledPaymentList:'http://192.168.1.222:8080/sunsoft-app/pay/getOnlineEnabledPaymentList.json',


/****************************订单接口***********************************************/
//获取订单列表地址
selectMyOrderPage:'http://192.168.1.222:8080/sunsoft-app/order/selectMyOrderPage.json',
//取消订单 确认订单接口地址
cancelOrderOrconfirmReceipt:'http://192.168.1.222:8080/sunsoft-app/order/cancelOrderOrconfirmReceipt.json',
//订单列表订单详情付款接口地址
getPayDetail:'http://192.168.1.222:8080/sunsoft-app/pay/getPayDetail.json',
//订单列表订单详情接口地址
deleteOrderByOrderSn:'http://192.168.1.222:8080/sunsoft-app/order/deleteOrderByOrderSn.json',

/****************************订购反馈接口***********************************************/
//订购反馈列表接口地址
getnoticelistbyschoolid:'http://192.168.1.222:8080/sunsoft-app/notice/getnoticelistbyschoolid.json',
//跳转到订购反馈饼图页面
toFeedback:'http://192.168.1.222:8080/sunsoft-app/notice/feedback.shtml',
//添加订购反馈信息
addCommentInfo:'http://192.168.1.222:8080/sunsoft-app/notice/addCommentInfo.json'
};