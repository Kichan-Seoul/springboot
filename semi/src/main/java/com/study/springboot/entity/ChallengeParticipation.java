// ChallengeParticipation 엔티티
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
@Table(name = "CHALLENGE_PARTICIPATION")
public class ChallengeParticipation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PARTICIPATION_ID")
    private Long participationId;

    @ManyToOne
    @JoinColumn(name = "CHALLENGE_ID")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "USER_ID")	
    private User user;

    @Column(name = "STATUS")
    private String status;

    @Column(name = "JOINED_AT")
    private LocalDate joinedAt;

    @Column(name = "COMPLETED_AT")
    private LocalDate completedAt;

    @Column(name = "EARNED_POINTS")
    private Integer earnedPoints = 0;

}
