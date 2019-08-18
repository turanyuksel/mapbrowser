package com.turanyuksel.geocounter.service;

public class GeoMath {
	
	static final int EARTH_RADIUS = 6371; // in km
	/**
	 * see: https://github.com/jasonwinn/haversine/
	 * @param startLat
	 * @param startLong
	 * @param endLat
	 * @param endLong
	 * @return
	 */
	static double distance(double startLat, double startLong, double endLat, double endLong) {
	
	    double deltaT  = Math.toRadians(endLat - startLat);
	    double deltaG = Math.toRadians(endLong - startLong);
	
	    double a = haversin(deltaT) + Math.cos(Math.toRadians(startLat)) * Math.cos(Math.toRadians(endLat)) * haversin(deltaG);
	    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
	    return EARTH_RADIUS * c;
	}
	
	public static double haversin(double val) {
	    return Math.pow(Math.sin(val / 2), 2);
	}
	
}

