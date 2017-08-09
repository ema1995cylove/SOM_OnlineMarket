package com.som.model;

import java.io.Serializable;
import java.util.Set;

/**
 * @author soil
 */
public class AddressCity implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer city_id;
	private String city_name;
	private AddressProvince city_province;
	private Set<AddressContry> city_contries;

	@Override
	public String toString() {
		return "AddressCity [city_id=" + city_id + ", city_name=" + city_name
				+ "]";
	}

	public Integer getCity_id() {
		return city_id;
	}

	public void setCity_id(Integer city_id) {
		this.city_id = city_id;
	}

	public String getCity_name() {
		return city_name;
	}

	public void setCity_name(String city_name) {
		this.city_name = city_name;
	}

	public AddressProvince getCity_province() {
		return city_province;
	}

	public void setCity_province(AddressProvince city_province) {
		this.city_province = city_province;
	}

	public Set<AddressContry> getCity_contries() {
		return city_contries;
	}

	public void setCity_contries(Set<AddressContry> city_contries) {
		this.city_contries = city_contries;
	}

}
