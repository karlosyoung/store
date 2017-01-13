package com.sunsoft.zyebiz.b2e.mvp.base;

import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

/**
 * ViewPager的基类
 * Created by MJX on 2017/1/13.
 */
public abstract class BasePagerAdapter<T>  extends PagerAdapter {
    public List<T> list;
    public BasePagerAdapter(List<T> list ){
        this.list = list;
    }

    @Override
    public int getCount() {
        if(list != null){
            return subGetCount();
        }
        return 0;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == object;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        View view = createView(position);
        container.addView(view);
        return view;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        ((ViewPager) container).removeView((View)object);
    }

    /**
     * 返回的条目
     * @return
     */
    protected abstract int subGetCount();

    /**
     * 创建View
     * @return
     */
    protected abstract View createView(int position);
}
