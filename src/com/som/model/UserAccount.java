package com.som.model;

import java.util.Date;
import java.util.Set;

public class UserAccount {
	private Integer accountId;
	private String accountNumber;
	private String accountPassword;
	private Integer accountPower;
	private String userName;
	private String userLogo;
	private Date userBirthday;
	private String userSex;

	private Set<UserCart> userCarts;
	private Set<LinkUserAddress> userAddresses;
	private Set<UserOrder> userOrders;
	private Set<MarketBasicInformation> vipMarket;

	public String getUserSex() {
		return userSex;
	}

	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}

	public Set<MarketBasicInformation> getVipMarket() {
		return vipMarket;
	}

	public void setVipMarket(Set<MarketBasicInformation> vipMarket) {
		this.vipMarket = vipMarket;
	}

	public UserAccount() {
	}
	
	@Override
	public int hashCode() {
		return this.accountNumber.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof UserAccount) {
			UserAccount u = (UserAccount) obj;
			return u.getAccountNumber().equals(this.accountNumber);
		}

		return false;
	}

	@Override
	public String toString() {
		return "UserAccount [accountId=" + accountId + ", accountPassword="
				+ accountPassword + ", accountNumber=" + accountNumber
				+ ", accountPower=" + accountPower + ", userName=" + userName
				+ ", userLogo=" + userLogo + ", userBirthday=" + userBirthday
				+ "]";
	}

	public Set<UserOrder> getUserOrders() {
		return userOrders;
	}

	public void setUserOrders(Set<UserOrder> userOrders) {
		this.userOrders = userOrders;
	}

	public Set<LinkUserAddress> getUserAddresses() {
		return userAddresses;
	}

	public void setUserAddresses(Set<LinkUserAddress> userAddresses) {
		this.userAddresses = userAddresses;
	}

	public Set<UserCart> getUserCarts() {
		return userCarts;
	}

	public void setUserCarts(Set<UserCart> userCarts) {
		this.userCarts = userCarts;
	}

	public String getAccountPassword() {
		return accountPassword;
	}

	public void setAccountPassword(String accountPassword) {
		this.accountPassword = accountPassword;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public Integer getAccountPower() {
		return accountPower;
	}

	public void setAccountPower(Integer accountPower) {
		this.accountPower = accountPower;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserLogo() {
		return userLogo;
	}

	public void setUserLogo(String userLogo) {
		this.userLogo = userLogo;
	}

	public Date getUserBirthday() {
		return userBirthday;
	}

	public void setUserBirthday(Date userBirthday) {
		this.userBirthday = userBirthday;
	}
}
