package com.sunsoft.zyebiz.b2e.mvp.registered;

import java.util.HashMap;

/**
 * 注册
 * Created by MJX on 2017/1/12.
 */
public interface RegistContract {
    interface IRegist1View{
        /**
         * 获取用户名
         * @return 用户名
         */
        String getUserName();

        /**
         * 获取手机号
         * @return 手机号
         */
        String getMobile();

        /**
         * 获取图片验证码
         * @return 图片验证码
         */
        String getCheckNum();
    }

    interface IRegist1Presenter{
        /**
         * 获取图片验证码
         */
        void getImageVerificationCode();

        /**
         * 下一步
         */
        void nextStep();
    }

    interface IRegist1Model{
        /**
         * 下一步请求网络
         * @param url
         * @param map
         */
        void requestRegist1NextStep(String url, HashMap<String, String> map);

        /**
         * 获取手机验证码
         * @param url
         * @param map
         */
        void requestPhoneVerificationCode(String url, HashMap<String, String> map);
    }
    interface IRegist2View{
        String getPassword();
        String getSurePassword();
        String getMobileNum();
        String getVerificationNum();
    }

    interface IRegist2Presenter{
        /**
         * 获取手机验证码
         * @param type
         */
        void getMobileNum(String type);

        /**
         * 下一步
         * @param phoneNum
         * @param setPassword
         * @param confirmPassword
         */
        void nextStep(String phoneNum,String setPassword,String confirmPassword);
    }

    interface IRegist2Module{
        /**
         * 网络请求手机验证码
         */
        void requestRegist2MobileNum();
    }
    interface IRegist3View{
        void showAreaDialog();
        void showSchoolDialog();
        String getAreaInfo();
        String getSchoolInfo();
    }

    interface IRegist3Presenter{
        void toRegist();
        void saveUserInfo();
    }

    interface IRegist3Module{
        void requestRegist3(String url, HashMap<String, String> map);
    }
}
