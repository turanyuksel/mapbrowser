package com.turanyuksel.geocounter.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turanyuksel.geocounter.model.StatDto;
import com.turanyuksel.geocounter.service.GeoCounterService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/")
public class GeoCounterController {
	class Result {
		boolean success;
		Result(boolean success) {
			this.success = success;
		}
		public boolean isSuccess() {
			return success;
		}
		public void setSuccess(boolean success) {
			this.success = success;
		}
	}
	@Autowired
	private GeoCounterService geoCounterService;
	
	@GetMapping("/getPopularity")
	public Mono<StatDto> getPopularity(@Valid StatDto location) {
		return geoCounterService.getPopularity(location);
	}
}
