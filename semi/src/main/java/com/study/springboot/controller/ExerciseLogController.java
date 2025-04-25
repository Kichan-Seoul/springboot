package com.study.springboot.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.study.springboot.service.ExerciseLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exercise-types")
public class ExerciseLogController {

    private final ExerciseLogService exerciseLogService;

    @GetMapping("/today")
    public ResponseEntity<List<String>> getTodayExerciseTypes(@RequestParam String userId) {
        List<String> types = exerciseLogService.getTodayExerciseTypes(userId);
        return ResponseEntity.ok(types);
    }
}
