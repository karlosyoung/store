package com.sunsoft.zyebiz.b2e.common.net.http;

import com.sunsoft.zyebiz.b2e.enity.net.splash.ServerBean;

/**
 * 请求数据的二次回调接口
 * Created by MJX on 2017/1/9.
 */
public interface ISecondaryCallBackData <T>{
    void  OnSuccess(String tag,T result);
    void OnError(String tag,String error);
}
