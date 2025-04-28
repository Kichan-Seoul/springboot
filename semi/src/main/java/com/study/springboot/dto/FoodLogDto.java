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
    private String foodName; // ✅ 음식 이름 추가
    private int quantity;
    private int totalCalories;
    private String mealTime;
    private LocalDateTime logDate;
}
