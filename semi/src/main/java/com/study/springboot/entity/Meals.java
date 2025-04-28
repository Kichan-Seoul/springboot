package com.study.springboot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name = "MEALS")
public class Meals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mealId; // 식사 ID

    private String mealName;  // 식사 이름 (예: 아침, 점심, 저녁)

    @ManyToMany
    @JoinTable(
      name = "meal_foods", 
      joinColumns = @JoinColumn(name = "meal_id"), 
      inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> foods;  // 식사에 포함된 음식들

    private int totalCalories; // 해당 식사의 총 칼로리

    // 생성자
    public Meals(String mealName, List<Food> foods) {
        this.mealName = mealName;
        this.foods = foods;
        this.totalCalories = calculateTotalCalories(foods);  // 총 칼로리 계산
    }

    // 총 칼로리 계산 메서드
    private int calculateTotalCalories(List<Food> foods) {
        return foods.stream().mapToInt(Food::getCalories).sum();  // Food 객체의 getCalories 메소드 호출
    }

    // Getter & Setter
    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public String getMealName() {
        return mealName;
    }

    public void setMealName(String mealName) {
        this.mealName = mealName;
    }

    public List<Food> getFoods() {
        return foods;
    }

    public void setFoods(List<Food> foods) {
        this.foods = foods;
        this.totalCalories = calculateTotalCalories(foods);  // 음식이 바뀌면 칼로리 재계산
    }

    public int getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(int totalCalories) {
        this.totalCalories = totalCalories;
    }

    @Override
    public String toString() {
        return "Meals{" +
                "mealId=" + mealId +
                ", mealName='" + mealName + '\'' +
                ", totalCalories=" + totalCalories +
                '}';
    }
}
