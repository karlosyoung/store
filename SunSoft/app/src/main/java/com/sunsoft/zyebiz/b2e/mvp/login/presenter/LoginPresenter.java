package com.sunsoft.zyebiz.b2e.mvp.login.presenter;

import android.view.View;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.module.imageVerificationModule.ImageVerification;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.login.BaseRequestBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginContract;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginFragment;
import com.sunsoft.zyebiz.b2e.mvp.login.module.LoginModel;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.PhoneUniqueUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.ToastUtil;

import java.util.HashMap;


/**
 * Created by MJX on 2017/1/9.
 *
 */
public class LoginPresenter extends BasePresenter<LoginFragment> implements LoginContract.ILoginPresenter {


    private LoginModel mLoginModule;
    private boolean validateCode = false;
    public LoginPresenter(LoginFragment view) {
        super(view);
    }

    @Override
    public void toLogin() {

        if (!checkJumpView()){
            return;
        }
        HashMap<String,String> hashMap = getHashMap();
        hashMap.put("userName",mvpView.getUserName());
        hashMap.put("password",mvpView.getPassword());
        hashMap.put("validateCode",mvpView.getCheckNum());
        hashMap.put("uniqueNo", PhoneUniqueUtil.getUniqueStr());    //通过获取手机唯一标识码确定输入三次错误后显示验证码
        mLoginModule.loginRequest(ApiUrl.LOGIN,hashMap);
    }

    @Override
    public void saveUserInfo() {

    }

    @Override
    public boolean refreshVerificationCode() {
        mvpView.mLogin_et_checknum.setText("");
        mvpView.mVerification_rl.setVisibility(View.VISIBLE);
        ImageVerification.requestImageVerification(mvpView,mvpView.mChecknum);
        validateCode = true;
        return true;
    }
    @Override
    public boolean checkJumpView() {
        if(EmptyUtil.isEmpty(mvpView.getUserName())){
//            ToastUtil.toastDes(R.string.input_username);
            return false;
        }
        if (EmptyUtil.isEmpty(mvpView.getPassword())){
//            ToastUtil.toastDes(R.string.login_phone_hint);
            return false;
        }
        if(validateCode){
            if (EmptyUtil.isEmpty(mvpView.getCheckNum())){
                ToastUtil.toastDes(R.string.toast_input_verificate);
                return false;
            }
        }
        return true;
    }


    @Override
    protected void createModel() {
        /*成功*//*失败*/
        mLoginModule = new LoginModel(new ISecondaryCallBackData() {
            @Override
            public void OnSuccess(String tag, Object result) {
                BaseRequestBean baseRequestBean = (BaseRequestBean)result;
                int count = 2;
                if("0".equals(baseRequestBean.getMsgCode())){                          /*成功*/

                }else if ("1".equals(baseRequestBean.getMsgCode())&&--count == 1) {       /*失败*/
                    ToastUtil.toastDes(baseRequestBean.getObj().getMessage());
                }
                if ("3".equals(baseRequestBean.getMsgCode())) {
                    ToastUtil.toastDes(baseRequestBean.getObj().getMessage());
                    refreshVerificationCode();
                }
            }
            @Override
            public void OnError(String tag, String error) {
            }
        });
    }
}
