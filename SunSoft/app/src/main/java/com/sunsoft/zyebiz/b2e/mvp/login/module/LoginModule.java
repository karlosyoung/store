package com.sunsoft.zyebiz.b2e.mvp.login.module;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.LoginBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginContract;
import com.sunsoft.zyebiz.b2e.utils.localUtil.JsonUtils;
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
                LoginBean loginBean = JsonUtils.json2Bean(result,LoginBean.class);
                iSecondaryCallBackData.OnSuccess(Constants.REQUEST_SUCCESSFUL,loginBean);
            }




            @Override
            public void OnError(String error) {

            }
        });
    }

    @Override
    public int checkUserValidity(String useName, String passWord) {

        return 0;
    }


    @Override
    public void loginRequestJumpView() {

    }
}
