package com.study.springboot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "FOODS")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")  // DB 테이블의 컬럼명과 맞추기
    private Long foodId;

    private String name;
    private int calories;  // 칼로리

    private String category;
    private String unit;

    @Column(name = "created_by")  // created_by 컬럼과 매핑
    private String createdBy;

    // 칼로리 반환 메소드
    public int getCalorie() {
        return calories;  // 칼로리 값을 반환
    }

    // Getter and Setter methods for all fields
    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
