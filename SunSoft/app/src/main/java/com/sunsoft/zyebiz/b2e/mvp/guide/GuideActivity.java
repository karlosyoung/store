package com.sunsoft.zyebiz.b2e.mvp.guide;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.data.GetSpInsance;
import com.sunsoft.zyebiz.b2e.mvp.guide.adapter.GuideViewPagerAdapter;
import com.sunsoft.zyebiz.b2e.mvp.login.LoginActivity;

import java.util.ArrayList;
import java.util.List;

import butterknife.ButterKnife;
import butterknife.InjectView;
import butterknife.OnClick;

/**
 * 指导页面
 * Created by MJX on 2017/1/4.
 */
public class GuideActivity extends Activity implements IDataSave{
    @InjectView(R.id.viewPager)
    ViewPager viewPager;
    @InjectView(R.id.intoLoginBt)
    Button intoLoginBt;
    private List<ImageView> list;
    private GuideViewPagerAdapter guideViewPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guide);
        ButterKnife.inject(this);
        initGuideView();
    }

    private void initGuideView() {
        createViewPagerList();
    }

    private void createViewPagerList() {
        if (list == null) {
            list = new ArrayList<ImageView>();
        }
        list.clear();
        createImageView();
        if (guideViewPagerAdapter == null) {
            guideViewPagerAdapter = new GuideViewPagerAdapter(list);
        }
        viewPager.setAdapter(guideViewPagerAdapter);
        viewPager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                if (position == (list.size() - 1)) {
                    intoLoginBt.setVisibility(View.VISIBLE);
                } else {
                    intoLoginBt.setVisibility(View.GONE);
                }
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }


    private void createImageView() {
        ImageView imageView1 = new ImageView(this);
        imageView1.setBackgroundResource(R.drawable.welcome_01);
        list.add(imageView1);
        ImageView imageView2 = new ImageView(this);
        imageView2.setBackgroundResource(R.drawable.welcome_02);
        list.add(imageView2);
        ImageView imageView3 = new ImageView(this);
        imageView3.setBackgroundResource(R.drawable.welcome_03);
        list.add(imageView3);
    }


    @OnClick(R.id.intoLoginBt)
    public void onClick() {
        saveFirstInfo();
        startActivity(new Intent(this,LoginActivity.class));
        finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(list != null){
            list.clear();
        }
    }

    @Override
    public void saveFirstInfo() {
        GetSpInsance.saveSp("FIRST","first",false);
    }
}
