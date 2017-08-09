package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.IAddressProvinceDao;
import com.som.model.AddressProvince;
import com.som.service.IAddressProvinceService;

@Service
@Transactional
public class AddressProvinceServiceImpl implements IAddressProvinceService {

	@Autowired
	private IAddressProvinceDao iapd;

	public void delete(Integer id) {
		iapd.delete(id);
	}

	public void update(AddressProvince ap) {
		iapd.update(ap);
	}

	public AddressProvince find(Integer id) {
		return iapd.find(id);
	}

	public void add(AddressProvince province) {
		iapd.add(province);
	}

	public List<AddressProvince> find() {
		return iapd.find();
	}

	public AddressProvince getByName(String name) {
		return iapd.getByName(name);
	}

}
