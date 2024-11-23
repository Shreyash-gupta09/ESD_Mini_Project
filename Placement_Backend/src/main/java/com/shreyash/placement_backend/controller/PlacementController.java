package com.shreyash.placement_backend.controller;

import com.shreyash.placement_backend.dto.PlacementDTO;
import com.shreyash.placement_backend.entity.Placement;
import com.shreyash.placement_backend.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    @Autowired
    private PlacementService placementService;


    @GetMapping
    public List<PlacementDTO> getAllPlacements() {
        return placementService.getAllPlacements();
    }


    @GetMapping("/id")
    public ResponseEntity<PlacementDTO> getPlacementById(@RequestParam Long id) {
        PlacementDTO placementDTO = placementService.getPlacementById(id);
        return ResponseEntity.ok(placementDTO);
    }


}
