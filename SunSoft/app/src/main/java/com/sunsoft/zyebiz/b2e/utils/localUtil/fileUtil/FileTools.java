package com.sunsoft.zyebiz.b2e.utils.localUtil.fileUtil;

import android.os.Environment;

import java.io.File;

/**
 * Created by Amoly.
 * Data：2017/2/15.
 */

public class FileTools {

    /***
     * 判断SDcard 是否存在
     *
     * @return
     */
    public static boolean isSdcardAvailable() {
        return Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED);
    }


    /***
     * 文件是否存在
     *
     * @param strFolder
     * @return
     */
    public static boolean isFolderExists(String strFolder) {
        File file = new File(strFolder);
        if (!file.exists()) {
            if (file.mkdirs()) {
                return true;
            } else {
                return false;
            }
        }

        if (!file.isDirectory()) {
            file.mkdirs();
        }
        return true;
    }


    /***
     * 获取sdcard根目录
     *
     * @return 返回根目录路径
     *
     */
    public static String getSDPath() {
        if (isSdcardAvailable()) {
            return Environment.getExternalStorageDirectory().getAbsolutePath();
        } else {
            return null;
        }
    }
}
