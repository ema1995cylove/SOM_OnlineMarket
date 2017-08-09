package com.som.model;

import java.util.Set;

public class MarketBasicInformation {
	private Integer market_id;
	private String market_name;
	private String market_logo;
	// 一对一，有外键方 配many-1
	private LinkMarketAddress market_address;
	private UserAccount market_user;

	private Set<MarketFirstClass> market_first;
	private Set<MarketCommodity> market_commodity;
	private Set<UserOrder> market_userOrders;
	private Set<UserAccount> vipUser;

	@Override
	public String toString() {
		return "MarketBasicInformation [market_id=" + market_id
				+ ", market_name=" + market_name + ", market_logo="
				+ market_logo + ", market_address=" + market_address
				+ ", market_user=" + market_user + "]";
	}

	public Integer getMarket_id() {
		return market_id;
	}

	public void setMarket_id(Integer market_id) {
		this.market_id = market_id;
	}

	public String getMarket_name() {
		return market_name;
	}

	public void setMarket_name(String market_name) {
		this.market_name = market_name;
	}

	public String getMarket_logo() {
		return market_logo;
	}

	public void setMarket_logo(String market_logo) {
		this.market_logo = market_logo;
	}

	public LinkMarketAddress getMarket_address() {
		return market_address;
	}

	public void setMarket_address(LinkMarketAddress market_address) {
		this.market_address = market_address;
	}

	public UserAccount getMarket_user() {
		return market_user;
	}

	public void setMarket_user(UserAccount market_user) {
		this.market_user = market_user;
	}

	public Set<MarketFirstClass> getMarket_first() {
		return market_first;
	}

	public void setMarket_first(Set<MarketFirstClass> market_first) {
		this.market_first = market_first;
	}

	public Set<MarketCommodity> getMarket_commodity() {
		return market_commodity;
	}

	public void setMarket_commodity(Set<MarketCommodity> market_commodity) {
		this.market_commodity = market_commodity;
	}

	public Set<UserOrder> getMarket_userOrders() {
		return market_userOrders;
	}

	public void setMarket_userOrders(Set<UserOrder> market_userOrders) {
		this.market_userOrders = market_userOrders;
	}

	public Set<UserAccount> getVipUser() {
		return vipUser;
	}

	public void setVipUser(Set<UserAccount> vipUser) {
		this.vipUser = vipUser;
	}

}