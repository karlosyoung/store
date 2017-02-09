package com.sunsoft.zyebiz.b2e.mvp.base;

import com.google.gson.Gson;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;

import java.util.HashMap;

/**
 * model的基类
 * Created by MJX on 2017/1/18.
 */
public class BaseModel {
    protected ISecondaryCallBackData iSecondaryCallBackData;
    protected Gson gson;
    public BaseModel(ISecondaryCallBackData iSecondaryCallBackData){
        this.iSecondaryCallBackData = iSecondaryCallBackData;
        if(gson == null){
          gson  = new Gson();
        }
    }

    /**
     * 提供HashMap集合
     * @param
     * @return
     */
    protected  HashMap<String,String> getHashMap(){
        HashMap<String,String> hashMap = null;
        if(hashMap == null){
            hashMap = new HashMap<String,String>();
            hashMap.clear();
        }
        return hashMap;
    }
}
