package com.sunsoft.zyebiz.b2e.mvp.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.view.KeyEvent;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;
import com.sunsoft.zyebiz.b2e.common.net.checkNet.NetEvent;
import com.sunsoft.zyebiz.b2e.utils.localUtil.CloseKeyBoard;
import com.umeng.analytics.MobclickAgent;

import butterknife.ButterKnife;
import butterknife.InjectView;
import de.greenrobot.event.EventBus;

/**
 * 设置子页面标题名称
 * 初始化子界面
 * 初始化子界面需要的数据
 * 绑定Presenter
 * Activity的异常退出
 * Activity的销毁
 * Created by MJX on 2017/1/4.
 */


public abstract class BaseActivity extends FragmentActivity {

    /**
     * 使用Fragment来替换
     */
    @InjectView(R.id.base_framelayout)
   protected   FrameLayout baseFramelayout;
    /**
     * 无网的标题展示
     */
    @InjectView(R.id.no_net_title_view)
    RelativeLayout noNetTitleView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.base_activity);
        initFragment();
        ButterKnife.inject(this);
        checkNet();
        handleActivityKilledException();
        AppManager.getAppManager().addActivity(this);
    }


    /**
     * 返回帧布局的id
     * @return
     */
    public int getBaseFrameLayoutId(){
        return R.id.base_framelayout;
    }

    /**
     * 无网标题栏显示
     */
    protected void checkNet() {
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
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }


    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        clearData();
        CloseKeyBoard.hideInputMethod(this);
        EventBus.getDefault().unregister(this);
        AppManager.getAppManager().finishActivity();
    }

    /**
     * 界面展示使用Fragment
     */
    protected abstract void initFragment();

    /**
     * Activity异常情况被杀死杀死
     */
    protected abstract void handleActivityKilledException();


    /**
     * 子界面的初始化数据
     */
    protected abstract void initSubData();

    /**
     * Activity销毁时，清除数据
     */
    protected abstract void clearData();

    /**
     * 是否关闭Activity
     */
    protected abstract void isFinishCurrentActivity();

}
