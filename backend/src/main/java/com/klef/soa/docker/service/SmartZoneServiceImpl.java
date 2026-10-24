package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.SmartZoneRequest;
import com.klef.soa.docker.dto.SmartZoneResponse;
import com.klef.soa.docker.entity.SmartIrrigationZone;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.SmartIrrigationZoneRepository;

@Service
public class SmartZoneServiceImpl implements SmartZoneService{
	@Autowired
	private SmartIrrigationZoneRepository repo;

	@Override
	public SmartZoneResponse add(SmartZoneRequest r) {
		// TODO Auto-generated method stub
		SmartIrrigationZone s=SmartIrrigationZone.builder()
				.cropName(r.getCropName())
				.zoneName(r.getZoneName())
				.squareMeters(r.getSquareMeters())
				.enabled(r.getEnabled())
				.build();
		SmartIrrigationZone sz=repo.save(s);
				
		return mapToResponse(sz);
	}

	@Override
	public SmartZoneResponse getById(Long id) {
		// TODO Auto-generated method stub
		SmartIrrigationZone s=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("id not found:"+id));
		return mapToResponse(s);
	}

	@Override
	public List<SmartZoneResponse> getall() {
		// TODO Auto-generated method stub
		return repo.findAll()
				.stream()
				.map(this::mapToResponse)
				.toList();
	}

	@Override
	public SmartZoneResponse update(Long id, SmartZoneRequest r) {
		// TODO Auto-generated method stub
		SmartIrrigationZone s=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("id not found:"+id));
		s.setCropName(r.getCropName());
		s.setZoneName(r.getZoneName());
		s.setSquareMeters(r.getSquareMeters());
		s.setEnabled(r.getEnabled());
		return mapToResponse(repo.save(s));
	}

	@Override
	public String deleteById(Long id) {
		// TODO Auto-generated method stub
		SmartIrrigationZone s=repo.findById(id).orElseThrow(()->new ResourceNotFoundException("id not found:"+id));
		repo.delete(s);
		return "sucessFully deleted:"+id;
	}
	
	 private SmartZoneResponse mapToResponse(SmartIrrigationZone s) {
		 return SmartZoneResponse.builder()
				 .id(s.getId())
				 .cropName(s.getCropName())
				 .zoneName(s.getZoneName())
				 .squareMeters(s.getSquareMeters())
				 .enabled(s.getEnabled())
				 .build();
	 }

}
