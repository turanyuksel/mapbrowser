package com.turanyuksel.geocounter.model;

import java.math.BigDecimal;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;

public class StatDto {
	@DecimalMax("90.0")
	@DecimalMin("-90.0")
	private BigDecimal lat;
	@DecimalMax("180.0")
	@DecimalMin("-180.0")
	private BigDecimal lng;
	private long popularity;
	public StatDto() {
		super();
	}
	public StatDto(StatDto other) {
		super();
		this.lat = other.lat;
		this.lng = other.lng;
	}
	public BigDecimal getLat() {
		return lat;
	}
	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}
	public BigDecimal getLng() {
		return lng;
	}
	public void setLng(BigDecimal lng) {
		this.lng = lng;
	}
	public long getPopularity() {
		return popularity;
	}
	public void setPopularity(long popularity) {
		this.popularity = popularity;
	}
}
