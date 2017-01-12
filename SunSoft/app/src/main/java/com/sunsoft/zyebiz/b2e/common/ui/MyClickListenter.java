package com.sunsoft.zyebiz.b2e.common.ui;

import android.view.View;

/**
 * 点击事件的双击响应
 * Created by MJX on 2017/1/12.
 */
public class MyClickListenter implements View.OnClickListener{
    private static long lastClickTime = 0;
    private IDoubleClickListener iDoubleClickListener;
    @Override
    public void onClick(View v) {
        long currentTime = System.currentTimeMillis();
        long timeD = currentTime - lastClickTime;
        if ( 0 < timeD && timeD < 2000) {
         return;
        }else {
            lastClickTime = currentTime;
        }
        iDoubleClickListener.onDo();
    }

    public void setiDoubleClickListener(IDoubleClickListener iDoubleClickListener){
        this.iDoubleClickListener = iDoubleClickListener;
    }

}
