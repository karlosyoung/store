package com.sunsoft.zyebiz.b2e.mvp.splash;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginActivity;

import butterknife.ButterKnife;
import butterknife.InjectView;

/**
 * 闪屏页面
 * Created by MJX on 2017/1/12.
 */
public class SplashActivity extends Activity implements SplashContract.ISplashView {

    @InjectView(R.id.home_tv_title)
    TextView homeTvTitle;
    @InjectView(R.id.pb_progressbar)
    ProgressBar pbProgressbar;
    @InjectView(R.id.home_rl)
    RelativeLayout homeRl;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);







        setContentView(R.layout.activity_splash);
        ButterKnife.inject(this);
        SplashPresenter splashPresenter = new SplashPresenter(this);
        splashPresenter.initServerUrl();
    }

    @Override
    public void showProgressBar() {

    }

    @Override
    public void showUpDateDialog() {

    }

    @Override
    public void showUpDateDesDialog() {

    }

    @Override
    public void jump() {
        startActivity(new Intent(this,LoginActivity.class));
        finish();
    }

}
