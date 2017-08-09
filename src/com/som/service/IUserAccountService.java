package com.som.service;

import java.util.List;

import com.som.model.UserAccount;

public interface IUserAccountService {
	void add(UserAccount ua);

	void delete(Integer id);

	void update(UserAccount ua);

	List<UserAccount> find();

	UserAccount find(Integer id);

	UserAccount getByAccount(String account);
}
