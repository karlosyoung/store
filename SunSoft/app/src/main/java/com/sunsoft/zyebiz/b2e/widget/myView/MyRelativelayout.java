package com.sunsoft.zyebiz.b2e.widget.myView;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

/**
 * Created by MJX on 2016/8/5.
 */
public class MyRelativelayout extends View {
    public MyRelativelayout(Context context) {
        super(context);
    }

    public MyRelativelayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MyRelativelayout(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }
    /*拦截触摸事件*/
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        return super.onTouchEvent(event);
    }
}
