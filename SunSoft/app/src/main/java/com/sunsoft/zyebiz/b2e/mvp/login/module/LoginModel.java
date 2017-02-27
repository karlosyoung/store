package com.sunsoft.zyebiz.b2e.mvp.login.module;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.login.BaseRequestBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginContract;
import com.sunsoft.zyebiz.b2e.utils.localUtil.JsonUtils;
import com.sunsoft.zyebiz.b2e.utils.localUtil.LogUtil;

import java.util.HashMap;

/**
 * Created by MJX on 2017/1/9.
 *
 */
public class LoginModel extends BaseModel implements LoginContract.ILoginModule {


    public LoginModel(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }

    @Override
    public void loginRequest(String url, HashMap<String, String> map) {
        HttpMethod.OkHttpPost(url, map, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                LogUtil.logMsg("登录："+result);
                BaseRequestBean baseRequestBean = JsonUtils.json2Bean(result,BaseRequestBean.class);
                iSecondaryCallBackData.OnSuccess(Constants.REQUEST_SUCCESSFUL, baseRequestBean);
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
