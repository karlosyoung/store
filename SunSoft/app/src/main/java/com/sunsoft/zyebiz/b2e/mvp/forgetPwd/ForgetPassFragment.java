package com.sunsoft.zyebiz.b2e.mvp.forgetPwd;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;
import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.mvp.forgetPwd.presenter.ForgetPass1presenter;
import com.sunsoft.zyebiz.b2e.utils.localUtil.TimeLimitUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/9.
 */

public class ForgetPassFragment extends BaseFragment implements ForgetPasswordContract.IForgetPassView,View.OnClickListener{

    private View forgetPass;
    private EditText mInput_username;
    private RelativeLayout mNext_bt;
    private TextView mNext_step;
    private ForgetPass1presenter mForgetpresenter;
//    public String mEditUser;

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
        mForgetpresenter = new ForgetPass1presenter(this);
    }

    @Override
    protected View onSubView() {
        final CommonPag commonPag = new CommonPag(getActivity()){

            @Override
            protected View onCreateSuccessedView() {
                forgetPass = UIUtil.inflate(R.layout.fragment_forgetpass1);
                return forgetPass;
            }

            @Override
            public void loadAgain() {

            }

            @Override
            protected void leftBackTo() {
                AppManager.getAppManager().finishActivity(getActivity());
            }

            @Override
            protected void rightBackTo() {

            }

            @Override
            protected void setMidText() {
                midTitleTv.setText(R.string.forget_password_title);
            }

            @Override
            protected void initSubTitle() {
                initSubCommonTitle();
            }
        };
        commonPag.showSuccessedView();
        return commonPag;
    }

    @Override
    protected void initSubView() {
        mInput_username = (EditText) forgetPass.findViewById(R.id.input_username);
        mNext_step = (TextView) forgetPass.findViewById(R.id.common_text);
        mNext_bt = (RelativeLayout) forgetPass.findViewById(R.id.next_bt);
        mNext_step.setText(R.string.next_step);
        mNext_bt.setOnClickListener(this);
    }

    @Override
    protected void initSubData() {

    }

    @Override
    public String getUserName() {
        return  mInput_username.getText().toString();

    }

    @Override
    public void onClick(View v) {
        if(TimeLimitUtil.isFastClick()){
            return;
        }
        switch (v.getId()){
            case R.id.next_bt:
//                ForgetPass2Fragment forgetPass2Fragment = new ForgetPass2Fragment();
//                MyFragmentManager.addFragmentForBack(getActivity(),((LoginActivity)getActivity()).getBaseFrameLayoutId(),forgetPass2Fragment, Constants.FRAGMENT_FORGETPASS2_TAG);
                mForgetpresenter.nextStep();
            break;
        }
    }

    public void jumpToNext(String userName, String mobilePhone, String token) {
        ForgetPass2Fragment forgetpass2fragment = new ForgetPass2Fragment();
        Bundle bundle = new Bundle();
        bundle.putString("username",userName);
        bundle.putString("mobilePhone",mobilePhone);
        bundle.putString("token",token);
        forgetpass2fragment.setArguments(bundle);
        MyFragmentManager.addFragmentForBack(getActivity(),((ForgetPassActivity)getActivity()).getBaseFrameLayoutId(),forgetpass2fragment, Constants.FRAGMENT_FORGETPASS2_TAG);
    }

}
