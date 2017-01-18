package com.sunsoft.zyebiz.b2e.mvp.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.sunsoft.zyebiz.b2e.utils.localUtil.CloseKeyBoard;
import com.umeng.analytics.MobclickAgent;

/**
 * Fragment的基类
 * Created by MJX on 2017/1/4.
 */
public abstract class BaseFragment extends Fragment{
    protected String currentNmae = "";

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        bindPresent();
        initSubData();
        return  onSubView();
    }


    @Override
    public void onResume() {
        super.onResume();
        setCurrentName();
        MobclickAgent.onPageStart(getCurrentName());
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPageEnd(getCurrentName());
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if(getActivity() != null){
            CloseKeyBoard.hideInputMethod(getActivity());
        }
        unBindPresent();
        clearData();
    }

    /**
     * 清除数据
     */
    protected abstract void clearData();

    /**
     * 得到当前页面的称呼
     * @return
     */
    protected  String getCurrentName(){
        return currentNmae;
    }

    /**
     * 解绑Presenter
     */
    protected abstract void unBindPresent();

    /**
     *设置当前页面的称呼
     */
    protected abstract void setCurrentName();


    /**
     * 绑定Presenter
     */
    protected abstract void bindPresent();

    /**
     * 填充Fragment的子界面
     * @return
     */
    protected abstract View onSubView();

    /**
     * 初始化的数据
     */
    protected abstract void initSubData();
}
