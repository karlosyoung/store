package com.sunsoft.zyebiz.b2e.mvp.base;

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
     * 创建model
     */
    protected abstract void createModel();
}
