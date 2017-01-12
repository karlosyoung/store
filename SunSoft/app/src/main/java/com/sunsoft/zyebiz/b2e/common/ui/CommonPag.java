package com.sunsoft.zyebiz.b2e.common.ui;

import android.content.Context;
import android.view.View;
import android.widget.FrameLayout;

import com.sunsoft.zyebiz.b2e.R;
import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by MJX on 2017/1/9.
 */
public abstract class CommonPag extends FrameLayout {

    protected View loadingView,errorView,successedView,emptyView;

    public CommonPag(Context context) {
        super(context);
        initView();
    }

    /**
     * 初始化：加载中的loading,加载失败，加载成功的view
     */
    protected void initView(){
        loadingView = onCreateLoadingView();
        addView(loadingView);
        errorView = onCreateErrorView();
        addView(errorView);
        successedView = onCreateSuccessedView();
        addView(successedView);
        emptyView = onCreateEmptyView();
    }

    protected  View onCreateEmptyView(){
        return View.inflate(UIUtil.getContext(), R.layout.common_empty_view,null);
    }

    private View onCreateErrorView() {
        return View.inflate(UIUtil.getContext(), R.layout.common_error_view,null);
    }

    private View onCreateLoadingView() {
        return View.inflate(UIUtil.getContext(), R.layout.common_loading_view,null);
    }

    public void  showLoadigView(){
        if(errorView != null && successedView != null && emptyView != null && loadingView != null){
            errorView.setVisibility(View.GONE);
            successedView.setVisibility(View.GONE);
            emptyView.setVisibility(View.GONE);
            loadingView.setVisibility(View.VISIBLE);
        }
    }

    public void showEmptyView(){
        if(errorView != null && successedView != null && emptyView != null&& loadingView != null){
            errorView.setVisibility(View.GONE);
            successedView.setVisibility(View.GONE);
            emptyView.setVisibility(View.VISIBLE);
            loadingView.setVisibility(View.GONE);
        }
    }


    public void showSuccessedView(){
        if(errorView != null && successedView != null && emptyView != null&& loadingView != null){
            errorView.setVisibility(View.GONE);
            successedView.setVisibility(View.VISIBLE);
            emptyView.setVisibility(View.GONE);
            loadingView.setVisibility(View.GONE);
        }
    }

    public void showErrorView(){
        if(errorView != null && successedView != null && emptyView != null&& loadingView != null){
            errorView.setVisibility(View.VISIBLE);
            successedView.setVisibility(View.GONE);
            emptyView.setVisibility(View.GONE);
            loadingView.setVisibility(View.GONE);
        }
    }
    protected abstract View onCreateSuccessedView();
}
