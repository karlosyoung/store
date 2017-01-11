package com.sunsoft.zyebiz.b2e.common.net.http;

import android.os.Handler;

import com.sunsoft.zyebiz.b2e.application.MyApplication;
import com.sunsoft.zyebiz.b2e.common.Manager.AppManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by MJX on 2017/1/8.
 */
public abstract class HttpMethod {

    private static OkHttpClient client;
    private static Request request;
    private static Handler handler = new Handler();
    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/x-www-form-urlencoded; charset=utf-8");//mdiatype 这个需要和服务端保持一致
    /**
     * OkHttp的get请求
     */
    public static void OkHttpGet( String url, final OnDataFinish onDataFinish) {
        request = new Request.Builder().url(url).build();
        HttpMethod.getClientInstance().newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                onDataFinish.OnError(e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String result = response.body().string();
                handler.post(new Runnable() {
                    @Override
                    public void run() {
                        onDataFinish.OnSuccess(result);
                    }
                });
            }
        });
    }

    /**
     * OkHttp的post请求
     */
    public  static void OkHttpPost(String url, HashMap<String, String> paramsMap, final OnDataFinish onDataFinish) {
//        request = new Request.Builder().url(url).post(body).build();
        StringBuilder tempParams = new StringBuilder();
        int pos = 0;
        for (String key : paramsMap.keySet()) {
            if (pos > 0) {
                tempParams.append("&");
            }
            try {
                tempParams.append(String.format("%s=%s", key, URLEncoder.encode(paramsMap.get(key), "utf-8")));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            pos++;
        }
        //生成参数
        String params = tempParams.toString();
        RequestBody body = RequestBody.create(MEDIA_TYPE_JSON, params);
        //创建一个请求实体对象 RequestBody
        request = new Request.Builder().url(url).post(body).build();
        HttpMethod.getClientInstance().newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                onDataFinish.OnError(e.getMessage());
            }
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if(response.isSuccessful()){
                final String result = response.body().string();
                try {
                    if(result != null){
                        JSONObject jsonObject = new JSONObject(result);
                        if(jsonObject.has("title")){
                            if(jsonObject.has("body")){
                                String body = jsonObject.getString("body");
                                JSONObject jsonObject1 = new JSONObject(body);
                                if(jsonObject1.has("msgCode")){
                                    String msgCode = jsonObject1.getString("msgCode");
                                    if("99".equals(msgCode)){
                                        AppManager.getAppManager().AppExit(MyApplication.context);
                                    }else{
                                        handler.post(new Runnable() {
                                            @Override
                                            public void run() {
                                                onDataFinish.OnSuccess(result);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                        if(jsonObject.has("msgCode")){
                            String msgCode = jsonObject.getString("msgCode");
                            if("99".equals(msgCode)){
                                AppManager.getAppManager().AppExit(MyApplication.context);
                            }else{
                                handler.post(new Runnable() {
                                    @Override
                                    public void run() {
                                        onDataFinish.OnSuccess(result);
                                    }
                                });
                            }
                        }
                    }
                }catch (JSONException e) {
                    e.printStackTrace();
                }
             }else{

                }
            }
        });
    }

    /**
     * 回调接口
     */
    public interface OnDataFinish {
        void OnSuccess(String result);
        void OnError(String error);
    }

    /**
     * OkHttpClient单例对象实例
     */
    public static OkHttpClient getClientInstance() {
        if (client == null) {
            synchronized (HttpMethod.class) {
                if (client == null) {
                    client = new OkHttpClient();
                }
            }
        }
        return client;
    }
}
