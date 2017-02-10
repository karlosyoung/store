package com.sunsoft.zyebiz.b2e.mvp.login.presenter;


import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.module.imageVerificationModule.ImageVerification;
import com.sunsoft.zyebiz.b2e.common.net.http.ISecondaryCallBackData;
import com.sunsoft.zyebiz.b2e.data.GetSpInsance;
import com.sunsoft.zyebiz.b2e.mvp.base.BasePresenter;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginContract;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginFragment;
import com.sunsoft.zyebiz.b2e.mvp.login.module.LoginModule;
import com.sunsoft.zyebiz.b2e.utils.localUtil.EmptyUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.ToastUtil;

import static android.content.Context.MODE_PRIVATE;

/**
 * Created by MJX on 2017/1/9.
 *
 */
public class LoginPresenter  extends BasePresenter<LoginFragment> implements LoginContract.ILoginPresenter {


    public LoginPresenter(LoginFragment view) {
       super(view);
    }

    @Override
    public void login(final String userName, final String password) {

        LoginModule loginmodule = new LoginModule(new ISecondaryCallBackData() {
            @Override
            public void OnSuccess(String tag, Object result) {
                GetSpInsance.saveSp(userName, Constants.LOGIN_TYPE_KEY,MODE_PRIVATE);

            }

            @Override
            public void OnError(String tag, String error) {

            }
        });

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

    }
}
