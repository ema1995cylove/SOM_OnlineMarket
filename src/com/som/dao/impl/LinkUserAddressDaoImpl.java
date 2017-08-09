package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.ILinkUserAddressDao;
import com.som.model.LinkUserAddress;

@Repository
public class LinkUserAddressDaoImpl implements ILinkUserAddressDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(LinkUserAddress lua) {
		getSession().save(lua);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(LinkUserAddress lua) {
		getSession().update(lua);
	}

	@SuppressWarnings("unchecked")
	public List<LinkUserAddress> find() {
		return getSession().createQuery("FROM LinkUserAddress").list();
	}

	public LinkUserAddress find(Integer id) {
		return (LinkUserAddress) getSession().get(LinkUserAddress.class, id);
	}

}
