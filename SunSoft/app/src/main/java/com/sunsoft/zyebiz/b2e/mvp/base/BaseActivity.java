package com.sunsoft.zyebiz.b2e.mvp.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;

/**
 * Activity的异常退出
 * Activity的销毁
 * Created by MJX on 2017/1/4.
 */
public abstract class BaseActivity extends FragmentActivity{
    protected FrameLayout baseFramelayout;
    protected RelativeLayout noNetTitleView;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.base_activity);
        initView();
        checkNet();
        initSubView();
        handleActivityKilledException();
        AppManager.getAppManager().addActivity(this);
    }

    private void initView(){
        baseFramelayout = (FrameLayout) findViewById(R.id.base_framelayout);
        noNetTitleView = (RelativeLayout) findViewById(R.id.no_net_title_view);
    }

    /**
     * 无网标题栏显示
     */
    protected void checkNet(){

    }

    /**
     * Activity异常情况被杀死杀死
     */
    protected abstract void handleActivityKilledException();

    /**
     * Activity中的Fragment的使用
     */
    protected abstract void initSubView();

    /**
     * Activity销毁时，清除数据
     */
    protected abstract void clearData();

    @Override
    protected void onDestroy() {
        super.onDestroy();
        clearData();
        AppManager.getAppManager().finishActivity();
    }

}
