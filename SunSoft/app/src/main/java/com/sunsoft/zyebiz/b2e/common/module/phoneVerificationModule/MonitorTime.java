package com.sunsoft.zyebiz.b2e.common.module.phoneVerificationModule;

import java.util.Timer;
import java.util.TimerTask;

/**
 * 发送验证码时间的监控
 * Created by MJX on 2017/2/10.
 */
public class MonitorTime {
    private static Timer timer = null;
    private static TimerTask timeTask;
    private static long timeout = 180000;
    public static void startMonitorTime(final ITimeOut iTimeOut){
        if (timer == null) {
            timer = new Timer();
        }
        if (timeTask == null) {
            timeTask = new TimerTask() {
                public void run() {
                    iTimeOut.noticeTimeOut();
                    timer.cancel();
                    timer.purge();
                }
            };
        }
        if (timer != null && timeTask != null) {
            timer.schedule(timeTask, timeout, 1);
        }
    }

    public static void stopMonitorTime(){
        if (timer != null) {
            timer.cancel();
            timer = null;
        }

        if (timeTask != null) {
            timeTask.cancel();
            timeTask = null;
        }
    }
}
