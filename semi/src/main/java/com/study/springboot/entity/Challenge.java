package com.study.springboot.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "CHALLENGES") // 테이블 이름을 CHALLENGES로 수정
public class Challenge {

    @Id
    @Column(name = "CHALLENGE_ID") // CHALLENGE_ID 컬럼 명시
    private Long challengeId;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "CATEGORY") // CATEGORY 컬럼 추가
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

