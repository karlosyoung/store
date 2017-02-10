package com.sunsoft.zyebiz.b2e.utils.localUtil;

import com.sunsoft.zyebiz.b2e.common.constants.Constants;

/**
 * 手机号的校验
 * Created by MJX on 2017/2/9.
 */
public class PhoneNumUtil {

    /**
     * 手机号的验证
     * @param phoneNum
     * @return
     */
    public static boolean checkPhoneNum(String phoneNum){
        if(EmptyUtil.isNotEmpty(phoneNum)){
            String secondStr = phoneNum.substring(1, 2);
           if(phoneNum.length() != Constants.PHONENUM_LENGTH){
               return false;
           }

            if("1".equals(secondStr) || "2".equals(secondStr) || "6".equals(secondStr) || "9".equals(secondStr)){
                return false;
            }

        }else {
             return false;
        }
    return true;
    }
}
