package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IUserCartDao;
import com.som.model.UserCart;
import com.som.service.IUserCartService;

@Service
@Transactional
public class UserCartServiceImpl implements IUserCartService {

	@Autowired
	private IUserCartDao iucd;

	public void add(UserCart uc) {
		iucd.add(uc);
	}

	public void delete(Integer id) {
		iucd.delete(id);
	}

	public void update(UserCart uc) {
		iucd.update(uc);
	}

	public List<UserCart> find() {
		return iucd.find();
	}

	public UserCart find(Integer id) {
		return iucd.find(id);
	}

	public UserCart getById(Integer commodityId, Integer userId) {
		return iucd.getById(commodityId, userId);
	}
}
