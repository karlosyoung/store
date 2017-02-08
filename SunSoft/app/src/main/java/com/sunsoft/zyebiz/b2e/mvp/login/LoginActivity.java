package com.sunsoft.zyebiz.b2e.mvp.login;

import android.content.Intent;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseActivity;
import com.sunsoft.zyebiz.b2e.mvp.login.ForgetPwd.ForgetPassActivity;

/**
 * 登录的界面
 * Created by MJX on 2017/1/17.
 */
public class LoginActivity extends BaseActivity {
    @Override
    protected void initFragment() {
        LoginFragment loginFragment = new LoginFragment();
        MyFragmentManager.addFragmentNoBack(this,getBaseFrameLayoutId(),loginFragment,"loginFragment");
    }

    @Override
    protected void handleActivityKilledException() {

    }

    @Override
    protected void initSubData() {

    }

    @Override
    protected void clearData() {

    }

    @Override
    protected void isFinishCurrentActivity() {

    }
    /***
     * 跳转忘记密码页面
     */
    private void gotoForgetPwd() {
        Intent intent = new Intent(LoginActivity.this, ForgetPassActivity.class);
        intent.putExtra(Constants.DEFAULT_TITLE_KEY, R.string.forget_psd);
        intentTo(intent, false);
    }
}
