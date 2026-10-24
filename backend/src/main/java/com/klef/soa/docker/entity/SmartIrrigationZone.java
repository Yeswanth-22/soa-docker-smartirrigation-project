package com.klef.soa.docker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="smartIrrigation_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmartIrrigationZone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String zoneName;
	private String cropName;
	private Double squareMeters;
	private Boolean enabled;
	
}
