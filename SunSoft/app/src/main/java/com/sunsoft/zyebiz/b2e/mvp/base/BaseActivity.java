package com.sunsoft.zyebiz.b2e.mvp.base;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.view.KeyEvent;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;
import com.sunsoft.zyebiz.b2e.common.net.checkNet.NetEvent;
import com.sunsoft.zyebiz.b2e.utils.localUtil.CloseKeyBoard;

import butterknife.ButterKnife;
import butterknife.InjectView;
import de.greenrobot.event.EventBus;

/**
 * Activity的异常退出
 * Activity的销毁
 * Created by MJX on 2017/1/4.
 */




public abstract class BaseActivity extends FragmentActivity {

    @InjectView(R.id.notice)
    TextView notice;
    @InjectView(R.id.top_title_left)
    RelativeLayout topTitleLeft;
    @InjectView(R.id.mid_title)
    TextView midTitle;
    @InjectView(R.id.right_title)
    TextView rightTitle;
    @InjectView(R.id.top_title_right)
    RelativeLayout topTitleRight;
    @InjectView(R.id.base_title)
    RelativeLayout baseTitle;
    @InjectView(R.id.base_framelayout)
    FrameLayout baseFramelayout;
    @InjectView(R.id.no_net_rl)
    RelativeLayout noNetRl;
    @InjectView(R.id.no_net_title_view)
    RelativeLayout noNetTitleView;
    @InjectView(R.id.title_back)
    ImageView titleBack;
    @InjectView(R.id.red_round_tv)
    TextView redRoundTv;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.base_activity);
        ButterKnife.inject(this);
        initTitleFeature();
        checkNet();
        initSubView();
        handleActivityKilledException();
        AppManager.getAppManager().addActivity(this);
    }

    private void initView() {
        baseFramelayout = (FrameLayout) findViewById(R.id.base_framelayout);
        noNetTitleView = (RelativeLayout) findViewById(R.id.no_net_title_view);
    }


    /**
     * 左边是返回键，中间标题，右边不显示
     */
    public void showCommonTitle() {
        topTitleLeft.setVisibility(View.VISIBLE);
        titleBack.setVisibility(View.VISIBLE);
        topTitleRight.setVisibility(View.GONE);
    }


    /**
     * 统购标题的显示
     */
    public void showGroupBuyTitle() {
        topTitleLeft.setVisibility(View.VISIBLE);
        titleBack.setVisibility(View.GONE);
        notice.setVisibility(View.VISIBLE);
        redRoundTv.setVisibility(View.VISIBLE);
        topTitleRight.setVisibility(View.GONE);

    }

    public void showOnlyRight(){
        topTitleLeft.setVisibility(View.GONE);
        topTitleRight.setVisibility(View.VISIBLE);
        rightTitle.setVisibility(View.VISIBLE);
    }

    /**
     * 只显示中间标题
     */
    public void showOnlyMidTitle(){
        topTitleLeft.setVisibility(View.GONE);
        topTitleRight.setVisibility(View.GONE);
    }

    protected int getBaseFragmeLayout() {
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
        if (netFlag) {
            noNetTitleView.setVisibility(View.GONE);
        } else {
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
        CloseKeyBoard.hideInputMethod(this);
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

    /**
     * 实现标题栏的回退和显示文字
     */
    protected abstract void initTitleFeature();

}
