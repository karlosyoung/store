package com.sunsoft.zyebiz.b2e.mvp.splash;

import android.app.Activity;

import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.serverUrl.ServerBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;

/**
 * Created by MJX on 2017/1/12.
 */
public class SplashPresenter extends BasePresenter<Activity> implements SplashContract.ISplashPresener {

    private SplashModel splashModel;

    public SplashPresenter(Activity view) {
        super(view);
    }

    @Override
    public void initBundleZip() {

    }

    @Override
    public void initServerUrl() {
        splashModel.splashRequestServerUrl();
    }

    @Override
    public void downLoadApk() {

    }

    @Override
    public void installApk() {

    }

    @Override
    public void updateBundle() {

    }

    @Override
    protected void createModel() {
        splashModel = new SplashModel(new ISecondaryCallBackData() {
               @Override
               public void OnSuccess(Object result) {
                  ServerBean serverBean =  ((ServerBean)result);
                   if(EmptyUtil.isNotEmpty(serverBean.getBody().getObj().getIsUpdate())){
                       if("1".equals(serverBean.getBody().getObj().getIsUpdate())){  /*强制更新*/

                       }else{
                         splashModel.splashRequesetIsUpdateBundle();
                       }
                   }
               }

               @Override
               public void OnError(String error) {

               }
           });
    }
}
