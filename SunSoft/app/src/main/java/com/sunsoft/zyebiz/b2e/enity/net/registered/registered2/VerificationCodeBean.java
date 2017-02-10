package com.sunsoft.zyebiz.b2e.enity.net.registered.registered2;

/**
 * 手机验证码
 * Created by MJX on 2017/2/10.
 */
public class VerificationCodeBean {

    /**
     * obj : {"title":null,"body":"7832","message":"短信已发送，请注意查收"}
     * msgCode : 0
     */
    private ObjEntity obj;
    private String msgCode;

    public void setObj(ObjEntity obj) {
        this.obj = obj;
    }

    public void setMsgCode(String msgCode) {
        this.msgCode = msgCode;
    }

    public ObjEntity getObj() {
        return obj;
    }

    public String getMsgCode() {
        return msgCode;
    }

    public class ObjEntity {
        /**
         * title : null
         * body : 7832
         * message : 短信已发送，请注意查收
         */
        private String title;
        private String body;
        private String message;

        public void setTitle(String title) {
            this.title = title;
        }

        public void setBody(String body) {
            this.body = body;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getTitle() {
            return title;
        }

        public String getBody() {
            return body;
        }

        public String getMessage() {
            return message;
        }
    }
}
