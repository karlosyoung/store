package com.sunsoft.zyebiz.b2e.mvp.login;


import android.app.Activity;
import android.text.TextUtils;
import android.view.View;

import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;

/**
 * Created by MJX on 2017/1/9.
 */
public class LoginPresenter  extends BasePresenter<Activity> implements LoginContract.ILoginPresenter{


    public LoginPresenter(Activity view) {
        super(view);
    }

    @Override
    public void login(final String userName,
                      final String password, final View v) {
        if (!checkParams(userName,password,v)){
            return;
        }
    }

    private boolean checkParams(String userName, String password, View v) {


        if (TextUtils.isEmpty(userName)) {
            return false;
        }

//        if (!AppManager.getInstance().checkUser(userName)) {
//
//            return false;
//        }
        return true;
    }

    @Override
    public void saveUserInfo() {

    }

    @Override
    public void refreshVerificationCode() {

    }

    @Override
    public void checkJumpView() {

    }

    @Override
    protected void createModel() {

    }
}
