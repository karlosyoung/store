package com.sunsoft.zyebiz.b2e.enity.net.login;

import java.io.Serializable;

public class SchoolResult implements Serializable{
	private String schoolId;
	private String schoolName;
	private String gradeNo;
	private String classNo;

	public String getProvinceRegionName() {
		return provinceRegionName;
	}

	public void setProvinceRegionName(String provinceRegionName) {
		this.provinceRegionName = provinceRegionName;
	}

	public String getCityRegionName() {
		return cityRegionName;
	}

	public void setCityRegionName(String cityRegionName) {
		this.cityRegionName = cityRegionName;
	}

	public String getDistrictRegionName() {
		return districtRegionName;
	}

	public void setDistrictRegionName(String districtRegionName) {
		this.districtRegionName = districtRegionName;
	}

	//新添加了三个参数，省市区
	//省
	private String provinceRegionName;
	//市
	private String cityRegionName;
	//区
	private String districtRegionName;

	public String getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(String schoolId) {
		this.schoolId = schoolId;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public String getGradeNo() {
		return gradeNo;
	}
	public void setGradeNo(String gradeNo) {
		this.gradeNo = gradeNo;
	}
	public String getClassNo() {
		return classNo;
	}
	public void setClassNo(String classNo) {
		this.classNo = classNo;
	}
	
	
	

}
