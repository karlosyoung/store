package com.sunsoft.zyebiz.b2e.mvp.registered;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.mvp.registered.presenter.Registered2Presenter;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 注册2页
 * Created by MJX on 2017/2/8.
 */
public class Registered2Fragment extends BaseFragment implements RegistContract.IRegist2View,View.OnClickListener{
    private View registered2View;
    private TextView phoneNumTv;
    private EditText phoneVerficationEt;

    public TextView getChangePhoneVerficationTv() {
        return changePhoneVerficationTv;
    }

    private TextView changePhoneVerficationTv;
    private EditText setPasswordEt;
    private Registered2Presenter registered2Presenter;

    public EditText getPhoneVerficationEt() {
        return phoneVerficationEt;
    }

    public EditText getSetPasswordEt() {
        return setPasswordEt;
    }

    public EditText getConfirmPasswordEt() {
        return confirmPasswordEt;
    }

    private ImageView isSeeSetPasswordIv;
    private EditText confirmPasswordEt;
    private ImageView isSeeConfirmPasswordIv;
    private RelativeLayout nextStep;
    private String username;
    private String mobilePhoneNum;

    @Override
    protected void clearData() {

    }

    @Override
    protected void unBindPresent() {
        registered2Presenter = null;
    }

    @Override
    protected void setCurrentName() {

    }

    @Override
    protected void bindPresent() {
        registered2Presenter = new Registered2Presenter(this);
    }

    @Override
    protected View onSubView() {
        CommonPag commonPag = new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {
                registered2View = UIUtil.inflate(R.layout.fragment_registered2);
                return registered2View;
            }

            @Override
            public void loadAgain() {

            }

            @Override
            protected void leftBackTo() {
                getFragmentManager().popBackStackImmediate();
            }

            @Override
            protected void rightBackTo() {

            }

            @Override
            protected void setMidText() {
                midTitleTv.setText(R.string.register);
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
        phoneNumTv = (TextView) registered2View.findViewById(R.id.phone_number_tv);
        phoneVerficationEt = (EditText) registered2View.findViewById(R.id.regist_phone_verfication_et);
        changePhoneVerficationTv = (TextView) registered2View.findViewById(R.id.change_phone_verfication);
        setPasswordEt = (EditText) registered2View.findViewById(R.id.set_password_et);
        isSeeSetPasswordIv = (ImageView) registered2View.findViewById(R.id.is_see_set_password_iv);
        confirmPasswordEt = (EditText) registered2View.findViewById(R.id.confrim_password_et);
        isSeeConfirmPasswordIv = (ImageView) registered2View.findViewById(R.id.is_see_confirm_password_iv);
        nextStep = (RelativeLayout) registered2View.findViewById(R.id.next_bt);
        nextStep.setOnClickListener(this);
        changePhoneVerficationTv.setOnClickListener(this);
        isSeeSetPasswordIv.setOnClickListener(this);
        isSeeConfirmPasswordIv.setOnClickListener(this);
    }

    @Override
    protected void initSubData() {
        username = getArguments().getString("username");
        mobilePhoneNum = getArguments().getString("phoneNum");
        registered2Presenter.getMobileNum();
    }



    @Override
    public String getPassword() {
        return setPasswordEt.getText().toString();
    }

    @Override
    public String getSurePassword() {
        return confirmPasswordEt.getText().toString();
    }

    @Override
    public String getMobileNum() {
        return mobilePhoneNum;
    }

    @Override
    public String getVerificationNum() {
        return phoneVerficationEt.getText().toString();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.change_phone_verfication:
                break;
            case R.id.next_bt:
                registered2Presenter.nextStep(getVerificationNum(),getPassword(),getSurePassword(),username);
                break;
        }
    }

    /**
     * 跳转到下一页
     */
    public void jumpNextStep(){
        Registered3Fragment registered3Fragment = new Registered3Fragment();
        Bundle bundle = new Bundle();
        bundle.putString("username",username);
        bundle.putString("password",getPassword());
        bundle.putString("mobilePhone",mobilePhoneNum);
        registered3Fragment.setArguments(bundle);
        MyFragmentManager.addFragmentForBack(getActivity(),((RegisteredActivity)getActivity()).getBaseFrameLayoutId(),registered3Fragment, Constants.FRAGMENT_REGISTERED3_TAG);
    }
}
