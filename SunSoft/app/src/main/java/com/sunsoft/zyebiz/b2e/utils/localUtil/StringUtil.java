package com.sunsoft.zyebiz.b2e.utils.localUtil;

import android.text.InputFilter;
import android.text.Spanned;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Amoly.
 * Data：2017/2/8.
 */

public class StringUtil {


    /**
     * java去除字符串中的空格、回车、换行符、制表符
     *
     * @param str
     * @return
     */
    public static String replaceBlank(String str) {
        String dest = "";
        if (str != null) {
            Pattern p = Pattern.compile("\\s*|\t|\r|\n");
            Matcher m = p.matcher(str);
            dest = m.replaceAll("");
        }
        return dest;
    }

    public static boolean isInfoOrDigit(char c) {
        if (('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z')) {
            return true;
        }

        return isDigit(c);
    }


    public static InputFilter getNameFilter() {

        return new InputFilter() {

            @Override
            public CharSequence filter(CharSequence source, int start, int end, Spanned dest, int dstart, int dend) {
                for (int i = start; i < end; i++) {
                    if (source != null) {
                        Pattern p = Pattern.compile("\\s*|\t|\r|\n");
                        Matcher m = p.matcher(source);
                        source = m.replaceAll("");
                    }
                }
                return source;
            }
        };
    }


    /**
     * 输入密码的验证
     * @return
     */
    public static InputFilter stringFilter(){
        return new InputFilter() {

            @Override
            public CharSequence filter(CharSequence source, int start, int end, Spanned dest, int dstart, int dend) {
                String repickStr = "";
                if(source!=null)
                {
                    String reg = "[\u4e00-\u9fa5]";   //去除汉字
                    Pattern pat = Pattern.compile(reg);
                    Matcher mat = pat.matcher(source);
                    repickStr = mat.replaceAll("");
                    repickStr = repickStr.replaceAll(" ", "");  /*不能输入空格*/
                    repickStr = repickStr.replaceAll("…", "");  /*不能输入...*/
                }
                return repickStr;
            }
        };
    }


    public static boolean isDigit(char c) {
        if ('0' <= c && c <= '9') {
            return true;
        }

        return false;
    }

    public static String doTrim(String str) {
        String dest = "";
        if (str != null) {
            Pattern p = Pattern.compile("　");
            Matcher m = p.matcher(str);
            dest = m.replaceAll(" ");
        }
        return dest.trim();
    }




}
