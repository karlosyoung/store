package com.sunsoft.zyebiz.b2e.common.net.checkNet;

import android.app.ActivityManager;
import android.content.ComponentName;
import android.content.Context;

import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

import java.util.List;

/**
 * Created by MJX on 2017/1/11.
 */
public class AppisBackground {
    /**
     *判断当前应用程序处于前台还是后台
     */
    public static boolean isApplicationBroughtToBackground() {
        ActivityManager am = (ActivityManager) UIUtil.getContext().getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> tasks = am.getRunningTasks(1);
        if (!tasks.isEmpty()) {
            ComponentName topActivity = tasks.get(0).topActivity;
            if (!topActivity.getPackageName().equals(UIUtil.getContext().getPackageName())) {
                return true;
            }
        }
        return false;
    }
}
