package com.sunsoft.zyebiz.b2e.mvp.login;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.FragmentManagement;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseActivity;

/**
 * 登录的Activity
 * Created by MJX on 2017/1/9.
 */
public class LoginActivity extends BaseActivity{

    @Override
    protected void handleActivityKilledException() {

    }

    @Override
    protected void initSubView() {
        final LoginFragment loginFragment = new LoginFragment();
        FragmentManagement.addFragmentNoBack(this,getBaseFragmeLayout(),loginFragment, Constants.FRAGMENT_LOGIN_TAG);

    }

    @Override
    protected void clearData() {

    }

    @Override
    protected void isFinishCurrentActivity() {

    }
}
