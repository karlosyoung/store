package com.sunsoft.zyebiz.b2e.enity.net.login;

import java.io.Serializable;

/**
 * 登陆时的信息
 */
public class LoginBean implements Serializable{
	/**
	 * msgCode : 3
	 * obj : {"title":null,"body":null,"message":"用户名与密码不匹配"}
	 */

	private String msgCode;
	private ObjBean obj;

	public String getMsgCode() {
		return msgCode;
	}

	public void setMsgCode(String msgCode) {
		this.msgCode = msgCode;
	}

	public ObjBean getObj() {
		return obj;
	}

	public void setObj(ObjBean obj) {
		this.obj = obj;
	}

	public static class ObjBean {
		/**
		 * title : null
		 * body : null
		 * message : 用户名与密码不匹配
		 */

		private Object title;
		private Object body;
		private String message;

		public Object getTitle() {
			return title;
		}

		public void setTitle(Object title) {
			this.title = title;
		}

		public Object getBody() {
			return body;
		}

		public void setBody(Object body) {
			this.body = body;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}

}
