package com.study.springboot.controller;

import com.study.springboot.service.ExerciseLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise-types")  // ✅ 메인에서 운동 타입 로고 불러오는 경로
@RequiredArgsConstructor
public class ExerciseTypeController {

    private final ExerciseLogService exerciseLogService;

    @GetMapping("/today")
    public ResponseEntity<List<String>> getTodayExerciseTypes(@RequestParam(name = "userId") String userId) {
        List<String> types = exerciseLogService.getTodayExerciseTypes(userId);
        return ResponseEntity.ok(types);
    }
}
