package com.sunsoft.zyebiz.b2e.data;

import android.content.SharedPreferences;

import com.sunsoft.zyebiz.b2e.utils.localUtil.UIUtil;

/**
 * Created by MJX on 2017/1/13.
 */
public class GetSpInsance {
    /**
     * 得到sp对象
     * @param spName sp的名字
     * @return
     */
    public static SharedPreferences getSp(String spName){
        SharedPreferences sp = UIUtil.getContext().getSharedPreferences(spName, UIUtil.getContext().MODE_PRIVATE);
        return sp;
    }

    /**
     * 得到Editor对象
     * @param spName sp的名字
     * @return
     */
    public static SharedPreferences.Editor getEdit(String spName){
        SharedPreferences sp = UIUtil.getContext().getSharedPreferences(spName, UIUtil.getContext().MODE_PRIVATE);
        return  sp.edit();
    }

    /**
     * 保存sp的信息
     * @param spName
     * @param key
     * @param value
     * @param <T>
     */
    public static <T> void saveSp(String spName,String key,T value){
     final SharedPreferences sp = getSp(spName);
        if(value != null){
            if(value instanceof String){
                sp.edit().putString(key,(String)value).commit();
            }else if(value instanceof Boolean){
                sp.edit().putBoolean(key,(Boolean) value).commit();
            }
        }
    }

    /**
     * 得到保存的数据类型
     * @param spName
     * @param key
     * @param defauleValue
     * @param type
     * @param <T>
     * @return
     */
    public static <T> Object getSpValue(String spName,String key,T  defauleValue,T type){
        final SharedPreferences sp = getSp(spName);
            if(type instanceof String){
               return  sp.getString(key,(String) defauleValue);
            }else if(type instanceof Boolean){
                return sp.getBoolean(key,(Boolean) defauleValue);
            }
        return null;
    }
}
