package com.sunsoft.zyebiz.b2e.common.net.checkNet;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by MJX on 2017/1/11.
 */
public class CheckNet {
    private static ConnectivityManager connectMager;
    private static Boolean hasNetFlag = false;
    /**
     * 有无网络的判断
     */
    public static boolean isHaveNetWork() {
        if(connectMager == null){
            connectMager = (ConnectivityManager) UIUtil.getContext()
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
        }
        NetworkInfo info = connectMager.getActiveNetworkInfo();
//        SharedPreferences sp = UIUtil.getContext().getSharedPreferences("net", UIUtil.getContext().MODE_PRIVATE);
//        SharedPreferences.Editor edit = sp.edit();
//        edit.clear();
        if (info == null) {
//            edit.putBoolean("hasNet", false).commit(); /*hasNet是false表示无网络*/
            hasNetFlag = false;
        } else {
//            edit.putBoolean("hasNet", true).commit(); /*hasNet是true表示有网络*/
            hasNetFlag = true;
        }
        return hasNetFlag;
    }
}
