package com.sunsoft.zyebiz.b2e.mvp.login;

import android.view.View;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.FragmentManagement;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseActivity;

/**
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
        noNet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginFragment.commonPag.showErrorView();
            }
        });
        noData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginFragment.commonPag.showEmptyView();
            }
        });

        haveNet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginFragment.commonPag.showSuccessedView();
            }
        });
    }

    @Override
    protected void clearData() {

    }

    @Override
    protected void isFinishCurrentActivity() {

    }
}
