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
@Table(name = "CHALLENGES")
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략 추가
    @Column(name = "CHALLENGE_ID")
    private Long challengeId;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "DIFFICULTY")
    private String difficulty;

    @Column(name = "START_DATE")
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Column(name = "POINT_REWARD")
    private Integer pointReward;
}
