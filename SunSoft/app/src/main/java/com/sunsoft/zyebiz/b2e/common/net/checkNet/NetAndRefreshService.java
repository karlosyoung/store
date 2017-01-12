package com.sunsoft.zyebiz.b2e.common.net.checkNet;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.sunsoft.zyebiz.b2e.data.userData.UserSp;

import java.util.Timer;
import java.util.TimerTask;

import de.greenrobot.event.EventBus;

/**
 * 检测是否联网，半小时刷新
 * Created by MJX on 2017/1/11.
 */
public class NetAndRefreshService extends Service{
    //从后台切到前台，是否需要赋值，true的时候赋值，false的时候不用赋值
    private boolean backToTop = false;
    //从前台切到后台,true的时候赋值，false的时候不用赋值
    private boolean topToBack = true;
    private long firstTime = 0;
    private long secondTime = 0;
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        startListenter();
    }

    private void startListenter(){
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if(CheckNet.isHaveNetWork()){
                        /*有网*/
                    EventBus.getDefault().post(
                            new NetEvent(true));
                }else{
                       /*无网*/
                    EventBus.getDefault().post(
                            new NetEvent(false));
                }

                //前后台的监听
                if(UserSp.isLogin()){
                    if(AppisBackground.isApplicationBroughtToBackground()){
                        /*进入后台*/
                        if(topToBack){
                            firstTime = System.currentTimeMillis();
                            //进入后台之后不再记录时间了
                            topToBack = false;
                            //下次进入前台可以记录时间
                            backToTop = true;
                        }
                    }else{
                       /*进入前台*/
                        if(backToTop){
                            secondTime = System.currentTimeMillis();
                            long time = secondTime - firstTime;
                            if(secondTime - firstTime > 1800000){  /*超时的时间限制1800000*/
//                                Activity mCurrentActivity = MainApplication.getInstance().mList.get(MainApplication.getInstance().mList.size() - 1);
//                                if(mCurrentActivity == null){
//                                    return;
//                                }
//                                MainApplication.getInstance().finishAllActivity();
//                                Intent intent = new Intent();
//                                intent.setClass(mCurrentActivity, SplashActivity.class);
//                                mCurrentActivity.startActivity(intent);
                                firstTime = 0;
                                secondTime = 0;
                                //进入前台之后不再记录时间了
                                backToTop = false;
                                //进入后台之后下次记录进入前台的时间
                                topToBack = true;
                            }else{ /*从后台切换到前台，没有超时的时候处理*/
                                firstTime = 0;
                                secondTime = 0;
                                //进入前台之后不再记录时间了
                                backToTop = false;
                                //进入后台之后下次记录进入前台的时间
                                topToBack = true;
                            }
                        }
                    }
                }

            }
        },1000,1000);
    }
}
