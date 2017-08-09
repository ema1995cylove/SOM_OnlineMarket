package com.som.model;

public class UserOrderDetailed {
	private Integer id;
	private Integer orderCommodityCount;

	private UserOrder order;
	private MarketCommodity orderCommodity;

	public UserOrderDetailed() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UserOrder getOrder() {
		return order;
	}

	public void setOrder(UserOrder order) {
		this.order = order;
	}

	public MarketCommodity getOrderCommodity() {
		return orderCommodity;
	}

	public void setOrderCommodity(MarketCommodity orderCommodity) {
		this.orderCommodity = orderCommodity;
	}

	public Integer getOrderCommodityCount() {
		return orderCommodityCount;
	}

	public void setOrderCommodityCount(Integer orderCommodityCount) {
		this.orderCommodityCount = orderCommodityCount;
	}

}
