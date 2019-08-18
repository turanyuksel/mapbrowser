package com.turanyuksel.geocounter.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Stat {
	@Id
	private String id;
	@GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
	private GeoJsonPoint position;
	
	private long popularity;
	
	@PersistenceConstructor
	public Stat() {
		super();
	}
	public Stat(double[] location) {
		popularity = 0L;
		setPosition(new GeoJsonPoint(location[0], location[1]));
	}
	public long getPopularity() {
		return popularity;
	}

	public void setPopularity(long popularity) {
		this.popularity = popularity;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public GeoJsonPoint getPosition() {
		return position;
	}

	public void setPosition(GeoJsonPoint geoLocation) {
		this.position = geoLocation;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Stat other = (Stat) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
