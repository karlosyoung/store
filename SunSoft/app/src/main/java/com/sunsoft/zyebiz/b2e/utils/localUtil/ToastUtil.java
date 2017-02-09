package com.sunsoft.zyebiz.b2e.utils.localUtil;

import android.widget.Toast;

/**
 * Toast的工具类
 * Created by MJX on 2017/2/9.
 */
public class ToastUtil {
    //各种提示
    public static void toastDes(String str){
        Toast.makeText(UIUtil.getContext(),str,Toast.LENGTH_SHORT).show();
    }
}
