package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IAddressCityDao;
import com.som.model.AddressCity;
import com.som.service.IAddressCityService;

@Service
@Transactional
public class AddressCityServiceImpl implements IAddressCityService {

	@Autowired
	private IAddressCityDao iacd;

	public void dalete(Integer id) {
		iacd.dalete(id);
	}

	public void update(AddressCity aci) {
		iacd.update(aci);
	}

	public AddressCity find(Integer id) {
		return iacd.find(id);
	}

	public void add(AddressCity city) {
		iacd.add(city);
	}

	public List<AddressCity> getByProvince(int provinceId) {
		return iacd.getByProvince(provinceId);
	}

	public AddressCity getByName(String name) {
		return iacd.getByName(name);
	}
}
