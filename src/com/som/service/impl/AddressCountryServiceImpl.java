package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IAddressContryDao;
import com.som.model.AddressContry;
import com.som.service.IAddressCountryService;

@Service
@Transactional
public class AddressCountryServiceImpl implements IAddressCountryService {

	@Autowired
	private IAddressContryDao iacd;

	public void delete(Integer id) {
		iacd.delete(id);
	}

	public void update(AddressContry aco) {
		iacd.update(aco);
	}

	public AddressContry find(Integer id) {
		return iacd.find(id);
	}

	public void delete(AddressContry country) {
		iacd.delete(country);
	}

	public void add(AddressContry country) {
		iacd.add(country);
	}

	public List<AddressContry> getByCity(int cityId) {
		return iacd.getByCity(cityId);
	}

	public AddressContry getByName(String name) {
		return iacd.getByName(name);
	}

}
