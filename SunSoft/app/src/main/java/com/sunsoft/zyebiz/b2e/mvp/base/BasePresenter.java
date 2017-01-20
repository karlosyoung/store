package com.sunsoft.zyebiz.b2e.mvp.base;

/**
 * Created by MJX on 2017/1/4.
 */
public abstract class BasePresenter<T> {
    protected T view;
    public BasePresenter(T view){
        this.view = view;
         createModel();
    }

    /**
     * 创建model
     */
    protected abstract void createModel();
}
