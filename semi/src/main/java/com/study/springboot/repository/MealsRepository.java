package com.study.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.springboot.entity.Meals;

public interface MealsRepository extends JpaRepository<Meals, Long> {
    // 필요한 경우 쿼리를 추가할 수 있습니다.
}
