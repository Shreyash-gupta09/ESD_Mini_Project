package com.shreyash.placement_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlacementDTO {
    private Long id;
    private String organisation;
    private String profile;
    private String description;
    private Integer intake;
    private Double minimumGrade;

    // Constructor, Getters, and Setters
}
