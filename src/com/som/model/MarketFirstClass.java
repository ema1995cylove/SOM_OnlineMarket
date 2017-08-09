package com.som.model;

import java.io.Serializable;
import java.util.Set;

public class MarketFirstClass implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer first_class_id;
	private String first_class_name;

	private Set<MarketSecondClass> secondClasses;

	public MarketFirstClass() {
	}

	public MarketFirstClass(Integer first_class_id, String first_class_name,
			Set<MarketSecondClass> secondClasses) {
		this.first_class_id = first_class_id;
		this.first_class_name = first_class_name;
		this.secondClasses = secondClasses;
	}
	
	@Override
	public int hashCode() {
		return first_class_name.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof MarketFirstClass) {
			return ((MarketFirstClass) obj).getFirst_class_name().equals(
					this.first_class_name);
		}
		return false;
	}

	@Override
	public String toString() {
		return "MarketFirstClass [first_class_id=" + first_class_id
				+ ", first_class_name=" + first_class_name + "]";
	}

	public Integer getFirst_class_id() {
		return first_class_id;
	}

	public void setFirst_class_id(Integer first_class_id) {
		this.first_class_id = first_class_id;
	}

	public String getFirst_class_name() {
		return first_class_name;
	}

	public void setFirst_class_name(String first_class_name) {
		this.first_class_name = first_class_name;
	}

	public Set<MarketSecondClass> getSecondClasses() {
		return secondClasses;
	}

	public void setSecondClasses(Set<MarketSecondClass> secondClasses) {
		this.secondClasses = secondClasses;
	}

}
