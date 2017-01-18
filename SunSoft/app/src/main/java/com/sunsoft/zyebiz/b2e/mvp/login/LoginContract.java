package com.sunsoft.zyebiz.b2e.mvp.login;

/**
 * 登录的契约类
 * Created by MJX on 2017/1/11.
 */
public interface LoginContract {

//    interface ILoginView{
//        void getUserName();
//        void getPassword();
//        void monitoView();
//    }

    interface ILoginPresenter{
        void login();
        void saveUserInfo();
        void refreshVerificationCode();
        void checkJumpView();
    }

    interface ILoginModule{
        void loginRequest();
        void loginRequestRefreshCode();
        void loginRequestJumpView();
    }
}
