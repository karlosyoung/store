package com.sunsoft.zyebiz.b2e.utils.localUtil;

import android.widget.Toast;

/**
 * Toast的工具类
 * Created by MJX on 2017/2/9.
 */
public class ToastUtil {
    /**
     *Toast
     * @param strId
     */
    public static void toastDes(int strId){
        Toast.makeText(UIUtil.getContext(),UIUtil.getContext().getString(strId),Toast.LENGTH_SHORT).show();
    }

    /**
     * Toast
     * @param str
     */
    public static void toastDes(String str){
        Toast.makeText(UIUtil.getContext(),str,Toast.LENGTH_SHORT).show();
    }
}
