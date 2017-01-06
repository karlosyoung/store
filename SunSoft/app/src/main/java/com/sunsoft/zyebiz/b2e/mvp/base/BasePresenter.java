package com.sunsoft.zyebiz.b2e.mvp.base;

/**
 * Created by MJX on 2017/1/4.
 */
public interface BasePresenter<T extends com.sunsoft.zyebiz.b2e.mvp.base.BaseView> {
    void attachView(T view);
    void detachView();
    void searchUser(String loginName);
}
