package com.study.springboot.service;

import com.study.springboot.dto.FoodLogDto;
import com.study.springboot.dto.CaloriesDto;
import com.study.springboot.entity.Food;
import com.study.springboot.repository.FoodLogRepository;
import com.study.springboot.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodLogService {

    private final FoodLogRepository foodLogRepository;
    private final FoodRepository foodRepository;

    public List<CaloriesDto> getDailyCaloriesByUser(String userId) {
        List<Object[]> rawResults = foodLogRepository.findDailyCaloriesNative(userId);

        return rawResults.stream()
                .map(obj -> {
                    Timestamp timestamp = (Timestamp) obj[0];
                    BigDecimal calories = (BigDecimal) obj[1];
                    LocalDateTime localDateTime = timestamp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                    return new CaloriesDto(localDateTime, calories.longValue());
                })
                .collect(Collectors.toList());
    }

    public List<FoodLogDto> getFoodLogsByDate(String userId, LocalDate date) {
        List<Object[]> rows = foodLogRepository.findFoodLogsByUserIdAndDate(userId, date);

        return rows.stream().map(row -> {
            Long foodId = ((BigDecimal) row[1]).longValue();

            // ✅ 음식 이름 가져오기
            Optional<Food> food = foodRepository.findById(foodId);
            String foodName = food.map(Food::getName).orElse("알 수 없음");

            return FoodLogDto.builder()
                    .userId((String) row[0])
                    .foodId(foodId)
                    .foodName(foodName)
                    .quantity(((BigDecimal) row[2]).intValue())
                    .totalCalories(((BigDecimal) row[3]).intValue())
                    .mealTime((String) row[4])
                    .logDate(((Timestamp) row[5]).toLocalDateTime())
                    .build();
        }).collect(Collectors.toList());
    }
}
