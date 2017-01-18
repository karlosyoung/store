package com.sunsoft.zyebiz.b2e.common.api;

import com.sunsoft.zyebiz.b2e.common.constants.GetVersion;

/**
 * 请求网络的Url
 * Created by MJX on 2017/1/12.
 */
public class ApiUrl {

    /*—————————————————————上线的环境配置——————————————————————————————————————————*/
    //测试环境,获取动态ip的初始化地址
    public static String REQUEST_SERVER_URL = "https://ssl.ygzykj.com/sunsoft-app/version/checkVersionip.json?versionCode="+ GetVersion.getVersionName()+"&type=10";
    //生产环境，获取动态ip的初始化地址
//    public static String REQUEST_SERVER_URL = "https://www.ygzykj.com/sunsoft-app/version/checkVersionip.json?versionCode="+GetVersion.getVersionName()+"&type=10";
    /*———————————————————————————————————————————————————————————————————-------*/


    /**
     * 请求的BaseUrl
     */
    public static String BASE_URL = "";

    /**
     * 用户登陆界面
     */
    public static  String LOGIN = "login/loginTwo.json";

    /**
     * 退出登陆
     */
    public static  String SIGIN_OUT =  "login/exitlogin.json";

    /**
     * 修改绑定的手机号
     */
    public static  String CHANGE_PHONE =  "user/updateMobilephone.json";

    /**
     * 忘记密码
     */
    public static  String FORGETPWD = "user/getUserDetailPassword.json";

    /**
     * 修改密码
     */
    public static  String CHANGE_PASSWORD =  "user/updatePassword.json";

    /**
     * 重置密码
     */
    public static  String RESET_PWD =   "user/resetPassword.json";

    /**
     * 获取短信验证码
     */
    public static  String Get_SMS =  "send/getSendMsg.json";

    /**
     * 图片验证码
     */
    public static  String VERIFICATION_CODE = "login/validatecode.json";

    /**
     * 注册的第一步
     */
    public static  String REGISTER_FIRST =  "user/addSunUserTwoOne.json";

    /**
     * 注册的第三步
     */
    public static  String REGISTER_LAST =  "user/addSunUserTwoThree.json";

    /**
     * 绑定手机号的第二个页面
     */
    public static  String BINDING_PHONE = "user/bindingMobilephoneTwo.json";

    /**
     * 版本更新
     */
    public static  String VERSION_UPDATE =  "version/checkVersion.json";

    /**
     * bundle的增量更新
     */
    public static  String BUNDLE_UPDATE= "version/bundleVersionUrl.json";

    /**
     * 删除购物车中的商品
     */
    public static  String DELETE_CART_ITEM = "shoppingCart/deleteShoppingCartGoods.json";

    /**
     * 修改购物车数量
     */
    public static  String MODIFY_CART_ITEMS =  "shoppingCart/updateAddSubstract.json";

    /**
     * 我的智园界面请求的url
     */
    public static  String MY_GAEDEN =  "order/getOrderNumberByUserIdThree.json";

    /**
     * 查询购物车列表的信息
     */
    public static  String SHOPCART_DETAIL =    "shoppingCart/getShoppingCartList.json";

    /**
     * 判断购物车商品是否已经下架
     */
    public static  String GOODS_SHELVES = "shoppingCart/shoppingCartJudgeDue.json";

    /**
     * 编辑删除购物车中的数据
     */
    public static  String DELETE_CART_DATA =  "shoppingCart/DeleteShoppingCartGoods.json";

    /**
     * 意见反馈，改变返回的数据
     */
    public static  String FEEDBACK =  "feedback/insertFeedback.json";

    /**
     * 统购轮播图的接口
     */
    public static  String CAROUSEL =  "main/getSlidead.json";

    /**
     * 统购商品列表
     */
    public static  String COMMODIT_LIST =  "school/findGoodsList.json";

    /**
     * 统购的商品详情
     */
    public static  String TOGETHER_GOODS_DETAIL = "school/schoolDetail.json";

    /**
     * 统购的厂商详情
     */
    public static  String TOGETHER_FACTORY_DETAIL =  "supplier/findByid.json";

