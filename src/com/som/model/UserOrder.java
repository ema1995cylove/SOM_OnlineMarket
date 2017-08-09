package com.som.model;

import java.util.Date;
import java.util.Set;

public class UserOrder {
	private Integer oderId;
	private Date orderDate;
	private String orderCode;
	private int orderStatus;

	public int getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(int orderStatus) {
		this.orderStatus = orderStatus;
	}

	private UserAccount user;
	private MarketBasicInformation marketBaseInfamation;
	private Set<UserOrderDetailed> orderDetailed;

	public Set<UserOrderDetailed> getOrderDetailed() {
		return orderDetailed;
	}

	public void setOrderDetailed(Set<UserOrderDetailed> orderDetailed) {
		this.orderDetailed = orderDetailed;
	}

	public Integer getOderId() {
		return oderId;
	}

	public void setOderId(Integer oderId) {
		this.oderId = oderId;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public UserAccount getUser() {
		return user;
	}

	public void setUser(UserAccount user) {
		this.user = user;
	}

	public MarketBasicInformation getMarketBaseInfamation() {
		return marketBaseInfamation;
	}

	public void setMarketBaseInfamation(
			MarketBasicInformation marketBaseInfamation) {
		this.marketBaseInfamation = marketBaseInfamation;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

}
