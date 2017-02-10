package com.sunsoft.zyebiz.b2e.enity.net.registered.registered1;

/**
 * 注册1页
 * Created by MJX on 2017/2/10.
 */
public class Registered1Bean {

    /**
     * obj : {"title":"请输入正确的验证码","body":null,"message":null}
     * msgCode : 1
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
         * title : 请输入正确的验证码
         * body : null
         * message : null
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
