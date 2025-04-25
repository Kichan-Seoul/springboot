package com.study.springboot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.study.springboot.repository.ExerciseLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExerciseLogService {

    private final ExerciseLogRepository exerciseLogRepository;

    public List<String> getTodayExerciseTypes(String userId) {
        return exerciseLogRepository.findTodayExerciseTypes(userId);
    }
}
