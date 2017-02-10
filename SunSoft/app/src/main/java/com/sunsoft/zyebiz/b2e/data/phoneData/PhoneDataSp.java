package com.sunsoft.zyebiz.b2e.data.phoneData;

import com.sunsoft.zyebiz.b2e.data.GetSpInsance;

/**
 * 存储手机信息
 * Created by MJX on 2017/2/9.
 */
public class PhoneDataSp {
    /**
     * 保存手机信息
     * @param uniqueStr
     */
    public static void savePhoneData(String uniqueStr){
        GetSpInsance.saveSp("phoneUnique","uniqueStr",uniqueStr);
    }

    /**
     * 获取手机信息
     * @return
     */
    public static String getPhoneData(){
        return (String)GetSpInsance.getSpValue("phoneUnique","uniqueStr","");
    }
}
