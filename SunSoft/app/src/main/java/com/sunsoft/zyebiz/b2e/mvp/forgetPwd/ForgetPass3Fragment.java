package com.sunsoft.zyebiz.b2e.mvp.forgetPwd;

import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by Amoly.
 * Data：2017/2/9.
 */

public class ForgetPass3Fragment extends BaseFragment{
    private View forgetPass;
    private EditText mNew_password;
    private EditText mRe_password;
    private ImageButton mSee_password;
    private ImageButton mSee_password1;
    private TextView mComp_save;
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
                forgetPass = UIUtil.inflate(R.layout.fragment_forgetpass3);
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
        return commonPag;
    }

    @Override
    protected void initSubView() {
        mNew_password = (EditText) forgetPass.findViewById(R.id.new_password);
        mRe_password = (EditText) forgetPass.findViewById(R.id.re_password);
        mSee_password = (ImageButton) forgetPass.findViewById(R.id.see_set_password);
        mSee_password1 = (ImageButton) forgetPass.findViewById(R.id.is_see_password);
        mComp_save = (TextView) forgetPass.findViewById(R.id.common_text);
        mComp_save.setText(R.string.save);
    }

    @Override
    protected void initSubData() {

    }
}
