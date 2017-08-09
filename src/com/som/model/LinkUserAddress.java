package com.som.model;

public class LinkUserAddress {
	private Integer id;
	private String user_detailAddress;

	private AddressProvince user_province;
	private AddressCity user_city;
	private AddressContry user_contry;

	private UserAccount address_userAccount;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUser_detailAddress() {
		return user_detailAddress;
	}

	public void setUser_detailAddress(String user_detailAddress) {
		this.user_detailAddress = user_detailAddress;
	}

	public AddressProvince getUser_province() {
		return user_province;
	}

	public void setUser_province(AddressProvince user_province) {
		this.user_province = user_province;
	}

	public AddressCity getUser_city() {
		return user_city;
	}

	public void setUser_city(AddressCity user_city) {
		this.user_city = user_city;
	}

	public AddressContry getUser_contry() {
		return user_contry;
	}

	public void setUser_contry(AddressContry user_contry) {
		this.user_contry = user_contry;
	}

	public UserAccount getAddress_userAccount() {
		return address_userAccount;
	}

	public void setAddress_userAccount(UserAccount address_userAccount) {
		this.address_userAccount = address_userAccount;
	}

}
