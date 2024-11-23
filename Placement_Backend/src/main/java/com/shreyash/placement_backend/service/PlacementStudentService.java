package com.shreyash.placement_backend.service;

import com.shreyash.placement_backend.dto.PlacementStudentDTO;
import com.shreyash.placement_backend.entity.PlacementStudent;
import com.shreyash.placement_backend.repository.PlacementStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlacementStudentService {

    @Autowired
    private PlacementStudentRepository placementStudentRepository;

    public List<PlacementStudentDTO> getPlacementStudentsByPlacementId(Long placementId) {
        return placementStudentRepository.findByPlacementId(placementId).stream()
                .map(ps -> new PlacementStudentDTO(
                        ps.getId(),
                        ps.getCvApplication(),
                        ps.getAbout(),
                        ps.getAcceptance(),
                        ps.getComments(),
                        ps.getDate(),
                        ps.getPlacement().getId(),
                        ps.getStudent()))
                .collect(Collectors.toList());
    }
}
