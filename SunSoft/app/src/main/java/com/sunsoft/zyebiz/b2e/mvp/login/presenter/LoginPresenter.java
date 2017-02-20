package com.sunsoft.zyebiz.b2e.mvp.login.presenter;


import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.api.ApiUrl;
import com.sunsoft.zyebiz.b2e.common.module.imageVerificationModule.ImageVerification;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.enity.net.LoginBean;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginContract;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginFragment;
import com.sunsoft.zyebiz.b2e.mvp.login.module.LoginModule;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.ToastUtil;

import java.util.HashMap;

/**
 * Created by MJX on 2017/1/9.
 *
 */
public class LoginPresenter extends BasePresenter<LoginFragment> implements LoginContract.ILoginPresenter {


    private LoginModule mLoginmodule;

    public LoginPresenter(LoginFragment view) {
       super(view);
    }


    @Override
    public void toLogin() {
        checkJumpView();
        HashMap<String,String> hashMap = getHashMap();
        hashMap.put("userName",mvpView.getUserName());
        hashMap.put("password",mvpView.getUserName());
        hashMap.put("validateCode",mvpView.getCheckNum());
        mLoginmodule.loginRequest(ApiUrl.LOGIN,hashMap);
    }

    @Override
    public void saveUserInfo() {

    }

    @Override
    public void refreshVerificationCode() {
        ImageVerification.requestImageVerification(mvpView,mvpView.mChecknum);
    }

    @Override
    public boolean checkJumpView() {
        if(EmptyUtil.isEmpty(mvpView.getUserName())){
            ToastUtil.toastDes(R.string.input_username);
            return false;
        }
        if (EmptyUtil.isEmpty(mvpView.getPassword())){
            ToastUtil.toastDes(R.string.login_phone_hint);
            return false;
        }
        // 验证码
        if(EmptyUtil.isEmpty(mvpView.getCheckNum())){
            ToastUtil.toastDes(R.string.enter_verification_code);
            return false;
        }
        return true;
    }


    @Override
    protected void createModel() {
        /*成功*//*失败*/
        mLoginmodule = new LoginModule(new ISecondaryCallBackData() {
            @Override
            public void OnSuccess(String tag, Object result) {
                LoginBean loginBean = (LoginBean)result;
//                if("0".equals(loginBean.getMsgCode())){ /*成功*/
//                }else if ("1".equals(loginBean.getMsgCode())){ /*失败*/
//                    ToastUtil.toastDes(loginBean.getObj().getTitle());
//                }

            }
            @Override
            public void OnError(String tag, String error) {

            }
        });
    }
}
