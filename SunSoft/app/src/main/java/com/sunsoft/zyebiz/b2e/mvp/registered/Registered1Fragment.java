package com.sunsoft.zyebiz.b2e.mvp.registered;

import android.view.View;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;

/**
 * Created by MJX on 2017/2/7.
 */
public class Registered1Fragment extends BaseFragment{
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
                TextView textView = new TextView(getActivity());
                return textView;
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
                midTitleTv.setText("注册");
            }

            @Override
            protected void initSubTitle() {

            }
        };
        return commonPag;
    }

    @Override
    protected void initSubData() {

    }
}
