package com.study.springboot.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "food_logs")
public class FoodLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;  // 로그 ID

    private String userId;  // 사용자 ID
    private Long foodId;    // 음식 ID
    private int quantity;   // 수량
    private int totalCalories;  // 총 칼로리
    private Date logDate;    // 섭취 날짜

    // 기본 생성자
    public FoodLog() {}

    // 모든 필드를 포함한 생성자
    public FoodLog(String userId, Long foodId, int quantity, int totalCalories, Date logDate) {
        this.userId = userId;
        this.foodId = foodId;
        this.quantity = quantity;
        this.totalCalories = totalCalories;
        this.logDate = logDate;
    }

    // Getters and Setters
    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(int totalCalories) {
        this.totalCalories = totalCalories;
    }

    public Date getLogDate() {
        return logDate;
    }

    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }
}
