package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.SmartZoneRequest;
import com.klef.soa.docker.dto.SmartZoneResponse;
import com.klef.soa.docker.service.SmartZoneService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RequestMapping("/smart")
@RestController
public class SmartIrrigationZoneController {
	@Autowired
	private SmartZoneService service;
	
	@GetMapping("/")
	public String test() {
		return "Service is successfully running......!!!";
	}
	
	@PostMapping("/add")
	public ResponseEntity<SmartZoneResponse> add(@Valid @RequestBody SmartZoneRequest r) {
		return new ResponseEntity<>(service.add(r),HttpStatus.CREATED);
	}
	@GetMapping("/displayall")
	public ResponseEntity<List<SmartZoneResponse>> getAllZones() {
		return ResponseEntity.ok(service.getall());
	}
	@GetMapping("/display/{id}")
	public ResponseEntity<SmartZoneResponse> getById(@PathVariable Long id) {
		return ResponseEntity.ok(service.getById(id));
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<SmartZoneResponse> Update(@PathVariable Long id,@Valid @RequestBody SmartZoneRequest r) {
		return ResponseEntity.ok(service.update(id, r));
	}
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id) {
		return ResponseEntity.ok(service.deleteById(id));
	}
	
	
}
