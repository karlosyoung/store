package com.sunsoft.zyebiz.b2e.mvp.base;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;

/**
 * Created by MJX on 2017/1/4.
 */
public abstract class BaseFragment extends Fragment {
    protected CommonPag commonPag;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        if(commonPag != null){
            return commonPag;
        }
        commonPag = new CommonPag(getActivity()) {
            @Override
            protected View onCreateSuccessedView() {
                return initSubSuccedView();
            }
        };
        return commonPag;
    }


    /**
     * 成功界面
     * @return
     */
    protected  abstract View initSubSuccedView();

}
