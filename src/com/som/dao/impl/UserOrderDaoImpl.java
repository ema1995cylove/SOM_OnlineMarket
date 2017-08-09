package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IUserOrderDao;
import com.som.model.UserOrder;

@Repository
public class UserOrderDaoImpl implements IUserOrderDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(UserOrder uo) {
		getSession().save(uo);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(UserOrder uo) {
		getSession().update(uo);
	}

	@SuppressWarnings("unchecked")
	public List<UserOrder> find() {
		return getSession().createQuery("FROM UserOrder").list();
	}

	public UserOrder find(Integer id) {
		return (UserOrder) getSession().get(UserOrder.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<UserOrder> getByMarketId(Integer marketId) {
		return getSession().createQuery(
				"from UserOrder where marketBaseInfamation=" + marketId).list();
	}

}
