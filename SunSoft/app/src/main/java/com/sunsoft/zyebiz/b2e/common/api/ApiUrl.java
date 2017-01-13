package com.sunsoft.zyebiz.b2e.common.api;

/**
 * Created by MJX on 2017/1/12.
 */
public class ApiUrl {


    /**
     * 用户登陆界面
     */
    public static final String LOGIN = "login/loginTwo.json";
    public static final String RELEASE_LOGIN = "";

    /**
     * 版本更新
     */
    public static final String VERSION_UPDATE =  "version/checkVersion.json";
    public static  String RELEASE_VERSION_UPDATE =  "";

    /**
     * 图片验证码
     */
    public static final String VERIFICATION_CODE = "login/validatecode.json";
    public static  String RELEASE_VERIFY_CODE = "";

    /**
     * 删除购物车中的商品
     */
    public static final String DELETE_CART_ITEM = "shoppingCart/deleteShoppingCartGoods.json";
    public static String RELEASE_DELETE_CART = "";

    /**
     * 修改购物车数量
     */
    public static final String MODIFY_CART_ITEMS =  "shoppingCart/updateAddSubstract.json";
    public static String RELEASE_MODIFY_CART =  "";

    /**
     * 关于智园页
     */
    public static final String ABOUT_ZHIYUAN =  "aboutsunsoft/aboutsunsoft.shtml";
    public static String RELEASE_ABOUT_ZHIYUAN =  "";

    /**
     * 退出登陆
     */
    public static final String SIGIN_OUT =  "login/exitlogin.json";
    public static  String RELEASE_SIGIN_OUT =  "";

    /**
     * 修改绑定的手机号
     */
    public static final String CHANGE_PHONE =  "user/updateMobilephone.json";
    public static  String RELEASE_CHANGE_PHONE =  "";

    /**
     * 忘记密码
     */
    public static final String FORGETPWD = "user/getUserDetailPassword.json";
    public static  String RELEASE_FORGETPWD = "";

    /**
     * 我的智园界面请求的url
     */
    public static final String MY_GAEDEN =  "order/getOrderNumberByUserIdThree.json";
    public static String RELEASE_MY_GAEDEN = "";

    /**
     * 查询购物车列表的信息
     */
    public static final String SHOPCART_DETAIL =    "shoppingCart/getShoppingCartList.json";
    public static  String RELEASE_SHOPCART_DETAIL = "";

    /**
     * 判断购物车商品是否已经下架
     */
    public static final String GOODS_SHELVES = "shoppingCart/shoppingCartJudgeDue.json";
    public static String RELEASE_GOODS_SHELVES = "";

    /**
     * 编辑删除购物车中的数据
     */
    public static final String DELETE_CART_DATA =  "shoppingCart/DeleteShoppingCartGoods.json";
    public static String RELEASE_DELETE_CART_DATA = "";

    /**
     * 意见反馈，改变返回的数据
     */
    public static final String FEEDBACK =  "feedback/insertFeedback.json";
    public static String RELEASE_FEEDBACK = "";

    /**
     * 获取短信验证码
     */
    public static final String Get_SMS =  "send/getSendMsg.json";
    public static  String RELEASE_Get_SMS =  "";

    /**
     * 修改密码
     */
    public static final String CHANGE_PASSWORD =  "user/updatePassword.json";
    public static String RELEASE_CHANGE_PASSWORD = "";

    /**
     * 阳光客服
     */
    public static final String SUNLIGHT_SERVICE =   "main/sunservices.shtml";
    public static String RELEASE_SUNLIGHT_SERVICE = "";

    /**
     * 客服电话
     */
    public static String RELEASE_SERVICE_TELEPHONE = "http://call.phone.shtml";

    /**
     * 重置密码
     */
    public static final String RESET_PWD =   "user/resetPassword.json";
    public static String RELEASE_RESET_PWD = "";

    /**
     * 统购轮播图的接口
     */
    public static final String CAROUSEL =  "main/getSlidead.json";
    public static String RELEASE_CAROUSEL = "";

    /**
     * 统购商品列表
     */
    public static final String COMMODIT_LIST =  "school/findGoodsList.json";
    public static  String RELEASE_COMMODIT_LIST =  "";

    /**
     * 统购的商品详情
     */
    public static final String TOGETHER_GOODS_DETAIL = "school/schoolDetail.json";
    public static String RELEASE_GOODS_DETAIL = "";

    /**
     * 统购的厂商详情
     */
    public static final String TOGETHER_FACTORY_DETAIL =  "supplier/findByid.json";
    public static String RELEASE_FACTORY_DETAIL = "";

    /**
     * 绑定手机号的第二个页面
     */
    public static final String BINDING_PHONE = "user/bindingMobilephoneTwo.json";
    public static String RELEASE_BINDING_PHONE = "";

    /**
     * 判断统购或者零售是否有数据
     */
    public static final String TEST_DATA_VALID =   "school/schoolGoodsisnull.json";
    public static String RELEASE_DATA_VALID = "";

    /**
     * 注册的第一步
     */
    public static final String REGISTER_FIRST =  "user/addSunUserTwoOne.json";
    public static String RELEASE_REGISTER_FIRST = "";
    /**
     * 注册的第三步
     */
    public static final String REGISTER_LAST =  "user/addSunUserTwoThree.json";
    public static String RELEASE_REGISTER_LAST = "";

    /**
     * 获取省市区的接口
     */
    public static final String REGIONAL_INFO=  "sunAppRegion/selectByPrimaryKeySunAppRegion.json";
    public static String RELEASE_REGIONAL_INFO = "";

