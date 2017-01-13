package com.sunsoft.zyebiz.b2e.data.userData;

import com.sunsoft.zyebiz.b2e.data.GetSpInsance;

/**
 * 用户信息
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

    public static void saveUserFirstInfo(){
        GetSpInsance.getEdit("first");
    }
}
