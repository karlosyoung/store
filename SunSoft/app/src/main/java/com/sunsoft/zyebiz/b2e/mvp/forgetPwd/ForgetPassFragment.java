package com.sunsoft.zyebiz.b2e.mvp.forgetPwd;

import android.view.View;
import android.widget.EditText;
import android.widget.RelativeLayout;
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

public class ForgetPassFragment extends BaseFragment implements View.OnClickListener{

    private View forgetPass;
    private EditText mInput_username;
    private RelativeLayout mNext_bt;
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
                forgetPass = UIUtil.inflate(R.layout.fragment_forgetpass1);
                initSubView();
                return forgetPass;
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

    private void initSubView() {
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
    public void onClick(View v) {
        if(!TimeLimitUtil.isResponseClick()){
            return;
        }
        switch (v.getId()){
            case R.id.next_bt:
                ForgetPass2Fragment forgetPass2Fragment = new ForgetPass2Fragment();
                MyFragmentManager.addFragmentForBack(getActivity(),((LoginActivity)getActivity()).getBaseFrameLayoutId(),forgetPass2Fragment, Constants.FRAGMENT_FORGETPASS2_TAG);

        }
    }
}
