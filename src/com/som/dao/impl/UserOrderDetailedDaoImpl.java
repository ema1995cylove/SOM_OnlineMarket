package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IUserOrderDetailedDao;
import com.som.model.UserOrderDetailed;

@Repository
public class UserOrderDetailedDaoImpl implements IUserOrderDetailedDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void add(UserOrderDetailed uod) {
		getSession().save(uod);
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(UserOrderDetailed uod) {
		getSession().update(uod);
	}

	@SuppressWarnings("unchecked")
	public List<UserOrderDetailed> find() {
		return getSession().createQuery("FROM UserOrderDetailed").list();
	}

	public UserOrderDetailed find(Integer id) {
		return (UserOrderDetailed) getSession()
				.get(UserOrderDetailed.class, id);
	}

}
