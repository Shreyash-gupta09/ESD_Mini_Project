package com.shreyash.placement_backend.repository;


import com.shreyash.placement_backend.entity.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementRepository extends JpaRepository<Placement, Long> {
}
