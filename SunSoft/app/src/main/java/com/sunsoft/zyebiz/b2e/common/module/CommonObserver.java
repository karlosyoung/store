package com.sunsoft.zyebiz.b2e.common.module;

import android.widget.TextView;

import java.util.Observable;
import java.util.Observer;

/**
 * Created by MJX on 2017/1/13.
 */
public class CommonObserver implements Observer {
    private TextView view;
    public CommonObserver(CommonObservable commonObservable,TextView view){
        commonObservable.addObserver(this);
        this.view = view;
    }

    @Override
    public void update(Observable observable, Object o) {
        Object object = ((CommonObservable) observable).getObject();
        if(view == null){
            return;
        }
        view.setText((String)object);
    }
}
