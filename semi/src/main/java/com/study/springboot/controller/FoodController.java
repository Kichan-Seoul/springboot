package com.study.springboot.controller;

import com.study.springboot.entity.Food;
import com.study.springboot.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
@CrossOrigin(origins = "http://localhost:3000")  // React 클라이언트가 3000번 포트에서 실행되므로 해당 포트를 추가
public class FoodController {
    @Autowired
    private FoodService foodService;

    // 모든 음식 조회
    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    // 음식 추가
    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return foodService.addFood(food);
    }

    // 음식 상세 조회
    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }
}
