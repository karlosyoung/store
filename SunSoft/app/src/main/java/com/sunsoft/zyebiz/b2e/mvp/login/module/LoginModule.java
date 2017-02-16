package com.sunsoft.zyebiz.b2e.mvp.login.module;

import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginContract;
import com.sunsoft.zyebiz.b2e.utils.localUtil.LogUtil;

import java.util.HashMap;

/**
 * Created by MJX on 2017/1/9.
 */
public class LoginModule extends BaseModel implements LoginContract.ILoginModule {


    public LoginModule(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }

    @Override
    public void loginRequest(String url, HashMap<String, String> map) {
        HttpMethod.OkHttpPost(url, map, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                LogUtil.logMsg("登录："+result);
            }

            @Override
            public void OnError(String error) {

            }
        });
    }

    @Override
    public void loginRequestRefreshCode() {

    }

    @Override
    public void loginRequestJumpView() {

    }
}
