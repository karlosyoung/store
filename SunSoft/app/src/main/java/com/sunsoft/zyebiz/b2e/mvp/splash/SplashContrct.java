package com.sunsoft.zyebiz.b2e.mvp.splash;

/**
 * Created by MJX on 2017/1/12.
 */
public interface SplashContrct {
    interface ISplashView{
        /**
         * 展示闪屏页进度条
         */
        void showProgressBar();

        /**
         * 展示闪屏页正在更新的dialog
         */
        void showUpDateDialog();

        /**
         * 展示闪屏页更新的内容的dialog
         */
        void showUpDateDesDialog();
    }

    interface ISplashPresener{
        /**
         * 初始化解压bundle
         */
        void initBundleZip();

        /**
         * 获取服务器的地址
         */
        void initServerUrl();

        /**
         * 下载Apk
         */
        void downLoadApk();

        /**
         * 安装Apk
         */
        void installApk();

        /**
         * 更新bundle
         */
        void updateBundle();
    }

    interface ISplashModule{
        /**
         * 请求服务器的地址
         */
        void splashRequestServerUrl();

        /**
         * 请求下载apk
         */
        void splashRequestDownLoadApk();

        /**
         * 请求下载Bundle
         */
        void splashRequestDownLoadBundle();
    }
}
