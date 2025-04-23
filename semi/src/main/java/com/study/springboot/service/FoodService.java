package com.study.springboot.service;

import com.study.springboot.entity.Food;
import com.study.springboot.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;  // 음식 데이터를 가져오기 위한 Repository

    // 모든 음식 조회
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // 음식 추가
    public Food addFood(Food food) {
        return foodRepository.save(food);
    }

    // 특정 음식 조회
    public Food getFoodById(Long id) {
        Optional<Food> food = foodRepository.findById(id);
        return food.orElse(null);  // 없으면 null 반환
    }
}
