package com.sunsoft.zyebiz.b2e.common.module;

/**
 * Created by MJX on 2017/1/12.
 */
public interface IVerficationCodeListener {
    void showProgress();
    String getVerficationCode();
    void showError();
}
