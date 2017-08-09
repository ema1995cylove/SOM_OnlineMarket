package com.som.model;

import java.io.Serializable;

public class LinkMarketAddress implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer marketAddress_id;
	private String marketAddress_detailed;

	private AddressProvince marketAddress_province;
	private AddressCity marketAddress_city;
	private AddressContry marketAddress_contry;
	// 一对一，没有外键方配1-1
	private MarketBasicInformation marketBasicInformation;

	@Override
	public String toString() {
		return "LinkMarketAddress [marketAddress_id=" + marketAddress_id
				+ ", marketAddress_detailed=" + marketAddress_detailed
				+ ", marketAddress_province=" + marketAddress_province
				+ ", marketAddress_city=" + marketAddress_city
				+ ", marketAddress_contry=" + marketAddress_contry + "]";
	}

	public Integer getMarketAddress_id() {
		return marketAddress_id;
	}

	public void setMarketAddress_id(Integer marketAddress_id) {
		this.marketAddress_id = marketAddress_id;
	}

	public String getMarketAddress_detailed() {
		return marketAddress_detailed;
	}

	public void setMarketAddress_detailed(String marketAddress_detailed) {
		this.marketAddress_detailed = marketAddress_detailed;
	}

	public AddressProvince getMarketAddress_province() {
		return marketAddress_province;
	}

	public void setMarketAddress_province(AddressProvince marketAddress_province) {
		this.marketAddress_province = marketAddress_province;
	}

	public AddressCity getMarketAddress_city() {
		return marketAddress_city;
	}

	public void setMarketAddress_city(AddressCity marketAddress_city) {
		this.marketAddress_city = marketAddress_city;
	}

	public AddressContry getMarketAddress_contry() {
		return marketAddress_contry;
	}

	public void setMarketAddress_contry(AddressContry marketAddress_contry) {
		this.marketAddress_contry = marketAddress_contry;
	}

	public MarketBasicInformation getMarketBasicInformation() {
		return marketBasicInformation;
	}

	public void setMarketBasicInformation(
			MarketBasicInformation marketBasicInformation) {
		this.marketBasicInformation = marketBasicInformation;
	}

}
