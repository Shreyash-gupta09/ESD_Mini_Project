package com.shreyash.placement_backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @Column(unique = true, nullable = false)
    private String rollNumber;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private Double cgpa;

    private Integer totalCredits;

    private Integer graduationYear;

    private String domain;

    private String specialisation;

    @ManyToOne
    @JoinColumn(name = "placement_id")
    private Placement placement;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlacementStudent> placementStudents;

    // Getters and Setters
    // Constructor (Default & Parameterized)
}
