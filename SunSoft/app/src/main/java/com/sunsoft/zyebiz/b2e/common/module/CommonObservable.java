package com.sunsoft.zyebiz.b2e.common.module;

import java.util.Observable;

/**
 * Created by MJX on 2017/1/13.
 */
public class CommonObservable extends Observable {
    private String object;
    public Object getObject(){
        return object;
    }

    public void setObject(String object){
        if(object == null){
            return;
        }
        this.object = object;
        setChanged();
        notifyObservers();
    }
}
