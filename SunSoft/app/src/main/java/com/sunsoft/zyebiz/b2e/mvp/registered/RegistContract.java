package com.sunsoft.zyebiz.b2e.mvp.registered;

import java.util.HashMap;

/**
 * Created by MJX on 2017/1/12.
 */
public interface RegistContract {
    interface IRegist1View{
        String getUserName();
        String getMobile();
        String getCheckNum();
    }

    interface IRegist1Presenter{
        void checkRegistStepOneMsg();
    }

    interface IRegist1Module{
        void requestRegist1(String url, HashMap<String, String> map);
    }
    interface IRegist2View{
        String getPassword();
        String getSurePassword();
        String getMobileNum();
    }

    interface IRegist2Presenter{
        void getMobileNum(String type);
    }

    interface IRegist2Module{
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
