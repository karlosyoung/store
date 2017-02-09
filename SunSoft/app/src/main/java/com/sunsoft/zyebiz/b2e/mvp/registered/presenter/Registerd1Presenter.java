package com.sunsoft.zyebiz.b2e.mvp.registered.presenter;

import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;
import com.sunsoft.zyebiz.b2e.mvp.registered.Registered1Fragment;
import com.sunsoft.zyebiz.b2e.mvp.registered.model.Registered1Model;

/**
 * 注册1页
 * Created by MJX on 2017/2/9.
 */
public class Registerd1Presenter extends BasePresenter<Registered1Fragment> implements RegistContract.IRegist1Presenter{

    private Registered1Model registered1Model;
    private Registered1Fragment register1Fragment;
    public Registerd1Presenter(Registered1Fragment view){
        super(view);
    }

    @Override
    protected void createModel() {
        registered1Model = new Registered1Model(new ISecondaryCallBackData() {
              @Override
              public void OnSuccess(Object result) {

              }

              @Override
              public void OnError(String error) {

              }
          });
    };

    @Override
    public void checkRegistStepOneMsg() {

    }
}
