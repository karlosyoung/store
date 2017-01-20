package com.sunsoft.zyebiz.b2e.mvp.tab.mainTab;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentTabHost;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TabHost;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.common.net.checkNet.NetEvent;
import com.sunsoft.zyebiz.b2e.mvp.tab.groupBuy.GroupBuyFragment;
import com.sunsoft.zyebiz.b2e.mvp.tab.myGarden.MyGardenFragment;
import com.sunsoft.zyebiz.b2e.mvp.tab.shoppingCart.ShoppingCartFragment;
import com.sunsoft.zyebiz.b2e.mvp.tab.singleBuy.SingleBuyFragment;

import de.greenrobot.event.EventBus;

/**
 * Created by MJX on 2017/1/12.
 */
public class TabActivity extends FragmentActivity {
    private FragmentTabHost mTabHost;
    //定义数组来存放Fragment界面
    private Class fragmentArray[] = {GroupBuyFragment.class,SingleBuyFragment.class,ShoppingCartFragment.class,MyGardenFragment.class};
    //定义数组来存放按钮图片
    private int mImageViewArray[] = {R.drawable.selector_tab_group_buy,R.drawable.selector_tab_single_buy,R.drawable.selector_tab_shop_cart,
            R.drawable.selector_tab_my_garden};
    //Tab选项卡的文字
    private String mTextviewArray[] = {"学校统购", "学校零售", "购物车", "我的智园"};
    private RelativeLayout noNetTitleView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab);
        initView();

    }


    /**
     * 初始化组件
     */
    private void initView(){
        noNetTitleView = (RelativeLayout) findViewById(R.id.no_net_tab_title_view);
        //实例化TabHost对象，得到TabHost
        mTabHost = (FragmentTabHost)findViewById(android.R.id.tabhost);
        mTabHost.setup(this, getSupportFragmentManager(), R.id.realtabcontent);
        //得到fragment的个数
        int count = fragmentArray.length;
        for(int i = 0; i < count; i++){
            //为每一个Tab按钮设置图标、文字和内容
            TabHost.TabSpec tabSpec = mTabHost.newTabSpec(mTextviewArray[i]).setIndicator(getTabItemView(i));
            //将Tab按钮添加进Tab选项卡中
            mTabHost.addTab(tabSpec, fragmentArray[i], null);
        }
        mTabHost.setOnTabChangedListener(new TabHost.OnTabChangeListener() {
            @Override
            public void onTabChanged(String tabId) {

            }
        });
        registCheckNet();
    }


    /**
     * 给Tab按钮设置图标和文字
     */
    private View getTabItemView(int index){
        View view = View.inflate(this,R.layout.tab_item_view, null);
        ImageView imageView = (ImageView) view.findViewById(R.id.imageview);
        imageView.setImageResource(mImageViewArray[index]);
        TextView textView = (TextView) view.findViewById(R.id.textview);
        textView.setText(mTextviewArray[index]);
        return view;
    }


    public void registCheckNet() {
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


    public void unregister() {
        EventBus.getDefault().unregister(this);
    }

}
