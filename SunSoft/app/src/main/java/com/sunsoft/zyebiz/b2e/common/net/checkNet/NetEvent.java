package com.sunsoft.zyebiz.b2e.common.net.checkNet;

/**
 * Created by MJX on 2016/8/9.
 */
public class NetEvent {
    private boolean mNetFlag;
    public NetEvent(boolean netFlag){
        mNetFlag = netFlag;
    }
    public boolean getMsg(){
        return mNetFlag;
    }
}
