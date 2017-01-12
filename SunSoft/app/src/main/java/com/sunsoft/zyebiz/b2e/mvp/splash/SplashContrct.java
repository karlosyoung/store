package com.sunsoft.zyebiz.b2e.mvp.splash;

/**
 * Created by MJX on 2017/1/12.
 */
public interface SplashContrct {
    interface ISplashView{
        void showProgressBar();
        void showUpDateDialog();
        void showUpDateDesDialog();
    }

    interface ISplashPresener{
        void initBundleZip();
        void initServerUrl();
        void downLoadApk();
        void installApk();
        void updateBundle();
    }

    interface ISplashModule{
        void splashRequestServerUrl();
        void splashRequestDownLoadApk();
        void splashRequestDownLoadBundle();
    }
}
