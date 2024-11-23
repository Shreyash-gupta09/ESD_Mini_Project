package com.shreyash.placement_backend.dto;

import com.shreyash.placement_backend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class PlacementStudentDTO {
    private Long id;
    private String cvApplication;
    private String about;
    private Boolean acceptance;
    private String comments;
    private LocalDate date;
    private Long placementId; // Include only the placement ID
    private Student student;
}
