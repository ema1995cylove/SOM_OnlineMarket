package com.som.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.som.dao.IAddressContryDao;
import com.som.model.AddressContry;

@Repository
public class AddressContryDaoImpl implements IAddressContryDao {

	@Autowired
	private SessionFactory sf;

	private Session getSession() {
		return sf.getCurrentSession();
	}

	public void delete(Integer id) {
		getSession().delete(find(id));
	}

	public void update(AddressContry aco) {
		getSession().update(aco);
	}

	public AddressContry find(Integer id) {
		return (AddressContry) getSession().get(AddressContry.class, id);
	}

	public void add(AddressContry country) {
		this.getSession().save(country);
	}

	public void delete(AddressContry country) {
		this.getSession().delete(country);
	}

	@SuppressWarnings("unchecked")
	public List<AddressContry> getByCity(int cityId) {
		return getSession().createQuery(
				"from AddressContry con where con.contry_city.city_id=" + cityId
						+ " order by contry_id asc").list();
	}

	public AddressContry getByName(String name) {
		return (AddressContry) getSession().createQuery(
				"from AddressContry con where con.contry_name='" + name + "'")
				.uniqueResult();
	}
}
