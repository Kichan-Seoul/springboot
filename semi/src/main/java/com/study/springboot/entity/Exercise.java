package com.study.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "EXERCISES") // 💥 대문자로 꼭 맞춰줘야 함!
@Getter
@Setter
@NoArgsConstructor
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EXERCISE_ID") // ← DB 컬럼명 그대로
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "CALORIES_BURNED")
    private int caloriesBurned;

    @Column(name = "DEFAULT_DURATION_MIN")
    private int defaultDurationMin;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "CREATED_BY")
    private String createdBy;
}
