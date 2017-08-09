package com.som.dao;

import java.util.List;

import com.som.model.UserOrderDetailed;

public interface IUserOrderDetailedDao {
	void add(UserOrderDetailed uod);

	void delete(Integer id);

	void update(UserOrderDetailed uod);

	List<UserOrderDetailed> find();

	UserOrderDetailed find(Integer id);
}
