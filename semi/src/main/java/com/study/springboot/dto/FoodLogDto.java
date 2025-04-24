package com.study.springboot.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodLogDto {
    private String userId;
    private Long foodId;
    private int quantity;
    private int totalCalories;
    private String mealTime;
    private LocalDateTime logDate;
}
