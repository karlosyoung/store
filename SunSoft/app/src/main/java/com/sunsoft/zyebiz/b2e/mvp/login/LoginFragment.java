package com.sunsoft.zyebiz.b2e.mvp.login;

import android.content.Intent;
import android.text.Editable;
import android.text.InputType;
import android.text.Selection;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.ForgetPassActivity;
import com.sunsoft.zyebiz.b2e.mvp.login.presenter.LoginPresenter;
import com.sunsoft.zyebiz.b2e.mvp.registered.RegisteredActivity;
import com.sunsoft.zyebiz.b2e.utils.localUtil.CloseKeyBoard;
import com.sunsoft.zyebiz.b2e.utils.localUtil.TimeLimitUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/7.
 */

public class LoginFragment extends BaseFragment implements LoginContract.ILoginView,View.OnClickListener{

    private View mLoginView;
    private ImageButton mImg_pass_show;
    private FrameLayout mUsename_layout;
    private ImageButton mBt_usename_clear;
    private EditText mUsename;
    private FrameLayout mPwd_layout;
    private EditText mEdt_passwd;
    private Button mTv_login;
    private TextView mTv_register;
    private TextView mForget_pas;
    private Button mLogin_change;
    public ImageView mChecknum;
    private EditText mLogin_et_checknum;
    private LoginPresenter mLoginPresenter;
    private String userName;
    private String password;


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
        mBt_usename_clear = (ImageButton) mLoginView.findViewById(R.id.bt_username_clear);
        mUsename = (EditText) mLoginView.findViewById(R.id.username);
        mPwd_layout = (FrameLayout) mLoginView.findViewById(R.id.pwd_layout);
        mImg_pass_show = (ImageButton) mLoginView.findViewById(R.id.img_pass_show);
        mEdt_passwd = (EditText) mLoginView.findViewById(R.id.edt_passwd);      // 密码输入
        mTv_login = (Button) mLoginView.findViewById(R.id.tv_login);
        mTv_register = (TextView) mLoginView.findViewById(R.id.tv_register);
        mForget_pas = (TextView) mLoginView.findViewById(R.id.forget_pas);
        mLogin_change = (Button) mLoginView.findViewById(R.id.login_bt_change);
        mChecknum = (ImageView) mLoginView.findViewById(R.id.login_iv_checknum);
        mLogin_et_checknum = (EditText) mLoginView.findViewById(R.id.login_et_checknum);

        mTv_login.setOnClickListener(this);                 //登录
        mTv_register.setOnClickListener(this);              //注册
        mBt_usename_clear.setOnClickListener(this);         //清除账户
        mImg_pass_show.setOnClickListener(this);            // 显示密码
        mForget_pas.setOnClickListener(this);               //忘记密码
        mLogin_change.setOnClickListener(this);             //切换验证码
    }


    @Override
    protected void initSubData() {
//        String editUser = mUsename.getText().toString();
//        String editName = mEdt_passwd.getText().toString();
//        mUsename.setText(StringUtil.replaceBlank(editUser));
        //密码检测验证
//        mEdt_passwd.setFilters(new InputFilter[] {StringUtil.stringFilter(), new InputFilter.LengthFilter(18)});

//        mEdt_passwd.setOnEditorActionListener(new TextView.OnEditorActionListener() {
//            @Override
//            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
//                if (actionId == EditorInfo.IME_ACTION_DONE) {
//                    //去登录
//                    gotoLogin();
//                }
//
//                return false;
//            }
//        });


    }



    private void setPwdInputType() {
        int type = mEdt_passwd.getInputType();
        setPwdImgGone(type == InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
        Editable etable = mEdt_passwd.getText();
        Selection.setSelection(etable, etable.length());
    }

    private void setPwdImgGone(boolean flag) {
        setPwdGone(flag, flag);

    }

    private void setPwdGone(boolean flag, boolean isPwdShow) {
        mImg_pass_show.setImageResource(isPwdShow?R.drawable.auxiliary_view_normal:R.drawable.auxiliary_view_open);
        if (flag) {
            mEdt_passwd.setInputType(InputType.TYPE_CLASS_TEXT
                    | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        } else {
            mEdt_passwd.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
        }
    }


    @Override
    public void onClick(View v) {
        if (TimeLimitUtil.isResponseClick()){
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
                jumpToForgetpassword();            //跳转到忘记密码页面
                break;

            case R.id.img_pass_show:
                if (TextUtils.isEmpty(mEdt_passwd.getText())) {
                    return;
                }
                setPwdInputType();
                break;
            case R.id.login_bt_change:
            case R.id.login_iv_checknum:
                mLoginPresenter.refreshVerificationCode();
            case R.id.bt_username_clear:
                mUsename.setText("");
        }
    }

    private void jumpToLogin() {
        CloseKeyBoard.hideInputMethod(getActivity());

        mLoginPresenter.login(userName,password);
    }
    /***
     * 跳转注册页面
     */
    private void jumpToRegister(){
        startActivity(new Intent(getActivity(), RegisteredActivity.class));
    }
    /***
     * 跳转忘记密码页面
     */
    private void jumpToForgetpassword() {
        Intent intent = new Intent(getActivity(), ForgetPassActivity.class);
        intent.putExtra(Constants.DEFAULT_TITLE_KEY, R.string.forget_psd);
        startActivity(intent);
    }


    @Override
    public String getUserName() {
      return mUsename.getText().toString().trim();
    }

    @Override
    public String getPassword() {
        return mEdt_passwd.getText().toString().trim();
    }

    @Override
    public String getCheckNum() {
          return mLogin_et_checknum.getText().toString().trim();
    }

}
