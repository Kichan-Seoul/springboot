package com.study.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.springboot.entity.FoodLog;
import com.study.springboot.service.FoodLogService;

@RestController
@RequestMapping("/food-logs")
public class FoodLogController {

    @Autowired
    private FoodLogService foodLogService;

    // 음식 섭취 기록 추가
    @PostMapping
    public FoodLog addFoodLog(@RequestBody FoodLog foodLog) {
        return foodLogService.addFoodLog(foodLog);
    }
}
