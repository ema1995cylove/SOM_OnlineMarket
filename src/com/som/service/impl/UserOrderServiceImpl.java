package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IUserOrderDao;
import com.som.model.UserOrder;
import com.som.service.IUserOrderService;

@Service
@Transactional
public class UserOrderServiceImpl implements IUserOrderService {

	@Autowired
	private IUserOrderDao iuod;

	public void add(UserOrder uo) {
		iuod.add(uo);
	}

	public void delete(Integer id) {
		iuod.delete(id);
	}

	public void update(UserOrder uo) {
		iuod.update(uo);
	}

	public List<UserOrder> find() {
		return iuod.find();
	}

	public UserOrder find(Integer id) {
		return iuod.find(id);
	}

	public List<UserOrder> getByMarketId(Integer marketId) {
		return iuod.getByMarketId(marketId);
	}

}
