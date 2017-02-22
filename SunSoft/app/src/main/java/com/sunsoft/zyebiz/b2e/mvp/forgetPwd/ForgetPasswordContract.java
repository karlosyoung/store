package com.sunsoft.zyebiz.b2e.mvp.forgetPwd;

import java.util.HashMap;

/**
 * Created by MJX on 2017/1/13.
 */
public interface ForgetPasswordContract {

    interface IForgetPassView{
        String getUserName();
    }
    interface IForgetPassPresenter{
        boolean checkJumpView();
        void nextStep();
    }
    interface IforgetPassmodel{
        void ForgetPassRequest(String url, HashMap<String, String> map);
    }
}
