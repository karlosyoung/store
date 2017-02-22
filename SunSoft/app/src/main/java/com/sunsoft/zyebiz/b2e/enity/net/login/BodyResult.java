package com.sunsoft.zyebiz.b2e.enity.net.login;

import java.io.Serializable;

public class BodyResult implements Serializable{
	private LoginResult user;
	private SchoolResult school;
	public LoginResult getUser() {
		return user;
	}
	public void setUser(LoginResult user) {
		this.user = user;
	}
	public SchoolResult getSchool() {
		return school;
	}
	public void setSchool(SchoolResult school) {
		this.school = school;
	}
	
	
	
	
	
	

}
