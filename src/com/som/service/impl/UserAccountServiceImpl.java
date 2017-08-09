package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IUserAcconutDao;
import com.som.model.UserAccount;
import com.som.service.IUserAccountService;

@Service
@Transactional
public class UserAccountServiceImpl implements IUserAccountService {
	@Autowired
	private IUserAcconutDao iua;

	public void add(UserAccount ua) {
		iua.add(ua);
	}

	public void delete(Integer id) {
		iua.delete(id);
	}

	public void update(UserAccount ua) {
		iua.update(ua);
	}

	public List<UserAccount> find() {
		return iua.find();
	}

	public UserAccount find(Integer id) {
		return iua.find(id);
	}

	public UserAccount getByAccount(String account) {
		return iua.getByAccount(account);
	}

	public UserAccount find(int idI) {
		return iua.find(idI);
	}
}
