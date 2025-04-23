package com.study.springboot.repository;

import com.study.springboot.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    // 기본적인 CRUD는 JpaRepository가 제공하므로 추가로 필요한 메서드를 선언할 수 있습니다.
}
