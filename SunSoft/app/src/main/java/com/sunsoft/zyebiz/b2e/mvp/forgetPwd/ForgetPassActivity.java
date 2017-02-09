package com.sunsoft.zyebiz.b2e.mvp.forgetPwd;

import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseActivity;

/**
 * Created by Amoly.
 * Data：2017/2/8.
 */
public class ForgetPassActivity extends BaseActivity{
    @Override
    protected void initFragment() {
        ForgetPassFragment forgetPassFragment = new ForgetPassFragment();
        MyFragmentManager.addFragmentNoBack(this,getBaseFrameLayoutId(),forgetPassFragment, Constants.FRAGMENT_FORGETPASS_TAG);
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
