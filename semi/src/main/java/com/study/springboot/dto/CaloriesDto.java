package com.study.springboot.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class CaloriesDto {
    private LocalDate logDate;
    private Long totalCalories;

    // 🔧 LocalDateTime → LocalDate로 변환해서 저장
    public CaloriesDto(LocalDateTime logDateTime, Long totalCalories) {
        this.logDate = logDateTime.toLocalDate();
        this.totalCalories = totalCalories;
    }

    // 필요 시 직접 LocalDate 받는 생성자도 유지
    public CaloriesDto(LocalDate logDate, Long totalCalories) {
        this.logDate = logDate;
        this.totalCalories = totalCalories;
    }
}