    /**
     * 获取学校的接口
     */
    public static final String ACCESS_SCHOOL = "school/selectSunSchoolListPrecise.json";
    public static String RELEASE_ACCESS_SCHOOL = "";

    /**
     * 判断历史公告和新公告的接口
     */
    public static final String JUDGE_NEW_OR_HISTORY = "school/schoolGoodsisnull.json";
    public static String RELEASE_JUDGE_NEW_OR_HISTORY = "";

    /**
     * 历史公告
     */
    public static final String HISTORY_NOTICE =  "school/selectHistoryNoticeByUserName.json";
    public static String RELEASE_HISTORY_NOTICE = "";

    /**
     * 尺码助手
     */
    public static final String SIZE_ASSISTANT = "goods/getSizeInfo.json";
    public static String RELEASE_SIZE_ASSISTANT = "";

    /**
     * 立即购买
     */
    public static final String INSTANT_PAY =  "school/schoolNoticeGoods.json";
    public static String RELEASE_INSTANT_PAY = "";

    /**
     * 计算尺码
     */
    public static final String COMPUTE_SIZE =  "goods/computeClothingSize.json";
    public static String RELEASE_COMPUTE_SIZE = "";

    /**
     * 请求支付
     */
    public static final String PAY_REQUESTS =  "order/submitNoticeByOrder.json";
    public static String RELEASE_PAY_REQUESTS = "";

    /**
     * 获取支付方式
     */
    public static final String PAY_WAY =  "pay/getOnlineEnabledPaymentList.json";
    public static String RELEASE_PAY_WAY = "";

    /**
     * 更改学校
     */
    public static final String CHANGE_SCHOOL = "user/updateUserInfoDetailSchoolId.json";
    public static String RELEASE_CHANGE_SCHOOL = "";


    /**
     * 获取左侧抽屉的数据
     */
    public static final String DRAWERLAYOUT_DATA =  "school/findGoodsListTitleTwo.json";
    public static String RELEASE_DRAWERLAYOUT_DATA = "";
    /**
     * 上传图片
     */
    public static final String UPLOAD_PICTURE =  "appUpload/uploadFtp.json";
    public static String RELEASE_UPLOAD_PICTURE = "";

    /**
     * 购物车结算中心
     */
    public static final String PAY_CENTER =  "shoppingCart/selectByIds.json";
    public static String RELEASE_PAY_CENTER = "";

    /**
     * 确定提交的支付接口
     */
    public static final String READY_SUBMIT =  "pay/getPayDetail.json";
    public static String RELEASE_READY_SUBMIT = "";

    /**
     * 精确计算尺码
     */
    public static final String COMPUTE_SIZE2_5 =  "goods/computeClotHingSize.json";
    public static String RELEASE_COMPUTE_SIZE2 = "";

    /**
     * 计算特体尺码的接口
     */
    public static final String COMPUTE_SPECIAL_SIZE =  "goods/getRecommendClothingSize.json";
    public static String RELEASE_COMPUTE_SPECIAL_SIZE = "";

    /**
     * 获取特体尺码接口
     */
    public static final String SPECIAL_SIZE =  "goods/selectByTypeIdValue.json";
    public static String RELEASE_SPECIAL_SIZE = "";

    /**
     * 改变图片的路径
     */
    public static final String CHANGE_IMG= "user/updateUserInfoDetail.json";
    public static  String RELEASE_CHANGE_IMG= "";

    /**
     * bundle的增量更新
     */
    public static final String BUNDLE_UPDATE= "version/bundleVersionUrl.json";
    public static  String RELEASE_BUNDLE_UPDATE= "";

    /**
     * 代替购买的查询代买信息列表接口
     */
    public static final String SEARCH_INSTEAD_LIST= "notice/selectRepresentBuyList.json";
    public static  String RELEASE_INSTEAD_LIST= "";

    /**
     * 添加代买
     */
    public static final String SEARCH_INSTEAD_ADD= "notice/addRepresentBuy.json";
    public static  String RELEASE_INSTEAD_ADD= "";

    /**
     * 代买查询单个公告
     */
    public static final String SEARCH_INSTEAD_SEARCH_SINGLE= "notice/selectByRepresentId.json";
    public static  String RELEASE_INSTEAD_SQUERY= "";

    /**
     * 代买的删除
     */
    public static final String SEARCH_INSTEAD_DEL= "notice/deleteByRepresentId.json";
    public static  String RELEASE_SEARCH_INSTEAD_DEL= "";

    /**
     * 增加代购信息时，查询出公告下的信息数据
     */
    public static final String SEARCH_INSTEAD_INFO= "notice/selectGoodsHelpBuy.json";
    public static  String RELEASE_INSTEAD_INFO= "";

    /**
     * 代买信息的保存，添加和修改使用
     */
    public static final String INSTEAD_SAVE= "notice/saveRepresentBuy.json";
    public static  String RELEASE_INSTEAD_SAVE= "";

    /**
     * 代买提交订单
     */
    public static final String INSTEAD_PAY= "order/submitBatchGroupBuyOrder.json";
    public static  String RELEASE_INSTEAD_PAY= "";

    /**
     * 判断公告是否下架
     */
    public static final String NOTICE_IS_OFF= "notice/findNoticeById.json";
    public static  String RELEASE_NOTICE_IS_OFF= "";

    /**
     * 在线客服
     */
    public static final String ONLINE_SERVICE= "main/customerService.json";
    public static  String RELEASE_ONLINE_SERVICE= "";
}
