package com.sunsoft.zyebiz.b2e.mvp.login;

import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseActivity;

/**
 * 登录的界面
 * Created by MJX on 2017/1/17.
 */
public class LoginActivity extends BaseActivity {
    @Override
    protected void initFragment() {
        LoginFragment loginFragment = new LoginFragment();
        MyFragmentManager.addFragmentNoBack(this,getBaseFrameLayoutId(),loginFragment,Constants.FRAGMENT_LOGIN_TAG);
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
}
