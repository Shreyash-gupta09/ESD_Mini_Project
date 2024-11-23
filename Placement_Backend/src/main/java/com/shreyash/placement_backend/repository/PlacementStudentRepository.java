package com.shreyash.placement_backend.repository;

import com.shreyash.placement_backend.entity.PlacementStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlacementStudentRepository extends JpaRepository<PlacementStudent, Long> {
    List<PlacementStudent> findByPlacementId(Long placementId); // Query method to filter by placement_id
}

