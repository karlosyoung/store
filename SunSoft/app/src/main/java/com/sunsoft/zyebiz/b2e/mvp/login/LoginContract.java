package com.sunsoft.zyebiz.b2e.mvp.login;

import java.util.HashMap;

/**
 * 登录的契约类
 * Created by MJX on 2017/1/11.
 */
public interface LoginContract {

    interface ILoginView{
        String getUserName();
        String getPassword();
        String getCheckNum();
    }

    interface ILoginPresenter{
        void toLogin();
        void saveUserInfo();
        void refreshVerificationCode();
        boolean checkJumpView();
    }

    interface ILoginModule{
        void loginRequest(String url, HashMap<String, String> map);
        int checkUserValidity(String useName, String passWord);
        void loginRequestJumpView();
    }
}
