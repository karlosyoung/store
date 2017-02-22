package com.sunsoft.zyebiz.b2e.utils.localUtil;

/**
 * 防止多次点击
 * Created by MJX on 2017/2/8.
 */
public class TimeLimitUtil {
    public static final int MIN_CLICK_DELAY_TIME = 2000;
    private static long lastClickTime = 0;

    /**
     * 防止点击过快
     * @return
     */
    public synchronized static boolean isResponseClick() {
        long time = System.currentTimeMillis();
        if ( time - lastClickTime < MIN_CLICK_DELAY_TIME) {
            return false;
        }
        lastClickTime = time;
        return true;
    }
}
