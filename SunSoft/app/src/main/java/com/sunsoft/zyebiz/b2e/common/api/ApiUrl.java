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
}
