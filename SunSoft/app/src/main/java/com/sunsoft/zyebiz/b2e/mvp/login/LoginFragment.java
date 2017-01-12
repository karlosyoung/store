package com.sunsoft.zyebiz.b2e.mvp.login;

import android.view.View;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 登录的Fragment
 * Created by MJX on 2017/1/11.
 */
public class LoginFragment extends BaseFragment  {



    @Override
    protected View initSubSuccedView() {
        View mView = UIUtil.inflate(R.layout.fragment_login);
        return mView;
    }

}
