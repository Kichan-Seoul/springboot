package com.study.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CaloriesDto {
    private String logDate;
    private int totalCalories;

    public CaloriesDto(String logDate, Number totalCalories) {
        this.logDate = logDate;
        this.totalCalories = totalCalories != null ? totalCalories.intValue() : 0;
    }
}

