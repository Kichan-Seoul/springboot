package com.study.springboot.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.study.springboot.dto.FoodLogDto;
import com.study.springboot.dto.FoodLogRequest;
import com.study.springboot.entity.FoodLog;
import com.study.springboot.repository.FoodLogRepository;
import com.study.springboot.service.FoodLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/food-logs")
@RequiredArgsConstructor
public class FoodLogController {

    private final FoodLogRepository foodLogRepository;
    private final FoodLogService foodLogService;

    @PostMapping("/bulk")
    public ResponseEntity<?> saveBulk(@RequestBody List<FoodLogRequest> requestList) {
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

        List<FoodLog> foodLogs = requestList.stream()
            .map(req -> FoodLog.builder()
                .userId(req.getUserId())
                .foodId(req.getFoodId())
                .quantity(req.getQuantity())
                .totalCalories(req.getTotalCalories())
                .mealTime(req.getMealTime())
                .logDate(req.getLogDate().toLocalDate().atStartOfDay())
                .build())
            .collect(Collectors.toList());

        foodLogRepository.saveAll(foodLogs);
        return ResponseEntity.ok("저장 완료!");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FoodLogDto>> getLogsByDate(
            @PathVariable("userId") String userId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<FoodLogDto> logs = foodLogService.getFoodLogsByDate(userId, date);
        return ResponseEntity.ok(logs);
    }
}
