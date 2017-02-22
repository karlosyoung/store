package com.sunsoft.zyebiz.b2e.mvp.forgetPwd.model;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.forgetPwd.ForgetPassBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.ForgetPasswordContract;
import com.sunsoft.zyebiz.b2e.utils.localUtil.JsonUtils;
import com.sunsoft.zyebiz.b2e.utils.localUtil.LogUtil;

import java.util.HashMap;

/**
 * Created by Amoly.
 * Data：2017/2/20.
 */

public class ForgetPass1Model extends BaseModel implements ForgetPasswordContract.IforgetPassmodel{
    public ForgetPass1Model(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }

    @Override
    public void ForgetPassRequest(String url, HashMap<String, String> map) {
        HttpMethod.OkHttpPost(url, map, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                LogUtil.logMsg("忘记密码："+result);
                ForgetPassBean forgetPassBean = JsonUtils.json2Bean(result,ForgetPassBean.class);
                iSecondaryCallBackData.OnSuccess(Constants.REQUEST_SUCCESSFUL,forgetPassBean);
            }

            @Override
            public void OnError(String error) {

            }
        });

    }
}
