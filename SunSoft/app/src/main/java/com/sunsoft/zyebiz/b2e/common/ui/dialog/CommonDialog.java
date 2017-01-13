package com.sunsoft.zyebiz.b2e.common.ui.dialog;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;

/**
 * 正常弹框
 * Created by MJX on 2017/1/13.
 */
public class CommonDialog extends Dialog {
    public CommonDialog(Context context) {
        super(context);
    }

    public CommonDialog(Context context, int themeResId) {
        super(context, themeResId);
    }

    protected CommonDialog(Context context, boolean cancelable, OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }
}
