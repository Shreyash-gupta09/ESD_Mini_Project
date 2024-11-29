package com.shreyash.placement_backend.controller;

import com.shreyash.placement_backend.dto.PlacementDTO;
import com.shreyash.placement_backend.entity.Placement;
import com.shreyash.placement_backend.helper.JWTHelper;
import com.shreyash.placement_backend.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
public class PlacementController {

    @Autowired
    private JWTHelper jwtHelper;

    @Autowired
    private PlacementService placementService;


    @GetMapping
    public List<PlacementDTO> getAllPlacements(@RequestHeader ("Authorization") String token) {
        if(token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid token");
        }

        token = token.substring(7);
        if(!jwtHelper.isTokenValid(token)) {
            throw new RuntimeException("Invalid token");
        }
        return placementService.getAllPlacements();
    }


//    @GetMapping("/id")
//    public ResponseEntity<PlacementDTO> getPlacementById(@RequestParam Long id) {
//        PlacementDTO placementDTO = placementService.getPlacementById(id);
//        return ResponseEntity.ok(placementDTO);
//    }


}
