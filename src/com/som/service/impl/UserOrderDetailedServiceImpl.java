package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IUserOrderDetailedDao;
import com.som.model.UserOrderDetailed;
import com.som.service.IUserOrderDetailedService;

@Service
@Transactional
public class UserOrderDetailedServiceImpl implements IUserOrderDetailedService {

	@Autowired
	private IUserOrderDetailedDao iuodd;

	public void add(UserOrderDetailed uod) {
		iuodd.add(uod);
	}

	public void delete(Integer id) {
		iuodd.delete(id);
	}

	public void update(UserOrderDetailed uod) {
		iuodd.update(uod);
	}

	public List<UserOrderDetailed> find() {
		return iuodd.find();
	}

	public UserOrderDetailed find(Integer id) {
		return iuodd.find(id);
	}

}