    /**
     * 判断统购或者零售是否有数据
     */
    public static  String TEST_DATA_VALID =   "school/schoolGoodsisnull.json";

    /**
     * 获取省市区的接口
     */
    public static  String REGIONAL_INFO=  "sunAppRegion/selectByPrimaryKeySunAppRegion.json";

    /**
     * 获取学校的接口
     */
    public static  String ACCESS_SCHOOL = "school/selectSunSchoolListPrecise.json";

    /**
     * 判断历史公告和新公告的接口
     */
    public static  String JUDGE_NEW_OR_HISTORY = "school/schoolGoodsisnull.json";

    /**
     * 历史公告
     */
    public static  String HISTORY_NOTICE =  "school/selectHistoryNoticeByUserName.json";

    /**
     * 尺码助手
     */
    public static  String SIZE_ASSISTANT = "goods/getSizeInfo.json";

    /**
     * 立即购买
     */
    public static  String INSTANT_PAY =  "school/schoolNoticeGoods.json";

    /**
     * 请求支付
     */
    public static  String PAY_REQUESTS =  "order/submitNoticeByOrder.json";

    /**
     * 获取支付方式
     */
    public static  String PAY_WAY =  "pay/getOnlineEnabledPaymentList.json";

    /**
     * 更改学校
     */
    public static  String CHANGE_SCHOOL = "user/updateUserInfoDetailSchoolId.json";

    /**
     * 获取左侧抽屉的数据
     */
    public static  String DRAWERLAYOUT_DATA =  "school/findGoodsListTitleTwo.json";

    /**
     * 购物车结算中心
     */
    public static  String PAY_CENTER =  "shoppingCart/selectByIds.json";

    /**
     * 确定提交的支付接口
     */
    public static  String READY_SUBMIT =  "pay/getPayDetail.json";

    /**
     * 精确计算尺码
     */
    public static  String COMPUTE_SIZE =  "goods/computeClotHingSize.json";

    /**
     * 计算特体尺码的接口
     */
    public static  String COMPUTE_SPECIAL_SIZE =  "goods/getRecommendClothingSize.json";

    /**
     * 获取特体尺码接口
     */
    public static  String SPECIAL_SIZE =  "goods/selectByTypeIdValue.json";

    /**
     * 改变图片的路径
     */
    public static  String CHANGE_IMG= "user/updateUserInfoDetail.json";

    /**
     * 上传图片
     */
    public static  String UPLOAD_PICTURE =  "appUpload/uploadFtp.json";

    /**
     * 代替购买的查询代买信息列表接口
     */
    public static  String SEARCH_INSTEAD_LIST= "notice/selectRepresentBuyList.json";

    /**
     * 添加代买
     */
    public static  String SEARCH_INSTEAD_ADD= "notice/addRepresentBuy.json";

    /**
     * 代买查询单个公告
     */
    public static  String SEARCH_INSTEAD_SEARCH_SINGLE= "notice/selectByRepresentId.json";

    /**
     * 代买的删除
     */
    public static  String SEARCH_INSTEAD_DEL= "notice/deleteByRepresentId.json";

    /**
     * 增加代购信息时，查询出公告下的信息数据
     */
    public static  String SEARCH_INSTEAD_INFO= "notice/selectGoodsHelpBuy.json";

    /**
     * 代买信息的保存，添加和修改使用
     */
    public static  String INSTEAD_SAVE= "notice/saveRepresentBuy.json";

    /**
     * 代买提交订单
     */
    public static  String INSTEAD_PAY= "order/submitBatchGroupBuyOrder.json";

    /**
     * 判断公告是否下架
     */
    public static  String NOTICE_IS_OFF= "notice/findNoticeById.json";

    /**
     * 关于智园页
     */
    public static  String ABOUT_ZHIYUAN =  "aboutsunsoft/aboutsunsoft.shtml";

    /**
     * 在线客服
     */
    public static  String ONLINE_SERVICE= "main/customerService.json";

    /**
     * 阳光客服
     */
    public static  String SUNLIGHT_SERVICE =   "main/sunservices.shtml";

    /**
     * 客服电话
     */
    public static String SERVICE_TELEPHONE = "http://call.phone.shtml";

}
