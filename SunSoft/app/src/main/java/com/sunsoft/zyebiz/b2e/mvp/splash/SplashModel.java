package com.sunsoft.zyebiz.b2e.mvp.splash;

import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;

/**
 *
 * Created by MJX on 2017/1/12.
 */
public class SplashModel extends BaseModel implements SplashContract.ISplashModule {


    public SplashModel(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }



    @Override
    public void splashRequestServerUrl() {
        HttpMethod.OkHttpGet(ApiUrl.REQUEST_SERVER_URL, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {

            }

            @Override
            public void OnError(String error) {

            }
        });
    }

    @Override
    public void splashRequestDownLoadApk() {

    }

    @Override
    public void splashRequestDownLoadBundle() {

    }
}
