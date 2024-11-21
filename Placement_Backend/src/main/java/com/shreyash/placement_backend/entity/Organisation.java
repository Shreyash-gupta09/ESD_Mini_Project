package com.shreyash.placement_backend.entity;


import jakarta.persistence.*;
import java.util.List;

@Entity
public class Organisation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String address;

    // You can link this to Placement table if required
    // @OneToMany(mappedBy = "organisation", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Placement> placements;

    // Getters and Setters
    // Constructor (Default & Parameterized)
}
