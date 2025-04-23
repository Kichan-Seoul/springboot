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
@Table(name = "CHALLENGE_PARTICIPATION") // 테이블 이름 명시
public class ChallengeParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participationId;

    @ManyToOne
    @JoinColumn(name = "CHALLENGE_ID")  // Challenge ID 컬럼을 매핑
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "USER_ID")  // User ID 컬럼을 매핑
    private User user;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "JOINED_AT")
    private LocalDate joinedAt;

    @Column(name = "COMPLETED_AT")
    private LocalDate completedAt;

    @Column(name = "EARNED_POINTS")
    private Integer earnedPoints;
}
