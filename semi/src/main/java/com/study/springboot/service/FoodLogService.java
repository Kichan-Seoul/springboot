package com.study.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springboot.entity.FoodLog;
import com.study.springboot.repository.FoodLogRepository;

@Service
public class FoodLogService {

    @Autowired
    private FoodLogRepository foodLogRepository;

    // 음식 섭취 기록 저장
    public FoodLog addFoodLog(FoodLog foodLog) {
        return foodLogRepository.save(foodLog);
    }
}
