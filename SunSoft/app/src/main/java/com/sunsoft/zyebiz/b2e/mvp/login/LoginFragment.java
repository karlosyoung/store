package com.sunsoft.zyebiz.b2e.mvp.login;

import android.content.Intent;
import android.text.InputFilter;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.ForgetPassActivity;
import com.sunsoft.zyebiz.b2e.mvp.login.presenter.LoginPresenter;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegisteredActivity;
import com.sunsoft.zyebiz.b2e.utils.localUtil.CloseKeyBoard;
import com.sunsoft.zyebiz.b2e.utils.localUtil.StringUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.TimeLimitUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/7.
 */

public class LoginFragment extends BaseFragment implements LoginContract.ILoginView, View.OnClickListener {

    private View mLoginView;
    private ImageButton mImg_pass_show;
    private FrameLayout mUsename_layout;
    private EditText mUsename;
    private FrameLayout mPwd_layout;
    private EditText mEdt_passwd;
    public Button mTv_login;
    private TextView mTv_register;
    private TextView mForget_pas;
    private Button mLogin_change;
    public ImageView mChecknum;
    public EditText mLogin_et_checknum;
    private LoginPresenter mLoginPresenter;
    public String mEditUser;
    public String mPassword;
    public RelativeLayout mVerification_rl;


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
        mLoginPresenter = new LoginPresenter(this);
    }

    @Override
    protected View onSubView() {
        final CommonPag commonPag = new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {
                mLoginView = UIUtil.inflate(R.layout.fragment_login);
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
                initSubNoBackTitle();
            }
        };
        commonPag.showSuccessedView();
        return commonPag;
    }

    @Override
    protected void initSubView() {
        mUsename_layout = (FrameLayout) mLoginView.findViewById(R.id.username_layout);
        mUsename = (EditText) mLoginView.findViewById(R.id.username);                           //用户名
        mPwd_layout = (FrameLayout) mLoginView.findViewById(R.id.pwd_layout);
        mEdt_passwd = (EditText) mLoginView.findViewById(R.id.edt_passwd);                      //密码输入
        mTv_login = (Button) mLoginView.findViewById(R.id.tv_login);                            //输入
        mTv_register = (TextView) mLoginView.findViewById(R.id.tv_register);                    //注册
        mForget_pas = (TextView) mLoginView.findViewById(R.id.forget_pas);
        mLogin_change = (Button) mLoginView.findViewById(R.id.login_bt_change);
        mVerification_rl = (RelativeLayout) mLoginView.findViewById(R.id.login_rl_checknum);
        mChecknum = (ImageView) mLoginView.findViewById(R.id.login_iv_checknum);                //显示验证码
        mLogin_et_checknum = (EditText) mLoginView.findViewById(R.id.login_et_checknum);        //获取验证码


        // 用户名验证
        mUsename.setFilters(new InputFilter[] { StringUtil.getNameFilter(), new InputFilter.LengthFilter(30) });
        // 密码检测验证
        mEdt_passwd.setFilters(new InputFilter[]{StringUtil.stringFilter(), new InputFilter.LengthFilter(18)});

        mEdt_passwd.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    //去登录
                    jumpToLogin();
                }
                return false;
            }
        });

        mTv_login.setOnClickListener(this);                 //登录
        mTv_register.setOnClickListener(this);              //注册
        mForget_pas.setOnClickListener(this);               //忘记密码
        mLogin_change.setOnClickListener(this);             //切换验证码
    }


    @Override
    protected void initSubData() {
    }

    @Override
    public void onClick(View v) {
        if (TimeLimitUtil.isFastClick()) {
            return;
        }
        switch (v.getId()) {
            case R.id.tv_login:
                jumpToLogin();
                break;
            case R.id.tv_register:
                jumpToRegister();                   //跳转到注册页面
                break;
            case R.id.forget_pas:
                jumpToForgetPassword();            //跳转到忘记密码页面
                break;
            case R.id.login_bt_change:
            case R.id.login_iv_checknum:            //获取验证码
                mLoginPresenter.refreshVerificationCode();
                break;
        }
    }

    private void jumpToLogin() {
        CloseKeyBoard.hideInputMethod(getActivity());
        mLoginPresenter.toLogin();
    }

    /***
     * 跳转注册页面
     */
    public void jumpToRegister() {
        startActivity(new Intent(getActivity(), RegisteredActivity.class));
    }

    /***
     * 跳转忘记密码页面
     */
    private void jumpToForgetPassword() {
        Intent intent = new Intent(getActivity(), ForgetPassActivity.class);
        intent.putExtra(Constants.DEFAULT_TITLE_KEY, R.string.forget_psd);
        startActivity(intent);
    }


    @Override
    public String getUserName() {
        mEditUser = mUsename.getText().toString().trim();
        return mEditUser;
    }

    @Override
    public String getPassword() {
        mPassword = mEdt_passwd.getText().toString().trim();
        return mPassword;
    }

    @Override
    public String getCheckNum() {
        return mLogin_et_checknum.getText().toString();
    }


}
