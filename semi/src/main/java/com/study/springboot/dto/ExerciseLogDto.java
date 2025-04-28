package com.study.springboot.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseLogDto {
    private String userId;
    private Long exerciseId;
    private Integer durationMin;
    private Integer caloriesBurned;
    private LocalDateTime logDate;
}
