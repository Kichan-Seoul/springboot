package com.study.springboot.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.study.springboot.dto.ExerciseLogDto;
import com.study.springboot.entity.ExerciseLog;
import com.study.springboot.repository.ExerciseLogRepository;

import lombok.RequiredArgsConstructor;

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

    public int getTodayCalories(String userId) {
        LocalDate today = LocalDate.now();
        Integer calories = exerciseLogRepository.sumTodayCaloriesByUserId(userId, today);
        return calories != null ? calories : 0;
    }

    public List<String> getTodayExerciseTypes(String userId) {
        return exerciseLogRepository.findTodayExerciseTypes(userId);
    }

    public List<ExerciseLog> getLogsByUserIdAndDate(String userId, String dateStr) {
        LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE);
        return exerciseLogRepository.findByUserIdAndLogDate(userId, date);  // ✅ LocalDate 바로 넘김
    }
}
