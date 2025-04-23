package com.study.springboot.repository;

import com.study.springboot.entity.FoodLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodLogRepository extends JpaRepository<FoodLog, Long> {
    // 추가적인 쿼리 메소드가 필요하면 여기서 정의
}
