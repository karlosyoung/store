package com.sunsoft.zyebiz.b2e.mvp.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;
import com.sunsoft.zyebiz.b2e.common.net.checkNet.NetEvent;

import de.greenrobot.event.EventBus;

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


    protected int getBaseFragmeLayout(){
        return R.id.base_framelayout;
    }

    /**
     * 无网标题栏显示
     */
    protected void checkNet(){
        EventBus.getDefault().register(this);
    }


    public void onEventMainThread(NetEvent event) {
        boolean netFlag = event.getMsg();
        if(netFlag){
            noNetTitleView.setVisibility(View.GONE);
        }else{
            noNetTitleView.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK
                && event.getAction() == KeyEvent.ACTION_DOWN) {
            if (!getFragmentManager().popBackStackImmediate()) {
                isFinishCurrentActivity();
            }
            getFragmentManager().popBackStackImmediate();

        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        clearData();
        EventBus.getDefault().unregister(this);
        AppManager.getAppManager().finishActivity();
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

    /**
     * 是否关闭Activity
     */
    protected abstract void isFinishCurrentActivity();

}
