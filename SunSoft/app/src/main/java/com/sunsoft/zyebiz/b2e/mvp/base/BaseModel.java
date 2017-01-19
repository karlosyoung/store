package com.sunsoft.zyebiz.b2e.mvp.base;

import com.google.gson.Gson;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;

/**
 * Created by MJX on 2017/1/18.
 */
public abstract class BaseModel {
    protected ISecondaryCallBackData iSecondaryCallBackData;
    protected Gson gson;
    public BaseModel(ISecondaryCallBackData iSecondaryCallBackData){
        this.iSecondaryCallBackData = iSecondaryCallBackData;
        if(gson == null){
          gson  = new Gson();
        }
    }
}
