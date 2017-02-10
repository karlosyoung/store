package com.sunsoft.zyebiz.b2e.mvp.splash;

import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.constants.GetVersion;
import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.splash.ServerBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.utils.localUtil.LogUtil;

/**
 *闪屏页
 * Created by MJX on 2017/1/12.
 */
public class SplashModel extends BaseModel implements SplashContract.ISplashModule {

    public SplashModel(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }



    @Override
    public void splashRequestServerUrl() {
        ApiUrl.BASE_URL = "";
        HttpMethod.OkHttpGet(ApiUrl.REQUEST_SERVER_URL, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                try{
                    ServerBean serverBean = gson.fromJson(result, ServerBean.class);
                    ApiUrl.BASE_URL = serverBean.getBody().getObj().getServerUrl();
                    LogUtil.logMsg("服务器地址请求成功："+ApiUrl.BASE_URL);
                    iSecondaryCallBackData.OnSuccess(null,serverBean);
                }catch (NullPointerException e){
                    //查询数据出错的问题
                    //TODO 测试用，需要删除
                    iSecondaryCallBackData.OnSuccess(null,null);
                    return;
                }
            }

            @Override
            public void OnError(String error) {

            }
        });
    }

    @Override
    public void splashRequesetIsUpdateBundle() {
        getHashMap().put("bundleCode","1.0");
        getHashMap().put("versionCode", GetVersion.getVersionName());
        getHashMap().put("type","10");
        HttpMethod.OkHttpPost(ApiUrl.BUNDLE_UPDATE, getHashMap(), new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                LogUtil.logMsg("请求bundle的结果"+result);
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
