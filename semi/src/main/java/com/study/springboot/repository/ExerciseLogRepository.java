package com.study.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseLogRepository extends JpaRepository<ExerciseLog, Long> {

    @Query("SELECT DISTINCT e.type " +
           "FROM ExerciseLog l JOIN Exercise e ON l.exerciseId = e.exerciseId " +
           "WHERE l.userId = :userId " +
           "AND TRUNC(l.logDate) = TRUNC(SYSDATE) " +
           "FETCH FIRST 3 ROWS ONLY")
    List<String> findTodayExerciseTypes(@Param("userId") String userId);
}
