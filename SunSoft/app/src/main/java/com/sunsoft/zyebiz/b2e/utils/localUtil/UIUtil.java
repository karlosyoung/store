package com.sunsoft.zyebiz.b2e.utils.localUtil;

import android.content.Context;
import android.os.Handler;
import android.view.View;
import android.widget.EditText;

import com.sunsoft.zyebiz.b2e.application.MyApplication;

/**
 * Created by MJX on 2017/1/11.
 */
public class UIUtil {
    /**
     * 获取Context
     * @return
     */
    public static Context getContext(){
        return MyApplication.getContext();
    }

    /**
     * 根据id获取String
     * @param id 字符串id
     * @return
     */
    public static String getString(int id){
        return getContext().getResources().getString(id);
    }


    /**
     * dp和px的转换关系
     * @param dip
     * @return
     */
    public static int dip2px(int dip){
        float density = getContext().getResources().getDisplayMetrics().density;
        return (int)(dip*density+0.5);
    }

    /**
     * px和dp的装换关系
     * @param px
     * @return
     */
    public static int px2dip(int px){
        float density = getContext().getResources().getDisplayMetrics().density;
        return (int)(px/density+0.5);
    }


    public static View inflate(int id){
        return View.inflate(getContext(), id, null);
    }

    public static String getEditStr(EditText editText){
        return editText.getText().toString();
    }


}
