package com.sunsoft.zyebiz.b2e.mvp.registered;

import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 注册1页
 * Created by MJX on 2017/2/7.
 */
public class Registered1Fragment extends BaseFragment implements RegistContract.IRegist1View,{
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
                getActivity().finish();
            }

            @Override
            protected void rightBackTo() {

            }

            @Override
            protected void setMidText() {
                midTitleTv.setText("注册");
            }

            @Override
            protected void initSubTitle() {
                initSubCommonTitle();
            }
        };
        commonPag.showSuccessedView();
        return commonPag;
    }

    private void initSubView(){
        registUserName = (EditText) regist1View.findViewById(R.id.regist_userName);
        registPhone = (EditText) regist1View.findViewById(R.id.regist_phonenumber);
        registVerficationEt = (EditText) regist1View.findViewById(R.id.regist_verfication_et);
        registVerficationIv = (ImageView) regist1View.findViewById(R.id.verification_code_image);
        registChangeVerfica = (TextView) regist1View.findViewById(R.id.change_verfication_pic);
        registNext = (RelativeLayout) regist1View.findViewById(R.id.next_bt);
        registTv = (TextView) regist1View.findViewById(R.id.common_text);
        registTv.setText(getString(R.string.next_step));


    @Override
    protected void initSubData() {

    }

    @Override
    public String getUserName() {
        return null;
    }

    @Override
    public String getMobile() {
        return null;
    }

    @Override
    public String getCheckNum() {
        return null;
    }

    @Override
    public void onNoDoubleClick(View v) {
        switch (v.getId()){

        }
    }
}
