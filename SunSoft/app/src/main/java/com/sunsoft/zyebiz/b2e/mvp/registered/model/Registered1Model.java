package com.sunsoft.zyebiz.b2e.mvp.registered.model;

import com.sunsoft.zyebiz.b2e.common.net.http.HttpMethod;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.registered.registered1.Registered1Bean;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseModel;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;
import com.sunsoft.zyebiz.b2e.utils.localUtil.LogUtil;

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
    public void requestRegist1NextStep(String url, HashMap<String, String> map) {
        HttpMethod.OkHttpPost(url, map, new HttpMethod.OnDataFinish() {
            @Override
            public void OnSuccess(String result) {
                LogUtil.logMsg("注册1页："+result);
//                JSONObject jsonObject = new JSONObject(result);
//                if(jsonObject.has("msgCode")){
//                    String msgCode = jsonObject.getString("msgCode");
//                    if("0".equals(msgCode)){
//
//                    }
//                }
                Registered1Bean registered1Bean = gson.fromJson(result, Registered1Bean.class);
                iSecondaryCallBackData.OnSuccess(null,registered1Bean);
            }

            @Override
            public void OnError(String error) {

            }
        });
    }
}
