package com.sunsoft.zyebiz.b2e.mvp.registered.presenter;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.module.phoneVerificationModule.CountDownButtonHelper;
import com.sunsoft.zyebiz.b2e.common.module.phoneVerificationModule.ITimeOut;
import com.sunsoft.zyebiz.b2e.common.module.phoneVerificationModule.MonitorTime;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.registered.registered2.VerificationCodeBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegistContract;
import com.sunsoft.zyebiz.b2e.mvp.registered.Registered2Fragment;
import com.sunsoft.zyebiz.b2e.mvp.registered.model.Registered2Model;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.PasswordRuleUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.ToastUtil;

import java.util.HashMap;

/**
 * 注册2页处理
 * Created by MJX on 2017/2/10.
 */
public class Registered2Presenter extends BasePresenter<Registered2Fragment> implements RegistContract.IRegist2Presenter {
    private Registered2Model registered2Model;
    //短信验证码
    private String smsVerificationCode = null;
    //短信验证码时间是否超时
    private boolean isTimeOut = false;
    public Registered2Presenter(Registered2Fragment mvpView) {
        super(mvpView);
    }

    @Override
    protected void createModel() {
       registered2Model = new Registered2Model(new ISecondaryCallBackData() {
            @Override
            public void OnSuccess(String tag, Object result) {
                  VerificationCodeBean verficationCodeBean = (VerificationCodeBean)result;
                  smsVerificationCode = verficationCodeBean.getObj().getBody();
            }

            @Override
            public void OnError(String tag, String error) {

            }
        });
    }

    @Override
    public void getMobileNum() {
        MonitorTime.stopMonitorTime();
        MonitorTime.startMonitorTime(new ITimeOut() {
            @Override
            public void noticeTimeOut() {

            }
        });

        CountDownButtonHelper countDownButtonHelper = new CountDownButtonHelper(mvpView.getChangePhoneVerficationTv(), "", 60, 1);
        countDownButtonHelper.setOnFinishListener(new CountDownButtonHelper.OnFinishListener() {
            @Override
            public void finish() {
               mvpView.getChangePhoneVerficationTv().setText(mvpView.getActivity().getString(R.string.reacquire));
            }
        });
        HashMap<String, String> hashMap = getHashMap();
        hashMap.put("mobile",mvpView.getMobileNum());
        hashMap.put("type","0");
        registered2Model.requestPhoneVerificationCode(ApiUrl.Get_SMS,hashMap);
    }

    @Override
    public void nextStep(String smsCode, String setPassword, String confirmPassword,String username) {
        //验证码是否超时
        if(isTimeOut){
            ToastUtil.toastDes(R.string.toast_verificate_code_failure);
            return;
        }

        if(EmptyUtil.isEmpty(smsCode)){
            ToastUtil.toastDes(R.string.toast_input_verificate);
            return;
        }

        if(EmptyUtil.isEmpty(smsVerificationCode)){
            ToastUtil.toastDes(R.string.toast_get_verificate_code);
            return;
        }

        if(!smsVerificationCode.equals(smsCode)){
            ToastUtil.toastDes(R.string.toast_input_correct_verificate_code);
            return;
        }

        if(EmptyUtil.isEmpty(setPassword)){
            ToastUtil.toastDes(R.string.toast_null_correct_verificate_code);
            mvpView.getSetPasswordEt().requestFocus();
            mvpView.getSetPasswordEt().requestFocusFromTouch();
            return;
        }

        //密码新规则
        if(!PasswordRuleUtil.checkSpecialCharacter(setPassword)){
            ToastUtil.toastDes("请使用数字、字母及以下字符!@#$%^&*()_");
            mvpView.getSetPasswordEt().requestFocus();
            mvpView.getSetPasswordEt().requestFocusFromTouch();
        }

        //密码新规则
        if(!PasswordRuleUtil.checkSpecialCharacter(confirmPassword)){
            ToastUtil.toastDes("请使用数字、字母及以下字符!@#$%^&*()_");
            mvpView.getConfirmPasswordEt().requestFocus();
            mvpView.getConfirmPasswordEt().requestFocusFromTouch();
            return;
        }

        if(setPassword.length() < Constants.SHORTEST_PASSWORD || setPassword.length() > Constants.LONGEST_PASSWORD){
            ToastUtil.toastDes(R.string.toast_password_rule1);
            mvpView.getSetPasswordEt().requestFocus();
            mvpView.getSetPasswordEt().requestFocusFromTouch();
            return;
        }

        if(confirmPassword.length() < Constants.SHORTEST_PASSWORD || confirmPassword.length() > Constants.LONGEST_PASSWORD){
            ToastUtil.toastDes(R.string.toast_password_rule1);
            mvpView.getConfirmPasswordEt().requestFocus();
            mvpView.getConfirmPasswordEt().requestFocusFromTouch();
            return;
        }

        if(!PasswordRuleUtil.checkPasswordRule(setPassword)){
            mvpView.getSetPasswordEt().requestFocus();
            mvpView.getSetPasswordEt().requestFocusFromTouch();
            ToastUtil.toastDes(R.string.toast_password_rule2);
            return;
        }

        if(!PasswordRuleUtil.checkPasswordRule(confirmPassword)){
            mvpView.getConfirmPasswordEt().requestFocus();
            mvpView.getConfirmPasswordEt().requestFocusFromTouch();
            ToastUtil.toastDes(R.string.toast_password_rule2);
            return;
        }

        if(!setPassword.equals(confirmPassword)){
            ToastUtil.toastDes(R.string.toast_diff_password);
            mvpView.getSetPasswordEt().requestFocus();
            mvpView.getSetPasswordEt().requestFocusFromTouch();
            return;
        }

        if(username.equals(setPassword)){
           ToastUtil.toastDes(R.string.toast_diff_password_and_username);
            mvpView.getSetPasswordEt().requestFocus();
            mvpView.getSetPasswordEt().requestFocusFromTouch();
            return;
        }

        mvpView.jumpNextStep();
    }
}
