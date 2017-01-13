package com.sunsoft.zyebiz.b2e.mvp.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sunsoft.zyebiz.b2e.common.ui.CommonPag;
import com.umeng.analytics.MobclickAgent;

/**
 * Created by MJX on 2017/1/4.
 */
public abstract class BaseFragment extends Fragment{
     public  CommonPag commonPag;
    public String currentNmae = "";
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
        setCurrentName(currentNmae);
        return commonPag;
    }

    /**
     *设置 当前页面的称呼
     * @param name
     */
    protected abstract void setCurrentName(String name);

    /**
     * 得到当前页面的称呼
     * @return
     */
    protected abstract String getCurrentName();

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onPageStart(getCurrentName());
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPageEnd(getCurrentName());
    }

    /**
     * 成功界面
     * @return
     */
    protected  abstract View initSubSuccedView();

}
