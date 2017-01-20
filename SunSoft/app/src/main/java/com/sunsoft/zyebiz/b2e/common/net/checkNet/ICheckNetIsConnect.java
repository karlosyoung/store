package com.sunsoft.zyebiz.b2e.common.net.checkNet;

/**
 * 检查网络是否连接
 * Created by MJX on 2017/1/20.
 */
public interface ICheckNetIsConnect {
    void registCheckNet();
    void onEventMainThread(NetEvent event);
    void unregister();
}
