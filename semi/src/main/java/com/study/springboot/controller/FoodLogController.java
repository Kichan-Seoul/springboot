package com.study.springboot.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.study.springboot.dto.FoodLogRequest;
import com.study.springboot.entity.FoodLog;
import com.study.springboot.repository.FoodLogRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/food-logs")
@RequiredArgsConstructor
public class FoodLogController {

    private final FoodLogRepository foodLogRepository;

    @PostMapping("/bulk")
    public ResponseEntity<?> saveBulk(@RequestBody List<FoodLogRequest> requestList) {
        // 요청값 유효성 검사
        for (FoodLogRequest req : requestList) {
            if (req.getUserId() == null || req.getUserId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("userId가 없습니다.");
            }
            if (req.getFoodId() == null) {
                return ResponseEntity.badRequest().body("foodId가 없습니다.");
            }
            if (req.getMealTime() == null || req.getMealTime().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("mealTime이 없습니다.");
            }
            if (req.getLogDate() == null) {
                return ResponseEntity.badRequest().body("logDate가 없습니다.");
            }
        }

        // logDate의 시간 부분을 자정(00:00:00)으로 초기화해서 저장
        List<FoodLog> foodLogs = requestList.stream()
            .map(req -> FoodLog.builder()
                .userId(req.getUserId())
                .foodId(req.getFoodId())
                .quantity(req.getQuantity())
                .totalCalories(req.getTotalCalories())
                .mealTime(req.getMealTime())
                .logDate(req.getLogDate().toLocalDate().atStartOfDay())  // 자정으로 세팅
                .build()
            ).collect(Collectors.toList());

        foodLogRepository.saveAll(foodLogs);
        return ResponseEntity.ok("저장 완료!");
    }
}
