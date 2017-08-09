package com.som.model;

public class MarketSecondClass {
	private Integer second_class_id;
	private String second_class_name;
	private MarketFirstClass market_first_class;

	public MarketSecondClass() {
	}

	public MarketSecondClass(Integer second_class_id, String second_class_name,
			MarketFirstClass market_first_class) {
		super();
		this.second_class_id = second_class_id;
		this.second_class_name = second_class_name;
		this.market_first_class = market_first_class;
	}

	@Override
	public int hashCode() {
		return this.second_class_name.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof MarketSecondClass) {
			return ((MarketFirstClass) obj).getFirst_class_name().equals(
					this.second_class_name);
		}
		return false;
	}

	@Override
	public String toString() {
		return "MarketSecondClass [second_class_id=" + second_class_id
				+ ", second_class_name=" + second_class_name + "]";
	}

	public Integer getSecond_class_id() {
		return second_class_id;
	}

	public void setSecond_class_id(Integer second_class_id) {
		this.second_class_id = second_class_id;
	}

	public String getSecond_class_name() {
		return second_class_name;
	}

	public void setSecond_class_name(String second_class_name) {
		this.second_class_name = second_class_name;
	}

	public MarketFirstClass getMarket_first_class() {
		return market_first_class;
	}

	public void setMarket_first_class(MarketFirstClass market_first_class) {
		this.market_first_class = market_first_class;
	}

}
