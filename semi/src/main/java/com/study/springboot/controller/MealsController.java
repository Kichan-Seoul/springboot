package com.study.springboot.controller;

import com.study.springboot.entity.Meals;
import com.study.springboot.service.MealsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/meals")
public class MealsController {

    @Autowired
    private MealsService mealsService;

    // 식사 추가
    @PostMapping
    public Meals addMeal(@RequestBody Meals meal) {
        return mealsService.addMeal(meal);
    }

    // 식사 상세 조회
    @GetMapping("/{id}")
    public Meals getMealById(@PathVariable Long id) {
        return mealsService.getMealById(id);
    }
}
