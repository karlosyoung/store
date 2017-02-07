package com.sunsoft.zyebiz.b2e.mvp.login;

import android.view.View;
import android.widget.Button;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/7.
 */

public class LoginFragment extends BaseFragment {

    private View mLoginView;
    private View mViewById;

    @Override
    protected void clearData() {

    }

    @Override
    protected void unBindPresent() {

    }

    @Override
    protected void setCurrentName() {

    }

    @Override
    protected void bindPresent() {

    }

    @Override
    protected View onSubView() {
        CommonPag commonPag = new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {
                mLoginView = UIUtil.inflate(R.layout.fragment_login);
                initSubView();
                return mLoginView;
            }

            @Override
            public void loadAgain() {

            }

            @Override
            protected void leftBackTo() {

            }

            @Override
            protected void rightBackTo() {

            }

            @Override
            protected void setMidText() {
                midTitleTv.setText("登录");
            }

            @Override
            protected void initSubTitle() {

            }
        };
        return commonPag;
    }

    private void initSubView() {
       View mUsename = (View) mLoginView.findViewById(R.id.username_layout);
       Button mBt_usename_clear = (Button) mLoginView.findViewById(R.id.bt_username_clear);


    }


    @Override
    protected void initSubData() {

    }
}
