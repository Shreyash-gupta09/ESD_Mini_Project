package com.shreyash.placement_backend.service;

import com.shreyash.placement_backend.dto.PlacementStudentDTO;
import com.shreyash.placement_backend.entity.PlacementStudent;
import com.shreyash.placement_backend.repository.PlacementStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
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
    // New method to update acceptance based on studentId and placementId
    public PlacementStudentDTO updateAcceptance(Long studentId, Long placementId) {
        // Retrieve the PlacementStudent using the new query method
        Optional<PlacementStudent> placementStudentOptional =
                placementStudentRepository.findByStudent_StudentIdAndPlacement_Id(studentId, placementId);

        if (placementStudentOptional.isPresent()) {
            PlacementStudent placementStudent = placementStudentOptional.get();
            placementStudent.setAcceptance(true); // Update the acceptance field to true
            placementStudent = placementStudentRepository.save(placementStudent); // Save changes

            // Return the updated PlacementStudent as a DTO
            return new PlacementStudentDTO(
                    placementStudent.getId(),
                    placementStudent.getCvApplication(),
                    placementStudent.getAbout(),
                    placementStudent.getAcceptance(),
                    placementStudent.getComments(),
                    placementStudent.getDate(),
                    placementStudent.getPlacement().getId(),
                    placementStudent.getStudent());
        } else {
            throw new RuntimeException("No PlacementStudent found with studentId: " + studentId + " and placementId: " + placementId);
        }
    }
}