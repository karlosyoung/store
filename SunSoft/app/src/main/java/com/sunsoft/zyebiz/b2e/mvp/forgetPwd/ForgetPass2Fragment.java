package com.sunsoft.zyebiz.b2e.mvp.forgetPwd;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginActivity;
import com.sunsoft.zyebiz.b2e.utils.localUtil.TimeLimitUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/9.
 */

public class ForgetPass2Fragment extends BaseFragment implements View.OnClickListener{
    private View forgetPass;
    private TextView mPhone_number;
    private EditText mVerification_code;
    private Button mGet_code;
    private TextView mNext_step;
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
        final CommonPag commonPag = new CommonPag(getActivity()){

            @Override
            protected View onCreateSuccessedView() {
                forgetPass = UIUtil.inflate(R.layout.fragment_forgetpass2);
                initSubView();
                return forgetPass;
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
                midTitleTv.setText(R.string.forget_password_title);
            }

            @Override
            protected void initSubTitle() {
                initSubCommonTitle();
            }
        };
        return commonPag;
    }

    @Override
    protected void initSubView() {
        mPhone_number = (TextView) forgetPass.findViewById(R.id.edt_phone_number);
        mVerification_code = (EditText) forgetPass.findViewById(R.id.edt_forget_code);
        mGet_code = (Button) forgetPass.findViewById(R.id.forget_check_num);
        mNext_step = (TextView) forgetPass.findViewById(R.id.common_text);
        mNext_step.setText(R.string.next_step);

    }

    @Override
    protected void initSubData() {

    }

    @Override
    public void onClick(View v) {
        if(!TimeLimitUtil.isResponseClick()){
            return;
        }
        switch (v.getId()){
            case R.id.next_bt:
                ForgetPass3Fragment forgetPass3Fragment = new ForgetPass3Fragment();
                MyFragmentManager.addFragmentForBack(getActivity(),((LoginActivity)getActivity()).getBaseFrameLayoutId(),forgetPass3Fragment, Constants.FRAGMENT_FORGETPASS3_TAG);

        }
    }
}
