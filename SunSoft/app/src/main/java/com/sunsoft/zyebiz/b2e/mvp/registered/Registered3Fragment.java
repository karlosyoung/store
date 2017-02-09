package com.sunsoft.zyebiz.b2e.mvp.registered;

import android.view.View;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.sunsoft.zyebiz.b2e.mvp.base.BaseFragment;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 注册3页
 * Created by MJX on 2017/2/8.
 */
public class Registered3Fragment extends BaseFragment{
    private View registered3View;
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
        CommonPag commonPag = new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {
                registered3View = UIUtil.inflate(R.layout.fragment_registered3);
                return registered3View;
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

    }

    @Override
    protected void initSubData() {

    }
}
