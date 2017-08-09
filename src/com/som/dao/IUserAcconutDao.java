package com.som.dao;

import java.util.List;

import com.som.model.UserAccount;

public interface IUserAcconutDao {
	void add(UserAccount ua);

	void delete(Integer id);

	void update(UserAccount ua);

	List<UserAccount> find();

	UserAccount find(Integer id);

	UserAccount getByAccount(String account);
}
