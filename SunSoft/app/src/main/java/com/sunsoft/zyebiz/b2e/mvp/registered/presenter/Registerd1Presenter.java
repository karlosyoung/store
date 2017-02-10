package com.sunsoft.zyebiz.b2e.mvp.registered.presenter;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.module.imageVerificationModule.ImageVerification;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;
import com.sunsoft.zyebiz.b2e.mvp.registered.Registered1Fragment;
import com.sunsoft.zyebiz.b2e.mvp.registered.model.Registered1Model;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.PhoneNumUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.ToastUtil;

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
            public void OnSuccess(String tag, Object result) {

            }

            @Override
            public void OnError(String tag, String error) {

            }
        });
    };

    @Override
    public void getImageVerificationCode() {
        ImageVerification.requestImageVerification(mvpView,mvpView.registVerficationIv);
    }

    @Override
    public void nextStep() {
        if(EmptyUtil.isEmpty(mvpView.getUserName())){
            ToastUtil.toastDes(R.string.toast_input_username);
            return;
        }

        if(mvpView.getUserName().length() > Constants.USERNAME_LONGEST){
            ToastUtil.toastDes(R.string.toast_over_username_lenth);
            return;
        }

        if(EmptyUtil.isEmpty(mvpView.getMobile()) || (!PhoneNumUtil.checkPhoneNum(mvpView.getMobile()))){
            ToastUtil.toastDes(R.string.toast_input_effective_phonenum);
            mvpView.registPhone.requestFocus();
            mvpView.registPhone.setSelection(mvpView.getMobile().length());
            return;
        }

        if(EmptyUtil.isEmpty(mvpView.getCheckNum())){
            ToastUtil.toastDes(R.string.toast_input_verificate);
            return;
        }

//        registered1Model.requestRegist1NextStep(ApiUrl.BASE_URL + ApiUrl.REGISTER_FIRST);



    }


}
