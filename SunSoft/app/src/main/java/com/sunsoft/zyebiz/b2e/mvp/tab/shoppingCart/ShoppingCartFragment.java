package com.sunsoft.zyebiz.b2e.mvp.tab.shoppingCart;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.sunsoft.zyebiz.b2e.R;

/**
 * Created by Administrator on 2017/1/12.
 */
public class ShoppingCartFragment extends Fragment{
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        TextView textView = new TextView(getContext());
        textView.setText(getClass().getName());
        textView.setTextColor(getResources().getColor(R.color.colorAccent));
        return textView;
    }
}
