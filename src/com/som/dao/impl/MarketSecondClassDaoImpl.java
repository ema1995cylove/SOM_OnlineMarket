package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IMarketSecondClassDao;
import com.som.model.MarketSecondClass;

@Repository
public class MarketSecondClassDaoImpl implements IMarketSecondClassDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(MarketSecondClass msc) {
		getSession().save(msc);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(MarketSecondClass msc) {
		getSession().update(msc);
	}

	@SuppressWarnings("unchecked")
	public List<MarketSecondClass> find() {
		return getSession().createQuery("FROM MarketSecondClass").list();
	}

	public MarketSecondClass find(Integer id) {
		return (MarketSecondClass) getSession()
				.get(MarketSecondClass.class, id);
	}

}
