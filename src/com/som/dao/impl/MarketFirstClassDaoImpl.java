package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IMarketFirstClassDao;
import com.som.model.MarketFirstClass;

@Repository
public class MarketFirstClassDaoImpl implements IMarketFirstClassDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(MarketFirstClass mfc) {
		getSession().save(mfc);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(MarketFirstClass mfc) {
		getSession().update(mfc);
	}

	public MarketFirstClass find(Integer id) {
		return (MarketFirstClass) getSession().get(MarketFirstClass.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<MarketFirstClass> find() {
		return getSession().createQuery("FROM MarketFirstClass").list();
	}

}
