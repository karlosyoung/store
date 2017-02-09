package com.sunsoft.zyebiz.b2e.mvp.login;

import android.view.View;

/**
 * 登录的契约类
 * Created by MJX on 2017/1/11.
 */
public interface LoginContract {

    interface ILoginView{
        void getUserName();
        void getPassword();
        void monitoView();
    }

    interface ILoginPresenter{
        void login(final String userName,
                   final String password, final View v);
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
