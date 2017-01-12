package com.sunsoft.zyebiz.b2e.data.userData;

/**
 * Created by MJX on 2017/1/11.
 */
public class UserSp {
    private static Boolean isLogin = false;
    /**
     * 判断用户是否登录
     * @return
     */
    public static boolean isLogin(){
        return isLogin;
    }
}
