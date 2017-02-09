package com.sunsoft.zyebiz.b2e.mvp.tab.myGarden;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;

/**
 * 我的智园
 * Created by MJX on 2017/1/12.
 */
public class MyGardenFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        CommonPag commonPag = new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {

                return null;
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

            }

            @Override
            protected void initSubTitle() {

            }
        };
        return commonPag;
    }
}
