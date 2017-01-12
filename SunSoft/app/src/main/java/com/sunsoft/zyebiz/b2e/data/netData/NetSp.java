package com.sunsoft.zyebiz.b2e.data.netData;

import android.content.SharedPreferences;

import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 有无网络数据
 * Created by MJX on 2017/1/11.
 */
public class NetSp {
    private static SharedPreferences netSp;
    private static SharedPreferences.Editor netEdit;

    public static void saveNetInfo(boolean netFlag){
        if(netSp == null){
            netSp = UIUtil.getContext().getSharedPreferences("net", UIUtil.getContext().MODE_PRIVATE);
        }
        if(netSp == null){
            netEdit = netSp.edit();
        }
        netEdit.clear();
        netEdit.putBoolean("hasNet", netFlag).commit();
    }

    /**
     * 获取网络信息
     * @return
     */
    public static boolean getNetInfo(){
        if(netSp == null){
            netSp = UIUtil.getContext().getSharedPreferences("net", UIUtil.getContext().MODE_PRIVATE);
        }
        boolean hasNet = netSp.getBoolean("hasNet", false);
        return hasNet;
    }
}
