package com.sunsoft.zyebiz.b2e.mvp.splash;

import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;

/**
 *
 * Created by MJX on 2017/1/12.
 */
public class SplashModel implements SplashContrct.ISplashModule {
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
