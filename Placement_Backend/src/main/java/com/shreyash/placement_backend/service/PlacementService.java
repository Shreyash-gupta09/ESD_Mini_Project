package com.shreyash.placement_backend.service;

import com.shreyash.placement_backend.dto.PlacementDTO;
import com.shreyash.placement_backend.entity.Placement;
import com.shreyash.placement_backend.repository.PlacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import java.util.List;

@Service
public class PlacementService {

    @Autowired
    private PlacementRepository placementRepository;

    public PlacementDTO getPlacementById(Long id) {
        Placement placement = placementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement with ID " + id + " not found"));

        // Map Placement entity to PlacementDTO
        return new PlacementDTO(
                placement.getId(),
                placement.getOrganisation(),
                placement.getProfile(),
                placement.getDescription(),
                placement.getIntake(),
                placement.getMinimumGrade()
        );
    }




    public List<PlacementDTO> getAllPlacements() {
        return placementRepository.findAll().stream().map(placement -> {
            PlacementDTO dto = new PlacementDTO();
            dto.setId(placement.getId());
            dto.setOrganisation(placement.getOrganisation());
            dto.setProfile(placement.getProfile());
            dto.setDescription(placement.getDescription());
            dto.setIntake(placement.getIntake());
            dto.setMinimumGrade(placement.getMinimumGrade());
            return dto;
        }).collect(Collectors.toList());
    }
}
