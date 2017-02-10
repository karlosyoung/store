package com.sunsoft.zyebiz.b2e.mvp.registered.presenter;

import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.registered.registered2.VerificationCodeBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;
import com.sunsoft.zyebiz.b2e.mvp.registered.Registered2Fragment;
import com.sunsoft.zyebiz.b2e.mvp.registered.model.Registered2Model;

import java.util.HashMap;

/**
 * 注册2页处理
 * Created by MJX on 2017/2/10.
 */
public class Registered2Presenter extends BasePresenter<Registered2Fragment> implements RegistContract.IRegist2Presenter {
    private Registered2Model registered2Model;
    private String mobilePhoneNum;
    public Registered2Presenter(Registered2Fragment mvpView) {
        super(mvpView);
    }

    @Override
    protected void createModel() {
       registered2Model = new Registered2Model(new ISecondaryCallBackData() {
            @Override
            public void OnSuccess(String tag, Object result) {
                  VerificationCodeBean verficationCodeBean = (VerificationCodeBean)result;
                  mobilePhoneNum = verficationCodeBean.getObj().getBody();
            }

            @Override
            public void OnError(String tag, String error) {

            }
        });
    }

    @Override
    public void getMobileNum(String type) {
        HashMap<String, String> hashMap = getHashMap();
        hashMap.put("mobile",mvpView.getMobileNum());
        hashMap.put("type","0");
        registered2Model.requestPhoneVerificationCode(ApiUrl.Get_SMS,hashMap);
    }

    @Override
    public void nextStep(String phoneNum, String setPassword, String confirmPassword) {

    }
}
