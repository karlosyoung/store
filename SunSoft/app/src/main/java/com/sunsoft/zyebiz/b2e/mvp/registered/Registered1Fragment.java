package com.sunsoft.zyebiz.b2e.mvp.registered;

import android.view.View;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by MJX on 2017/2/7.
 */
public class Registered1Fragment extends BaseFragment{
    private View regist1View;
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

    }

    @Override
    protected void initSubData() {

    }
}
