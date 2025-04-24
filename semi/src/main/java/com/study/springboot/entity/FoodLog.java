package com.study.springboot.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "food_logs")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FoodLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID")
    private Long logId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "FOOD_ID")
    private Long foodId;

    private int quantity;

    @Column(name = "TOTAL_CALORIES")
    private int totalCalories;

    @Column(name = "MEAL_TIME")
    private String mealTime;

    @Column(name = "LOG_DATE")
    private LocalDateTime logDate;
}
