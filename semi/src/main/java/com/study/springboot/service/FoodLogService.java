package com.study.springboot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springboot.dto.CaloriesDto;
import com.study.springboot.repository.FoodLogRepository;

@Service
public class FoodLogService {

    @Autowired
    private FoodLogRepository foodLogRepository;

    public List<CaloriesDto> getDailyCaloriesByUser(String userId) {
        List<CaloriesDto> result = foodLogRepository.findDailyCaloriesByUser(userId);
        if (result == null || result.isEmpty()) {
            System.out.println("유효한 userId가 없습니다.");
            return new ArrayList<>();
        }
        return result;
    }
}
