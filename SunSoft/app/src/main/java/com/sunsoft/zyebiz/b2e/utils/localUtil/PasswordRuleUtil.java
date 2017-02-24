package com.sunsoft.zyebiz.b2e.utils.localUtil;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 注册页，修改密码，忘记密码的规则
 * 规则如下：
 * 大写字母，小写字母，数字，特殊字符中任意二种及以上组合。特殊字符!@#$%^&*()_（英文状态下的），其余均不可用。（数字，字母键盘）长度：6-20个字
 * Created by MJX on 2016/12/13.
 */
public class PasswordRuleUtil {
    /**
     * 检查密码的规则
     * @param password
     * @return true符合规则，false不符合规则
     */
    public static boolean checkPasswordRule(String password){
        //特殊字符的验证

        //密码复杂度的验证
        //是否包含汉字
        boolean isChinese = isContainChinese(password);
        if(isChinese){
            return false;
        }
        //全是字母
        String regEx1 = "[a-zA-Z]+";
        Pattern pattern1 = Pattern.compile(regEx1);
        Matcher matcher1 = pattern1.matcher(password);
        if(matcher1.matches()){
            boolean flag =  checkLetter(password);
            if(!flag){
                return false;
            }else{
                return true;
            }
        }
        /*"!@#$%^&*()_"*/
//        String regEx = "(?!^(\\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\\w!@#$%^&*()_]+$";
        String regEx = "(?!^(\\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\\w!@#$%^&*()_]+$";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(password);
        boolean isConformPasswordRule = matcher.matches();
        return isConformPasswordRule;
    }


    /**
     *
     * @param password
     * @return true有大小写，false全是大写或者全是小写
     */
    public static boolean checkLetter(String password) {
        boolean isAllCapital = false;
        boolean isAllLowerCase = false;
        for (int i = 0; i < password.length(); i++) {
            char c = password.charAt(i);
            if (Character.isLowerCase(c)) {
                if(!isAllLowerCase){
                    isAllLowerCase = true;
                }
            } else {
                if(!isAllCapital){
                    isAllCapital = true;
                }
            }
        }
        return isAllCapital && isAllLowerCase;
    }

    public static boolean isContainChinese(String str) {

        Pattern p = Pattern.compile("[\u4e00-\u9fa5]");
        Matcher m = p.matcher(str);
        if (m.find()) {
            return true;
        }
        return false;
    }

    /**
     *是否包含特殊字符，包含特殊字符true,不包含特殊字符false
     * @param password
     * @return true是没问题，false是有问题
     */
    public static boolean checkSpecialCharacter(String password){
        //去除数字和字母
        String regex = "[a-zA-Z0-9]*";
        Pattern delPattern = Pattern.compile(regex);
        Matcher matcher =   delPattern.matcher(password);
        String specialStr = matcher.replaceAll("");
        if("".equals(specialStr)){ //特殊字符全没了，没有特殊字符
            return true;
        }
//        String regEx = "^[\\w!@#$%^&*()_]";
//        String regEx = "^[!@#$%^&*()_]";
        String regEx = "^[\\w!@#$%^&*()_]+$";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(password);
        boolean matches = m.matches();
        return matches;
    }



}
