package com.shreyash.placement_backend.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class PlacementStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "placement_id", nullable = false)
    private Placement placement;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private String cvApplication;

    private String about;

    private Boolean acceptance;

    private String comments;

    private LocalDate date;

    // Getters and Setters
    // Constructor (Default & Parameterized)
}