package com.sunsoft.zyebiz.b2e.common.Manager;


import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;


/**
 * 管理Fragment
 * Created by MJX on 2017/1/11.
 */
public class MyFragmentManager {
    private static FragmentManager fgmentManager;

    /**
     *添加入栈
     * @param fragmentActivity
     * @param id
     * @param fragment
     * @param tag
     */
    public static void addFragmentForBack(FragmentActivity fragmentActivity, int id, Fragment fragment, String tag){
        fgmentManager = fragmentActivity.getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fgmentManager.beginTransaction();
        fragmentTransaction.add(id,fragment,tag);
        fragmentTransaction.addToBackStack(null);
        fragmentTransaction.commit();
    }

    /**
     *不用添加入栈
     * @param fragmentActivity
     * @param id
     * @param fragment
     * @param tag
     */
    public static void addFragmentNoBack(FragmentActivity fragmentActivity, int id, Fragment fragment,String tag){
        fgmentManager = fragmentActivity.getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fgmentManager.beginTransaction();
        fragmentTransaction.add(id,fragment,tag);
        fragmentTransaction.commit();
    }

}
