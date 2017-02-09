package com.sunsoft.zyebiz.b2e.mvp.registered;

import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseActivity;

/**
 * 注册
 * Created by MJX on 2017/2/7.
 */
public class RegisteredActivity extends BaseActivity{
    @Override
    protected void initFragment() {
        Registered1Fragment registered1Fragment = new Registered1Fragment();
        MyFragmentManager.addFragmentNoBack(this,getBaseFrameLayoutId(),registered1Fragment, Constants.FRAGMENT_REGISTERED1_TAG);
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
