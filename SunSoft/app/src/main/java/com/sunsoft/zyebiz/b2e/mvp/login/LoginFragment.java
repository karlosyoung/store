package com.sunsoft.zyebiz.b2e.mvp.login;

import android.text.InputFilter;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.StringUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/7.
 */

public class LoginFragment extends BaseFragment {

    private View mLoginView;
    private Button mButton;
    private FrameLayout mUsename_layout;
    private Button mBt_usename_clear;
    private EditText mUsename;
    private FrameLayout mPwd_layout;
    private EditText mEdt_passwd;
    private Button mTv_login;
    private TextView mTv_register;
    private TextView mForget_pas;
    private Button mLogin_change;
    private ImageView mChecknum;
    private EditText mLogin_et_checknum;

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
        final CommonPag commonPag = new CommonPag(getActivity()) {
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
            }

            @Override
            protected void initSubTitle() {
                midTitleTv.setText("登录");
            }
        };
        commonPag.showSuccessedView();
        return commonPag;
    }

    private void initSubView() {
        mUsename_layout = (FrameLayout) mLoginView.findViewById(R.id.username_layout);
        mBt_usename_clear = (Button) mLoginView.findViewById(R.id.bt_username_clear);
        mUsename = (EditText) mLoginView.findViewById(R.id.username);
        mPwd_layout = (FrameLayout) mLoginView.findViewById(R.id.pwd_layout);
        mButton = (Button) mLoginView.findViewById(R.id.img_pass_show);
        mEdt_passwd = (EditText) mLoginView.findViewById(R.id.edt_passwd);
        mTv_login = (Button) mLoginView.findViewById(R.id.tv_login);
        mTv_register = (TextView) mLoginView.findViewById(R.id.tv_register);
        mForget_pas = (TextView) mLoginView.findViewById(R.id.forget_pas);
        mLogin_change = (Button) mLoginView.findViewById(R.id.login_bt_change);
        mChecknum = (ImageView) mLoginView.findViewById(R.id.login_iv_checknum);
        mLogin_et_checknum = (EditText) mLoginView.findViewById(R.id.login_et_checknum);
    }


    @Override
    protected void initSubData() {
        String editUser = mUsename.getText().toString();
        String editName = mEdt_passwd.getText().toString();
        mUsename.setText(StringUtil.replaceBlank(editUser));
        mEdt_passwd.setFilters(new InputFilter[] {StringUtil.stringFilter(), new InputFilter.LengthFilter(18)});

        mEdt_passwd.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    //去登录
                    gotoLogin();
                }

                return false;
            }
        });

    }

    private void gotoLogin() {

    }

}
