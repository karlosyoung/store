package com.sunsoft.zyebiz.b2e.utils.localUtil;

import android.content.Context;
import android.support.v4.app.FragmentActivity;
import android.view.inputmethod.InputMethodManager;

/**
 * 关闭键盘
 * Created by MJX on 2017/1/12.
 */
public class CloseKeyBoard {
    /**
     * 关闭键盘
     * @param baseActivity
     */
    public static void hideInputMethod(FragmentActivity baseActivity) {
        if(baseActivity == null){
            return;
        }
        InputMethodManager imm = (InputMethodManager)baseActivity.getSystemService(Context.INPUT_METHOD_SERVICE);
        if(imm.isActive()&& baseActivity.getCurrentFocus()!=null){
            if (baseActivity.getCurrentFocus().getWindowToken()!=null) {
                imm.hideSoftInputFromWindow(baseActivity.getCurrentFocus().getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
            }
        }
    }
}
