package com.sunsoft.zyebiz.b2e.mvp.guide.adapter;

import android.view.View;
import android.widget.ImageView;

import com.sunsoft.zyebiz.b2e.mvp.base.BasePagerAdapter;

import java.util.List;

/**
 * 新手引导页面
 * Created by MJX on 2017/1/13.
 */
public class GuideViewPagerAdapter  extends BasePagerAdapter<ImageView> {

    public GuideViewPagerAdapter(List<ImageView> list) {
        super(list);
    }

    @Override
    protected int subGetCount() {
        return list.size();
    }

    @Override
    protected View createView(int position) {
        return list.get(position);
    }
}
