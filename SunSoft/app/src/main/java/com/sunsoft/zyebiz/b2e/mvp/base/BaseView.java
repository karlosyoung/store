package com.sunsoft.zyebiz.b2e.mvp.base;

/**
 * Created by MJX on 2017/1/4.
 */
public interface BaseView {
    void showProgressDialog();
    void hideProgressDialog();
    void showErrorMessage(String text);
}
