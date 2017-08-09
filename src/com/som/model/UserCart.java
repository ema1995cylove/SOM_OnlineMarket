package com.som.model;

public class UserCart {
	private int id;
	private Integer cartCommodityCount;

	private UserAccount cart_userAccount;
	private MarketCommodity marketCommdity;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getCartCommodityCount() {
		return cartCommodityCount;
	}

	public void setCartCommodityCount(Integer cartCommodityCount) {
		this.cartCommodityCount = cartCommodityCount;
	}

	public UserAccount getCart_userAccount() {
		return cart_userAccount;
	}

	public void setCart_userAccount(UserAccount cart_userAccount) {
		this.cart_userAccount = cart_userAccount;
	}

	public MarketCommodity getMarketCommdity() {
		return marketCommdity;
	}

	public void setMarketCommdity(MarketCommodity marketCommdity) {
		this.marketCommdity = marketCommdity;
	}

}
