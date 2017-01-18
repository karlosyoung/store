package com.sunsoft.zyebiz.b2e.common.ui;

import android.content.Context;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 界面的基类
 * 标题栏和内容界面的处理
 * Created by MJX on 2017/1/9.
 */
public abstract class CommonPag extends FrameLayout {
    protected View loadingView, noNetView, emptyView, successedView;
    protected RelativeLayout commonParent;
    protected TextView noDataLoadAgain;
    private RelativeLayout commonTitleParent;
    private FrameLayout commonContentParent;
    public Context context;
    private RelativeLayout titleLeftParent;
    private ImageView titleBack;
    private TextView noticeTv;
    private TextView redRoundTv;
    private TextView midTitleTv;
    private RelativeLayout titleRightParent;
    private TextView rifhtTitleTv;

    public CommonPag(Context context) {
        super(context);
        this.context = context;
        initView();
    }

    /**
     * 初始化：加载中的loading,加载失败，加载成功的view
     */
    protected void initView() {
        commonParent = (RelativeLayout) UIUtil.inflate(R.layout.common_page);
        addView(commonParent);
        commonTitleParent = (RelativeLayout) findViewById(R.id.common_title_rl);
        commonContentParent = (FrameLayout) findViewById(R.id.common_content);
        loadingView = onCreateLoadingView();
        commonContentParent.addView(loadingView);
        noNetView = onCreateNoNetView();
        commonContentParent.addView(noNetView);
        successedView = onCreateSuccessedView();
        commonContentParent.addView(successedView);
        emptyView = onCreateEmptyView();
        commonContentParent.addView(emptyView);
        initChildView();
    }

    protected void initChildView() {
        initTitle();
        initNoNetView();
        initEmptyView();
    }

    private void initTitle() {
        titleLeftParent = (RelativeLayout) commonTitleParent.findViewById(R.id.top_title_left);
        titleBack = (ImageView) commonTitleParent.findViewById(R.id.title_back);
        noticeTv = (TextView) commonTitleParent.findViewById(R.id.notice);
        redRoundTv = (TextView) commonTitleParent.findViewById(R.id.red_round_tv);
        midTitleTv = (TextView) commonTitleParent.findViewById(R.id.mid_title);
        titleRightParent = (RelativeLayout) commonTitleParent.findViewById(R.id.top_title_right);
        rifhtTitleTv = (TextView) commonTitleParent.findViewById(R.id.right_title);
        initSubTitle();
    }



    public void initSubCommonTitle(){
        titleLeftParent.setVisibility(View.VISIBLE);
        titleBack.setVisibility(View.VISIBLE);
        noticeTv.setVisibility(View.GONE);
        redRoundTv.setVisibility(View.GONE);
        midTitleTv.setVisibility(View.VISIBLE);
        titleRightParent.setVisibility(View.GONE);
        rifhtTitleTv.setVisibility(View.GONE);
        titleLeftParent.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                leftBackTo();
            }
        });
        setMidText();
    }

    public void initSubTgTitle(){
        titleLeftParent.setVisibility(View.VISIBLE);
        titleBack.setVisibility(View.VISIBLE);
        noticeTv.setVisibility(View.GONE);
        redRoundTv.setVisibility(View.GONE);
        midTitleTv.setVisibility(View.VISIBLE);
        titleRightParent.setVisibility(View.GONE);
        rifhtTitleTv.setVisibility(View.GONE);
        titleLeftParent.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                leftBackTo();
            }
        });
        setMidText();
    }

    public void initSubPayTitle(){
        titleLeftParent.setVisibility(View.VISIBLE);
        titleBack.setVisibility(View.VISIBLE);
        noticeTv.setVisibility(View.GONE);
        redRoundTv.setVisibility(View.GONE);
        midTitleTv.setVisibility(View.VISIBLE);
        titleRightParent.setVisibility(View.VISIBLE);
        rifhtTitleTv.setVisibility(View.VISIBLE);
        titleLeftParent.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                leftBackTo();
            }
        });

        titleRightParent.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                rightBackTo();
            }
        });
        setMidText();
    }

    protected void initEmptyView() {
        TextView noDataLoadAgain = (TextView) emptyView.findViewById(R.id.no_data_load_again);
        noDataLoadAgain.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                loadAgain();
            }
        });
    }

    protected void initNoNetView() {
        TextView noNetLoginAgain = (TextView) noNetView.findViewById(R.id.no_net_bt_load_again);
        noNetLoginAgain.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                    loadAgain();
            }
        });
    }

    /**
     * 无数据
     *
     * @return
     */
    protected View onCreateEmptyView() {
        return UIUtil.inflate(R.layout.common_empty_view);
    }

    /**
     * 无网
     *
     * @return
     */
    private View onCreateNoNetView() {
        return UIUtil.inflate(R.layout.common_no_net_view);
    }

    /**
     * 加载
     *
     * @return
     */
    private View onCreateLoadingView() {
        return UIUtil.inflate(R.layout.common_loading_view);
    }

    /**
     * 展示加载中的View
     */
    public void showLoadigView() {
        if (noNetView != null && successedView != null && emptyView != null && loadingView != null) {
            noNetView.setVisibility(View.GONE);
            successedView.setVisibility(View.GONE);
            emptyView.setVisibility(View.GONE);
            loadingView.setVisibility(View.VISIBLE);
        }
    }

    /**
     * 展示无数据
     */
    public void showEmptyView() {
        if (noNetView != null && successedView != null && emptyView != null && loadingView != null) {
            noNetView.setVisibility(View.GONE);
            successedView.setVisibility(View.GONE);
            emptyView.setVisibility(View.VISIBLE);
            loadingView.setVisibility(View.GONE);
        }
    }

    /**
     * 展示加载成功
     */
    public void showSuccessedView() {
        if (noNetView != null && successedView != null && emptyView != null && loadingView != null) {
            noNetView.setVisibility(View.GONE);
            successedView.setVisibility(View.VISIBLE);
            emptyView.setVisibility(View.GONE);
            loadingView.setVisibility(View.GONE);
        }
    }

    /**
     * 展示无网
     */
    public void showNoNetView() {
        if (noNetView != null && successedView != null && emptyView != null && loadingView != null) {
            noNetView.setVisibility(View.VISIBLE);
            successedView.setVisibility(View.GONE);
            emptyView.setVisibility(View.GONE);
            loadingView.setVisibility(View.GONE);
        }
    }

    /**
     * 展示无标题，全屏界面
     */
    public void showNoTitlFullScreenView(){
        if(commonTitleParent != null){
            commonTitleParent.setVisibility(View.GONE);
        }
        showSuccessedView();
    }

    /**
     * 加载成功的view
     *
     * @return
     */
    protected abstract View onCreateSuccessedView();

    /**
     * 无网和无数据的加载
      */
    public abstract void loadAgain();

    /**
     * 左边返回按钮
     */
    protected abstract void leftBackTo();

    /**
     * 右边返回按钮
     */
    protected abstract void rightBackTo();

    /**
     * 设置界面标题
     */
    protected abstract void setMidText();

    /**
     * 设置子界面展示的标题
     */
    protected abstract void initSubTitle();
}
