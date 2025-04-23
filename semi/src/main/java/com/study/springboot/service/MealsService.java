package com.study.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springboot.entity.Meals;
import com.study.springboot.repository.MealsRepository;

@Service
public class MealsService {

    @Autowired
    private MealsRepository mealsRepository;

    // 식사 추가
    public Meals addMeal(Meals meal) {
        return mealsRepository.save(meal);
    }

    // 식사 조회
    public Meals getMealById(Long id) {
        return mealsRepository.findById(id).orElse(null);
    }
}
