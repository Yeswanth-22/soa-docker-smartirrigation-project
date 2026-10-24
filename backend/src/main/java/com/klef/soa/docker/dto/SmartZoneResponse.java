package com.klef.soa.docker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SmartZoneResponse {
	private Long id;
	private String zoneName;
	private String cropName;
	private Double squareMeters;
	private Boolean enabled;
}
