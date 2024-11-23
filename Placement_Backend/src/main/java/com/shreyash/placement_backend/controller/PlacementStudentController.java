package com.shreyash.placement_backend.controller;

import com.shreyash.placement_backend.dto.PlacementStudentDTO;
import com.shreyash.placement_backend.entity.PlacementStudent;
import com.shreyash.placement_backend.service.PlacementStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement-students")
public class PlacementStudentController {

    @Autowired
    private PlacementStudentService placementStudentService;

    @GetMapping
    public List<PlacementStudentDTO> getPlacementStudents(@RequestParam Long placementId) {
        return placementStudentService.getPlacementStudentsByPlacementId(placementId);
    }


}

