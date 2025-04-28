package com.study.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.study.springboot.entity.ExerciseLog;

public interface ExerciseLogRepository extends JpaRepository<ExerciseLog, Long> {

    @Query(
        value = "SELECT DISTINCT ex.TYPE " +
                "FROM EXERCISE_LOGS l " +
                "JOIN EXERCISES ex ON l.EXERCISE_ID = ex.EXERCISE_ID " +
                "WHERE l.USER_ID = :userId " +
                "AND TRUNC(l.LOG_DATE) = TRUNC(SYSDATE) " +
                "FETCH FIRST 5 ROWS ONLY",
        nativeQuery = true
    )
    List<String> findTodayExerciseTypes(@Param("userId") String userId);

    @Query(
        value = "SELECT SUM(e.CALORIES_BURNED) " +
                "FROM EXERCISE_LOGS e " +
                "WHERE e.USER_ID = :userId " +
                "AND TRUNC(e.LOG_DATE) = TRUNC(:date)",
        nativeQuery = true
    )
    Integer sumTodayCaloriesByUserId(@Param("userId") String userId, @Param("date") LocalDate date);

    void deleteByUserId(String userId);

    @Query(
        value = "SELECT * FROM EXERCISE_LOGS l " +
                "WHERE l.USER_ID = :userId " +
                "AND TRUNC(l.LOG_DATE) = TRUNC(:logDate)",
        nativeQuery = true
    )
    List<ExerciseLog> findByUserIdAndLogDate(@Param("userId") String userId, @Param("logDate") LocalDate logDate);
}
