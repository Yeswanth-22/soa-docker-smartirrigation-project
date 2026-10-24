package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.SmartZoneRequest;
import com.klef.soa.docker.dto.SmartZoneResponse;

public interface SmartZoneService {
	SmartZoneResponse add(SmartZoneRequest r);
	SmartZoneResponse getById(Long id);
	List<SmartZoneResponse> getall();
	SmartZoneResponse update(Long id,SmartZoneRequest r);
	String deleteById(Long id);
	
}
