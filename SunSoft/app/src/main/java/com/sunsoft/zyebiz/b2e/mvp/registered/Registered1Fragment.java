package com.sunsoft.zyebiz.b2e.mvp.registered;

import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;
import com.sunsoft.zyebiz.b2e.common.Manager.MyFragmentManager;
import com.sunsoft.zyebiz.b2e.common.constants.Constants;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.TimeLimitUtil;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 注册1页
 * Created by MJX on 2017/2/7.
 */
public class Registered1Fragment extends BaseFragment implements RegistContract.IRegist1View,View.OnClickListener{
    private View regist1View;
    private EditText registUserName;
    private EditText registPhone;
    private EditText registVerficationEt;
    private ImageView registVerficationIv;
    private TextView registChangeVerfica;
    private RelativeLayout registNext;
    private TextView registTv;

    @Override
    protected void clearData() {

    }

    @Override
    protected void unBindPresent() {

    }

    @Override
    protected void setCurrentName() {
        currentNmae = "注册1页";
    }

    @Override
    protected void bindPresent() {

    }

    @Override
    protected View onSubView() {
      CommonPag commonPag =  new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {
                regist1View = UIUtil.inflate(R.layout.fragment_registered1);
                initSubView();
                return regist1View;
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

    private void initSubView() {
        registUserName = (EditText) regist1View.findViewById(R.id.regist_userName);
        registPhone = (EditText) regist1View.findViewById(R.id.regist_phonenumber);
        registVerficationEt = (EditText) regist1View.findViewById(R.id.regist_verfication_et);
        registVerficationIv = (ImageView) regist1View.findViewById(R.id.verification_code_image);
        registChangeVerfica = (TextView) regist1View.findViewById(R.id.change_verfication_pic);
        registNext = (RelativeLayout) regist1View.findViewById(R.id.next_bt);
        registTv = (TextView) regist1View.findViewById(R.id.common_text);
        registTv.setText(getString(R.string.next_step));
        registNext.setOnClickListener(this);
        registChangeVerfica.setOnClickListener(this);
        registVerficationIv.setOnClickListener(this);
    }

    @Override
    protected void initSubData() {

    }

    @Override
    public String getUserName() {
        return registUserName.getText().toString();
    }

    @Override
    public String getMobile() {
        return registPhone.getText().toString();
    }

    @Override
    public String getCheckNum() {
        return registChangeVerfica.getText().toString();
    }


    /**
     * 图片验证码刷新
     * 下一步
     * @param v
     */
    @Override
    public void onClick(View v) {
        if(!TimeLimitUtil.isResponseClick()){
            return;
        }
        switch (v.getId()){
            case R.id.change_verfication_pic:
            case R.id.verification_code_image:

                break;
            case R.id.next_bt:
                Registered2Fragment registered2Fragment = new Registered2Fragment();
                MyFragmentManager.addFragmentForBack(getActivity(),((RegisteredActivity)getActivity()).getBaseFrameLayoutId(),registered2Fragment, Constants.FRAGMENT_REGISTERED2_TAG);
                break;
        }
    }
}
