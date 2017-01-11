package com.sunsoft.zyebiz.b2e.common.api;

import com.sunsoft.zyebiz.b2e.bean.net.serverUrl.ServerBean;

import retrofit2.Call;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * 网络通讯层的请求地址和参数
 * Created by MJX on 2017/1/6.
 */
public interface ServiceUrl extends BaseServerUrl{
    //获取服务器的地址
    @POST("sunsoft-app/version/checkVersionip.json")
    Call<ServerBean> getServerUrl(@Query("versionCode") String versionCode,@Query("type") String type);
}
