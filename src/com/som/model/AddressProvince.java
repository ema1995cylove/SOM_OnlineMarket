package com.som.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class AddressProvince implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer province_id;
	private String province_name;

	private Set<AddressCity> province_city = new HashSet<AddressCity>();

	public AddressProvince() {
	}

	public AddressProvince(String province_name) {
		this.province_name = province_name;
	}

	public AddressProvince(Integer province_id, String province_name) {
		super();
		this.province_id = province_id;
		this.province_name = province_name;
	}

	@Override
	public String toString() {
		return "AddressProvince [province_id=" + province_id
				+ ", province_name=" + province_name + "]";
	}

	public Integer getProvince_id() {
		return province_id;
	}

	public void setProvince_id(Integer province_id) {
		this.province_id = province_id;
	}

	public String getProvince_name() {
		return province_name;
	}

	public void setProvince_name(String province_name) {
		this.province_name = province_name;
	}

	public Set<AddressCity> getProvince_city() {
		return province_city;
	}

	public void setProvince_city(Set<AddressCity> province_city) {
		this.province_city = province_city;
	}

}
