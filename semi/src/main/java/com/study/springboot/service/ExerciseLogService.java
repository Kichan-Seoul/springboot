package com.study.springboot.service;

import com.study.springboot.dto.ExerciseLogDto;
import com.study.springboot.entity.ExerciseLog;
import com.study.springboot.repository.ExerciseLogRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciseLogService {
    private final ExerciseLogRepository exerciseLogRepository;

    public void saveAll(List<ExerciseLogDto> logs) {
        List<ExerciseLog> entities = logs.stream()
            .map(dto -> ExerciseLog.builder()
                .userId(dto.getUserId())
                .exerciseId(dto.getExerciseId())
                .durationMin(dto.getDurationMin())
                .caloriesBurned(dto.getCaloriesBurned())
                .logDate(dto.getLogDate())
                .build())
            .collect(Collectors.toList());

        exerciseLogRepository.saveAll(entities);
    }

    // ✅ 오늘 날짜 기준 소모 칼로리 합계 반환
    public int getTodayCalories(String userId) {
        LocalDate today = LocalDate.now(); // 시스템 현재 날짜
        Integer calories = exerciseLogRepository.sumTodayCaloriesByUserId(userId, today);
        return calories != null ? calories : 0;
    }
    
    
    // 운동 불러오기 메인
    public List<String> getTodayExerciseTypes(String userId) {
//        Pageable pageable = PageRequest.of(0, 3);  // 처음 3개만
        return exerciseLogRepository.findTodayExerciseTypes(userId);
    }
}
