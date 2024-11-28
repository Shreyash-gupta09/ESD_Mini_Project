package com.shreyash.placement_backend.controller;

import com.shreyash.placement_backend.dto.PlacementStudentDTO;
import com.shreyash.placement_backend.entity.PlacementStudent;
import com.shreyash.placement_backend.helper.JWTHelper;
import com.shreyash.placement_backend.service.PlacementStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-students")
public class PlacementStudentController {

    @Autowired
    private JWTHelper jwtHelper;

    @Autowired
    private PlacementStudentService placementStudentService;

    @GetMapping
    public List<PlacementStudentDTO> getPlacementStudents(@RequestParam Long placementId, @RequestHeader ("Authorization") String token) {
        if(token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid token");
        }

        token = token.substring(7);
        if(!jwtHelper.isTokenValid(token)) {
            throw new RuntimeException("Invalid token");
        }

        return placementStudentService.getPlacementStudentsByPlacementId(placementId);
    }

    @PutMapping("/acceptance")
    public PlacementStudentDTO updateAcceptance(@RequestParam Long studentId, @RequestParam Long placementId) {
        return placementStudentService.updateAcceptance(studentId, placementId);
    }
}
