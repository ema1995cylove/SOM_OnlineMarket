package com.som.service;

import java.util.List;

import com.som.model.UserCart;

public interface IUserCartService {
	void add(UserCart uc);

	void delete(Integer id);

	void update(UserCart uc);

	List<UserCart> find();

	UserCart find(Integer id);

	UserCart getById(Integer commodityId, Integer userId);
}
