package com.sunsoft.zyebiz.b2e.utils.localUtil;

import android.util.Log;

/**
 * 日志打印
 * Created by MJX on 2017/1/12.
 */
public class LogUtil {
    public static boolean isShow = true;//开发模式
    //打出来的log
    public static void logMsg(String msg){
        if(isShow){
            Log.i("sunsoft", msg);
        }
    }
}
