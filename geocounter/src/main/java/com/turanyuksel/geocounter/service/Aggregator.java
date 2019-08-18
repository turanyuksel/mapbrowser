package com.turanyuksel.geocounter.service;

import java.math.BigDecimal;

import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.turanyuksel.geocounter.model.Stat;
import com.turanyuksel.geocounter.model.StatDto;

class Aggregator {
	private double[] center;
	private boolean updatedCenter;
	private BulkOperations bulkOps;
	private int searchRadius;
	double popularity;
	int totalWeight;

	Aggregator(StatDto loc, int searchRadius, BulkOperations bulkOps) {
		this.center = new double[] {
				loc.getLat().doubleValue(), 
				loc.getLng().doubleValue()
			};
		this.bulkOps = bulkOps;
		this.searchRadius = searchRadius;
	}
	
	void collectPopularityValues(Aggregator aggregate, Stat item) {
		double[] itemLoc = new double[] { item.getPosition().getX(), item.getPosition().getY()};
		double distance = GeoMath.distance(aggregate.center[0], aggregate.center[1], itemLoc[0], itemLoc[1]);
		double popScale;
		if (distance < 5) {
			popScale = 1.0;
		} else {
			popScale = (searchRadius-distance)/searchRadius;
		}
		popScale *= popScale;
		aggregate.popularity += item.getPopularity()*popScale;
		aggregate.totalWeight++;
		
		if (popScale > 0.95) updatedCenter = true;
		long popInc = (long)(100*popScale);
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(item.getId()));
		Update update = new Update();
		update.inc("popularity", popInc);
		bulkOps.updateOne(query, update);
	}
	
	StatDto dumpAggregate() {
		StatDto ret = new StatDto();
		ret.setLat(BigDecimal.valueOf(center[0]));
		ret.setLng(BigDecimal.valueOf(center[1]));
		ret.setPopularity(totalWeight == 0 ? 0 : (long) (popularity / totalWeight));
		return ret;
	}
	
	void updateStats() {
		if (!updatedCenter) {
			Stat newItem = new Stat(center);
			newItem.setPopularity(100L);
			bulkOps.insert(newItem);
		}
		bulkOps.execute();
	}
}
