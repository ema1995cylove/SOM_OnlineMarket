package com.som.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.som.dao.ILinkMarketAddressDao;
import com.som.model.LinkMarketAddress;
import com.som.service.ILinkMarketAddressService;

@Service
@Transactional
public class LinkMarketAddressServiceImpl implements ILinkMarketAddressService {

	@Autowired
	private ILinkMarketAddressDao ilma;

	public void add(LinkMarketAddress lma) {
		ilma.add(lma);
	}

	public void delete(Integer id) {
		ilma.delete(id);
	}

	public void update(LinkMarketAddress lma) {
		ilma.update(lma);
	}

	public List<LinkMarketAddress> find() {
		return ilma.find();
	}

	public LinkMarketAddress find(Integer id) {
		return ilma.find(id);
	}

	public LinkMarketAddress getByPCCD(int pid, int cid, int coid, String detail) {
		return ilma.getByPCCD(pid, cid, coid, detail);
	}

}
