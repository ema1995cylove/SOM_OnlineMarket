package com.som.dao;

import java.util.List;

import com.som.model.UserOrder;

public interface IUserOrderDao {
	void add(UserOrder uo);

	void delete(Integer id);

	void update(UserOrder uo);

	List<UserOrder> find();

	UserOrder find(Integer id);

	List<UserOrder> getByMarketId(Integer marketId);
}
