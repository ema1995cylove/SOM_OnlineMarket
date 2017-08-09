package com.som.model;

import java.io.Serializable;

/**
 * @author lenovo
 * 
 */
public class AddressContry implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer contry_id;
	private String contry_name;

	private AddressCity contry_city;

	@Override
	public String toString() {
		return "AddressContry [contry_id=" + contry_id + ", contry_name="
				+ contry_name + "]";
	}

	public Integer getContry_id() {
		return contry_id;
	}

	public void setContry_id(Integer contry_id) {
		this.contry_id = contry_id;
	}

	public String getContry_name() {
		return contry_name;
	}

	public void setContry_name(String contry_name) {
		this.contry_name = contry_name;
	}

	public AddressCity getContry_city() {
		return contry_city;
	}

	public void setContry_city(AddressCity contry_city) {
		this.contry_city = contry_city;
	}

}
