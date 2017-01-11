package com.sunsoft.zyebiz.b2e.common.constants;

/**
 * Created by MJX on 2017/1/6.
 */
public class Constants {
    /*—————————————————————上线的环境配置——————————————————————————————————————————*/
    //是生产还是测试环境,false是测试环境，true是生产环境
    public static boolean  IS_RELEASE =  false;
    //ReactNative的初始zip包
    public static String ZIP_NAME = "";
    //测试环境,获取动态ip的初始化地址
    public static String TEST_INIT_SERVER_URL = "https://ssl.ygzykj.com/";
    //生产环境，获取动态ip的初始化地址
    public static String RELEASE_INIT_SERVER_URL = "https://www.ygzykj.com/";
    //网络超时时间
    public static final int NET_TIME_OUT = 10;
    /*———————————————————————————————————————————————————————————————————--*/
}
