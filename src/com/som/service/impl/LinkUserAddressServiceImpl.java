package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.ILinkUserAddressDao;
import com.som.model.LinkUserAddress;
import com.som.service.ILinkUserAddressService;

@Service
@Transactional
public class LinkUserAddressServiceImpl implements ILinkUserAddressService {

	@Autowired
	private ILinkUserAddressDao iluad;

	public void add(LinkUserAddress lua) {
		iluad.add(lua);
	}

	public void delete(Integer id) {
		iluad.delete(id);
	}

	public void update(LinkUserAddress lua) {
		iluad.update(lua);
	}

	public List<LinkUserAddress> find() {
		return iluad.find();
	}

	public LinkUserAddress find(Integer id) {
		return iluad.find(id);
	}

}
