package com.sunsoft.zyebiz.b2e.mvp.registered.model;

import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.registered.registered2.VerificationCodeBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;

import java.util.HashMap;

/**
 * 注册2页
 * Created by MJX on 2017/2/10.
 */
public class Registered2Model extends BaseModel implements RegistContract.IRegist1Model{
    public Registered2Model(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }

    @Override
    public void requestRegist1NextStep(String url, HashMap<String, String> map) {

    }

    @Override
    public void requestPhoneVerificationCode(String url, HashMap<String, String> map) {
        HttpMethod.OkHttpPost(url, map, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                VerificationCodeBean verificationCodeBean = gson.fromJson(result, VerificationCodeBean.class);
                iSecondaryCallBackData.OnSuccess(null,verificationCodeBean);
            }

            @Override
            public void OnError(String error) {

            }
        });
    }
}
