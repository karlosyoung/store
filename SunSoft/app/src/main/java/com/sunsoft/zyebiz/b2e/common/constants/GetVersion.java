package com.sunsoft.zyebiz.b2e.common.constants;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * 获取当前的Version
 * Created by MJX on 2017/1/13.
 */
public class GetVersion {
    /**
     * 版本号
     * @return
     */
    public static String getVersionName(){
        try {
            PackageManager packageManager = UIUtil.getContext().getPackageManager();
            PackageInfo packInfo = packageManager.getPackageInfo(UIUtil.getContext().getPackageName(),
                    0);
            return packInfo.versionName;
        }catch (Exception e){

        }
        return null;
    }
}
