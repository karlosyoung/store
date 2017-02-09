package com.sunsoft.zyebiz.b2e.common.module.imageVerificationModule;

import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.common.module.CommonObservable;
import com.sunsoft.zyebiz.b2e.common.module.CommonObserver;
import com.sunsoft.zyebiz.b2e.common.module.IVerficationCodeListener;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;

/**
 * 获取图片验证码模块
 * Created by MJX on 2017/1/12.
 */
public  class PictureVerificationCodeModule {

    public static void getVerificationCode(String url, final TextView tv, final IVerficationCodeListener verficationCodeListener){
        verficationCodeListener.showProgress();
        HttpMethod.OkHttpGet(url, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                parseJson(tv);
            }

            @Override
            public void OnError(String error) {
                verficationCodeListener.showError();
            }
        });
    }


    public static void parseJson(TextView tv){
        CommonObservable commonObservable = new CommonObservable();
        CommonObserver commonObserver = new CommonObserver(commonObservable, tv);
        commonObservable.setObject("");
        commonObservable.deleteObservers();
    }


}
