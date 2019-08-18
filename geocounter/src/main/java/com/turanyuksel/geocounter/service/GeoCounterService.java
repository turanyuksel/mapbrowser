package com.turanyuksel.geocounter.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.BulkOperations.BulkMode;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import com.turanyuksel.geocounter.model.Stat;
import com.turanyuksel.geocounter.model.StatDto;

import reactor.core.publisher.Mono;

@Service
public class GeoCounterService {
	/**
	 * Search radius in kilometers
	 */
	private static final int SEARCH_RADIUS = 100;
	@Autowired
	private GeoStatRepository repo;
	
	@Autowired
	private MongoOperations mongoOps;


	public Mono<StatDto> getPopularity(StatDto loc) {
		Aggregator agg = new Aggregator(loc, SEARCH_RADIUS, mongoOps.bulkOps(BulkMode.UNORDERED, Stat.class));
		return repo.findByPositionNear(new Point(loc.getLat().doubleValue(), loc.getLng().doubleValue()), new Distance(SEARCH_RADIUS, Metrics.KILOMETERS))
				.collect(() -> agg, agg::collectPopularityValues)
				.map(aggr -> {
					aggr.updateStats();
					return aggr;
				})
				.map(aggr -> {
					return aggr.dumpAggregate();
				});
	}
}
