package com.sunsoft.zyebiz.b2e.enity.net.forgetPwd;

/**
 * Created by Amoly.
 * Data：2017/2/20.
 */

public class ForgetPassBean {

    private BodyBean body;
    private String title;

    public BodyBean getBody() {
        return body;
    }

    public void setBody(BodyBean body) {
        this.body = body;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public static class BodyBean {
        /**
         * frozenMoney : 0.00
         * isValidated : 1
         * mobilePhone : 13800000000
         * password : 96e79218965eb72c92a549dd5a330112
         * regTime : 2017-01-06
         * schoolId : c7040496e61c4d558439d03be6d99993
         * sex : 0
         * token : 615db57aa314529aaa0fbe95b3e95bd3
         * userId : 70e297e20a194699984296cab51b7014
         * userMoney : 0.00
         * userName : 张三
         * userRealName : 张三
         * userType : 99
         */

        private String frozenMoney;
        private String isValidated;
        private String mobilePhone;
        private String password;
        private String regTime;
        private String schoolId;
        private String sex;
        private String token;
        private String userId;
        private String userMoney;
        private String userName;
        private String userRealName;
        private String userType;

        public String getFrozenMoney() {
            return frozenMoney;
        }

        public void setFrozenMoney(String frozenMoney) {
            this.frozenMoney = frozenMoney;
        }

        public String getIsValidated() {
            return isValidated;
        }

        public void setIsValidated(String isValidated) {
            this.isValidated = isValidated;
        }

        public String getMobilePhone() {
            return mobilePhone;
        }

        public void setMobilePhone(String mobilePhone) {
            this.mobilePhone = mobilePhone;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRegTime() {
            return regTime;
        }

        public void setRegTime(String regTime) {
            this.regTime = regTime;
        }

        public String getSchoolId() {
            return schoolId;
        }

        public void setSchoolId(String schoolId) {
            this.schoolId = schoolId;
        }

        public String getSex() {
            return sex;
        }

        public void setSex(String sex) {
            this.sex = sex;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getUserMoney() {
            return userMoney;
        }

        public void setUserMoney(String userMoney) {
            this.userMoney = userMoney;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getUserRealName() {
            return userRealName;
        }

        public void setUserRealName(String userRealName) {
            this.userRealName = userRealName;
        }

        public String getUserType() {
            return userType;
        }

        public void setUserType(String userType) {
            this.userType = userType;
        }
    }
}
