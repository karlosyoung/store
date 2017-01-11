package com.sunsoft.zyebiz.b2e.common.net.http;

/**
 * 请求数据的回调接口
 * Created by MJX on 2017/1/9.
 */
public interface IOnDataFinish {
    void OnSuccess(String result);
    void OnError(String error);
}
