package com.study.springboot.controller;

import com.study.springboot.dto.CaloriesDto;
import com.study.springboot.entity.Food;
import com.study.springboot.service.FoodLogService;
import com.study.springboot.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private FoodLogService foodLogService;

    // 🔧 수정된 부분: @RequestParam에 "userId" 명시
    @GetMapping("/total-calories")
    public List<CaloriesDto> getTotalCalories(@RequestParam("userId") String userId) {
        return foodLogService.getDailyCaloriesByUser(userId);
    }

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return foodService.addFood(food);
    }

    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }
}
