package com.shreyash.placement_backend.entity;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String organisation;

    @Column(nullable = false)
    private String profile;

    private String description;

    private Integer intake;

    @Column(nullable = false)
    private Double minimumGrade;

    @OneToMany(mappedBy = "placement", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlacementStudent> placementStudents;

    @OneToMany(mappedBy = "placement", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;

    // Getters and Setters
    // Constructor (Default & Parameterized)
}