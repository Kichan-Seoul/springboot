// 📁 entity/ExerciseLog.java
package com.study.springboot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "EXERCISE_LOGS")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ExerciseLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOG_ID") // ✅ 여기 중요!
    private Long logId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "EXERCISE_ID")
    private Long exerciseId;

    @Column(name = "DURATION_MIN")
    private Integer durationMin;

    @Column(name = "CALORIES_BURNED")
    private Integer caloriesBurned;

    @Column(name = "LOG_DATE")
    private LocalDateTime logDate;
}
