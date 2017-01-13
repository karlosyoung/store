package com.sunsoft.zyebiz.b2e.common.module;

import android.widget.TextView;

import com.example.acer.myloading.HttpMethod;

/**
 * 短信验证码
 * Created by MJX on 2017/1/12.
 */
public class MobileNumModule {
    public static void getPhoneVerificationCode(String url,String type,final IVerficationCodeListener verficationCodeListener){
        boolean isTimeOut = CheckTimeOutUtil.checkTimeOut(type);
        if(isTimeOut){

            return;
        }
        verficationCodeListener.showProgress();
        HttpMethod.OkHttpGet(url, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {

            }

            @Override
            public void OnError(String error) {
                verficationCodeListener.showError();
            }
        });
    }
}
