package com.som.service;

import java.util.List;

import com.som.model.UserOrderDetailed;

public interface IUserOrderDetailedService {
	void add(UserOrderDetailed uod);

	void delete(Integer id);

	void update(UserOrderDetailed uod);

	List<UserOrderDetailed> find();

	UserOrderDetailed find(Integer id);
}
