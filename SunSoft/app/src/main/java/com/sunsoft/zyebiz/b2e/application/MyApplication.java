package com.sunsoft.zyebiz.b2e.application;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;

import com.sunsoft.zyebiz.b2e.common.net.checkNet.NetAndRefreshService;

/**
 * 初始化：
 * 网络请求对象
 * 请求图片的对象
 * Created by MJX on 2017/1/4.
 */
public class MyApplication extends Application{
    private static Context context;
    @Override
    public void onCreate() {
        super.onCreate();
        initCommonFeature();
        context = getApplicationContext();
    }

    public static Context getContext(){
        return context;
    }

    /**
     * 初始化功能
     */
    private void initCommonFeature(){
        context = getApplicationContext();
        startNetAndRefreshMonitor();
    }

    private void startNetAndRefreshMonitor(){
        Intent intent = new Intent(this, NetAndRefreshService.class);
        startService(intent);
    }


}
