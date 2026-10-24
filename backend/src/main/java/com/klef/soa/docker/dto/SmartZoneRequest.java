package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SmartZoneRequest {
	
	@NotBlank(message ="zonename must be required")
	private String zoneName;
	@NotBlank(message = "cropname must be required")
	private String cropName;
	@PositiveOrZero(message = "it must be positive or zero")
	private Double squareMeters;
	@NotNull(message = "enabled field is required")
	private Boolean enabled;
}
