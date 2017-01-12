package com.sunsoft.zyebiz.b2e.bean.net.serverUrl;

/**
 * Created by MJX on 2017/1/6.
 */
public class ServerBean {

    /**
     * title : null
     * body : {"obj":{"bundleCode":"103.0","referer":null,"bundleIsUpdate":"0","bundleUrl":"https://ssl.ygzykj.com/app/bundle/android/102_3_7/bundle/103_0/android_20161229_102_3_7_103_0.zip","auditBaseEntity":null,"pageSize":0,"type":"10","content":"乌拉拉乌拉拉想要回家乌拉拉乌拉拉快快回家","deleteFlag":"0","operatorTime":null,"pageNo":0,"operatorUname":null,"hashCode":null,"serverUrl":"https://ssl.ygzykj.com/sunsoft-app/","operatorUid":null,"reserve1":null,"reserve3":null,"reserve2":null,"versionCode":"102.3.7","url":"https://ssl.ygzykj.com/app/apk/10237-20161222-001.apk","sha1":null,"versionId":"c9870e7e59464b33a4ddba4b5b491e40","tranIP":null,"createTime":"20161228143416","operatorRname":null,"isUpdate":"0"},"msgInfo":"","msgCode":"0"}
     * message : null
     */
    private String title;        //更新名称等
    private BodyEntity body;     //版本信息等
    private String message;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(BodyEntity body) {
        this.body = body;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTitle() {
        return title;
    }

    public BodyEntity getBody() {
        return body;
    }

    public String getMessage() {
        return message;
    }

    public class BodyEntity {
        /**
         * obj : {"bundleCode":"103.0","referer":null,"bundleIsUpdate":"0","bundleUrl":"https://ssl.ygzykj.com/app/bundle/android/102_3_7/bundle/103_0/android_20161229_102_3_7_103_0.zip","auditBaseEntity":null,"pageSize":0,"type":"10","content":"乌拉拉乌拉拉想要回家乌拉拉乌拉拉快快回家","deleteFlag":"0","operatorTime":null,"pageNo":0,"operatorUname":null,"hashCode":null,"serverUrl":"https://ssl.ygzykj.com/sunsoft-app/","operatorUid":null,"reserve1":null,"reserve3":null,"reserve2":null,"versionCode":"102.3.7","url":"https://ssl.ygzykj.com/app/apk/10237-20161222-001.apk","sha1":null,"versionId":"c9870e7e59464b33a4ddba4b5b491e40","tranIP":null,"createTime":"20161228143416","operatorRname":null,"isUpdate":"0"}
         * msgInfo :
         * msgCode : 0
         */
        private ObjEntity obj;
        private String msgInfo;
        private String msgCode;

        public void setObj(ObjEntity obj) {
            this.obj = obj;
        }

        public void setMsgInfo(String msgInfo) {
            this.msgInfo = msgInfo;
        }

        public void setMsgCode(String msgCode) {
            this.msgCode = msgCode;
        }

        public ObjEntity getObj() {
            return obj;
        }

        public String getMsgInfo() {
            return msgInfo;
        }

        public String getMsgCode() {
            return msgCode;
        }

        public class ObjEntity {
            /**
             * bundleCode : 103.0
             * referer : null
             * bundleIsUpdate : 0
             * bundleUrl : https://ssl.ygzykj.com/app/bundle/android/102_3_7/bundle/103_0/android_20161229_102_3_7_103_0.zip
             * auditBaseEntity : null
             * pageSize : 0
             * type : 10
             * content : 乌拉拉乌拉拉想要回家乌拉拉乌拉拉快快回家
             * deleteFlag : 0
             * operatorTime : null
             * pageNo : 0
             * operatorUname : null
             * hashCode : null
             * serverUrl : https://ssl.ygzykj.com/sunsoft-app/
             * operatorUid : null
             * reserve1 : null
             * reserve3 : null
             * reserve2 : null
             * versionCode : 102.3.7
             * url : https://ssl.ygzykj.com/app/apk/10237-20161222-001.apk
             * sha1 : null
             * versionId : c9870e7e59464b33a4ddba4b5b491e40
             * tranIP : null
             * createTime : 20161228143416
             * operatorRname : null
             * isUpdate : 0
             */
            private String bundleCode;
            private String referer;
            private String bundleIsUpdate;
            private String bundleUrl;
            private String auditBaseEntity;
            private int pageSize;
            private String type;
            private String content;
            private String deleteFlag;
            private String operatorTime;
            private int pageNo;
            private String operatorUname;
            private String hashCode;
            private String serverUrl;
            private String operatorUid;
            private String reserve1;
            private String reserve3;
            private String reserve2;
            private String versionCode;
            private String url;
            private String sha1;
            private String versionId;
            private String tranIP;
            private String createTime;
            private String operatorRname;
            private String isUpdate;

            public void setBundleCode(String bundleCode) {
                this.bundleCode = bundleCode;
            }

            public void setReferer(String referer) {
                this.referer = referer;
            }

            public void setBundleIsUpdate(String bundleIsUpdate) {
                this.bundleIsUpdate = bundleIsUpdate;
            }

            public void setBundleUrl(String bundleUrl) {
                this.bundleUrl = bundleUrl;
            }

            public void setAuditBaseEntity(String auditBaseEntity) {
                this.auditBaseEntity = auditBaseEntity;
            }

            public void setPageSize(int pageSize) {
                this.pageSize = pageSize;
            }

            public void setType(String type) {
                this.type = type;
            }

            public void setContent(String content) {
                this.content = content;
            }

            public void setDeleteFlag(String deleteFlag) {
                this.deleteFlag = deleteFlag;
            }

            public void setOperatorTime(String operatorTime) {
                this.operatorTime = operatorTime;
            }

            public void setPageNo(int pageNo) {
                this.pageNo = pageNo;
            }

            public void setOperatorUname(String operatorUname) {
                this.operatorUname = operatorUname;
            }

            public void setHashCode(String hashCode) {
                this.hashCode = hashCode;
            }

            public void setServerUrl(String serverUrl) {
                this.serverUrl = serverUrl;
            }

            public void setOperatorUid(String operatorUid) {
                this.operatorUid = operatorUid;
            }

            public void setReserve1(String reserve1) {
                this.reserve1 = reserve1;
            }

            public void setReserve3(String reserve3) {
                this.reserve3 = reserve3;
            }

            public void setReserve2(String reserve2) {
                this.reserve2 = reserve2;
            }

            public void setVersionCode(String versionCode) {
                this.versionCode = versionCode;
            }

            public void setUrl(String url) {
                this.url = url;
            }

            public void setSha1(String sha1) {
                this.sha1 = sha1;
            }

            public void setVersionId(String versionId) {
                this.versionId = versionId;
            }

            public void setTranIP(String tranIP) {
                this.tranIP = tranIP;
            }

            public void setCreateTime(String createTime) {
                this.createTime = createTime;
            }

            public void setOperatorRname(String operatorRname) {
                this.operatorRname = operatorRname;
            }

            public void setIsUpdate(String isUpdate) {
                this.isUpdate = isUpdate;
            }

            public String getBundleCode() {
                return bundleCode;
            }

            public String getReferer() {
                return referer;
            }

            public String getBundleIsUpdate() {
                return bundleIsUpdate;
            }

            public String getBundleUrl() {
                return bundleUrl;
            }

            public String getAuditBaseEntity() {
                return auditBaseEntity;
            }

            public int getPageSize() {
                return pageSize;
            }

            public String getType() {
                return type;
            }

            public String getContent() {
                return content;
            }

            public String getDeleteFlag() {
                return deleteFlag;
            }

            public String getOperatorTime() {
                return operatorTime;
            }

            public int getPageNo() {
                return pageNo;
            }

            public String getOperatorUname() {
                return operatorUname;
            }

            public String getHashCode() {
                return hashCode;
            }

            public String getServerUrl() {
                return serverUrl;
            }

            public String getOperatorUid() {
                return operatorUid;
            }

            public String getReserve1() {
                return reserve1;
            }

            public String getReserve3() {
                return reserve3;
            }

            public String getReserve2() {
                return reserve2;
            }

            public String getVersionCode() {
                return versionCode;
            }

            public String getUrl() {
                return url;
            }

            public String getSha1() {
                return sha1;
            }

            public String getVersionId() {
                return versionId;
            }

            public String getTranIP() {
                return tranIP;
            }

            public String getCreateTime() {
                return createTime;
            }

            public String getOperatorRname() {
                return operatorRname;
            }

            public String getIsUpdate() {
                return isUpdate;
            }
        }
    }
}
