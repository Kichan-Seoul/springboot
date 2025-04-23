package com.study.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USERS") // 테이블 이름 명시
public class User {

    @Id
    @Column(name = "USER_ID") // USER_ID 컬럼 명시
    private String userId;

    @Column(name = "PASSWORD_HASH", nullable = false)
    private String passwordHash;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "GENDER", nullable = false)
    private String gender;

    @Column(name = "BIRTH_DATE")
    private LocalDate birthDate;

    @Column(name = "HEIGHT")
    private Integer height;

    @Column(name = "WEIGHT")
    private Double weight;

    @Column(name = "GOAL_WEIGHT")
    private Double goalWeight;

    @Column(name = "CHALLENGE_SCORE")
    private Integer challengeScore;

    @Column(name = "IS_ACTIVE")
    private String isActive;

    @Column(name = "PROFILE_IMAGE_URL")
    private String profileImageUrl;

    @Column(name = "CALORIES_BURNED") // ✅ 추가된 부분
    private Integer caloriesBurned;
}
