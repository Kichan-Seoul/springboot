// 📁 controller/ExerciseLogController.java
package com.study.springboot.controller;

import com.study.springboot.dto.ExerciseLogDto;
import com.study.springboot.service.ExerciseLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercise-logs")
@RequiredArgsConstructor
public class ExerciseLogController {

    private final ExerciseLogService exerciseLogService;

    @PostMapping("/bulk")
    public ResponseEntity<?> saveLogs(@RequestBody List<ExerciseLogDto> logs) {
        if (logs == null || logs.isEmpty()) {
            return ResponseEntity.badRequest().body("운동 로그가 비어 있습니다.");
        }

        exerciseLogService.saveAll(logs);
        return ResponseEntity.ok("운동 로그 저장 완료!");
    }
}
