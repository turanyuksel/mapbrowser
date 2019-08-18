package com.turanyuksel.geocounter.service;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.turanyuksel.geocounter.model.Stat;

import reactor.core.publisher.Flux;

@Repository
public interface GeoStatRepository extends ReactiveMongoRepository<Stat, Long>{
	Flux<Stat> findByPositionNear(Point p, Distance d);
}
