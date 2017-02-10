package com.sunsoft.zyebiz.b2e.mvp.base;

import java.util.HashMap;

/**
 * Presenter的基类
 * Created by MJX on 2017/1/4.
 */
public abstract class BasePresenter<T> {
    protected T mvpView;

    public BasePresenter(){

    }
    public BasePresenter(T mvpView){
        this.mvpView = mvpView;
         createModel();
    }

    /**
     * 提供HashMap集合
     * @param
     * @return
     */
    protected  HashMap<String,String> getHashMap(){
        HashMap<String,String> hashMap = null;
        if(hashMap == null){
            hashMap = new HashMap<String,String>();
            hashMap.clear();
        }
        return hashMap;
    }

    /**
     * 创建model
     */
    protected abstract void createModel();
}
