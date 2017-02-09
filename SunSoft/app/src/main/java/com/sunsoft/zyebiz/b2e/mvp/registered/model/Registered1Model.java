package com.sunsoft.zyebiz.b2e.mvp.registered.model;

import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;

import java.util.HashMap;

/**
 * 注册1页
 * Created by MJX on 2017/2/9.
 */
public class Registered1Model extends BaseModel implements RegistContract.IRegist1Module{
    public Registered1Model(ISecondaryCallBackData iSecondaryCallBackData) {
        super(iSecondaryCallBackData);
    }



    @Override
    public void requestRegist1(String url, HashMap<String, String> map) {

    }
}
