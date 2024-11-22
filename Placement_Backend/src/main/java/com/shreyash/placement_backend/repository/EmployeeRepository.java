package com.shreyash.placement_backend.repository;

import com.shreyash.placement_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Add any custom query methods if needed
    Optional<Employee> findByEmail(String email);
    boolean existsByEmail(String email);
}
