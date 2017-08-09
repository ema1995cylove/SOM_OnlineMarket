package com.som.service;

import java.util.List;

import com.som.model.UserOrder;

public interface IUserOrderService {
	void add(UserOrder uo);

	void delete(Integer id);

	void update(UserOrder uo);

	List<UserOrder> find();

	UserOrder find(Integer id);
	
	List<UserOrder> getByMarketId(Integer marketId);
}