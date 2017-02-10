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
        void login(final String userName, final String password);
        void saveUserInfo();
        void refreshVerificationCode();
        boolean checkJumpView();
    }

    interface ILoginModule{
        void loginRequest(String url, HashMap<String, String> map);
        void loginRequestRefreshCode();
        void loginRequestJumpView();
    }
}
