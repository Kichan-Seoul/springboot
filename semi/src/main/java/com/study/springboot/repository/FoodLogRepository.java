package com.study.springboot.repository;

import com.study.springboot.dto.CaloriesDto;
import com.study.springboot.entity.FoodLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodLogRepository extends JpaRepository<FoodLog, Long> {
    @Query("SELECT new com.study.springboot.dto.CaloriesDto(TO_CHAR(f.logDate, 'YYYY-MM-DD'), SUM(f.totalCalories)) " +
           "FROM FoodLog f WHERE f.userId = :userId GROUP BY TO_CHAR(f.logDate, 'YYYY-MM-DD') ORDER BY TO_CHAR(f.logDate, 'YYYY-MM-DD')")
    List<CaloriesDto> findDailyCaloriesByUser(@Param("userId") String userId);
}
