// ✅ FoodLogRepository.java
package com.study.springboot.repository;

import com.study.springboot.entity.FoodLog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FoodLogRepository extends CrudRepository<FoodLog, Long> {

    @Query(value = """
        SELECT 
            TRUNC(f.log_date), 
            SUM(f.total_calories) 
        FROM food_logs f 
        WHERE f.user_id = :userId 
        GROUP BY TRUNC(f.log_date) 
        ORDER BY TRUNC(f.log_date)
    """, nativeQuery = true)
    List<Object[]> findDailyCaloriesNative(@Param("userId") String userId);

    @Query(value = """
        SELECT 
            f.user_id,
            f.food_id,
            f.quantity,
            f.total_calories,
            f.meal_time,
            f.log_date
        FROM food_logs f
        WHERE f.user_id = :userId
        AND TRUNC(f.log_date) = TRUNC(:logDate)
    """, nativeQuery = true)
    List<Object[]> findFoodLogsByUserIdAndDate(@Param("userId") String userId, @Param("logDate") LocalDate logDate);
    
    void deleteByUserId(String userId); // ✅ 추가: userId로 삭제
}