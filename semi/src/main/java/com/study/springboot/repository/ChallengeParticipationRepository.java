package com.study.springboot.repository;

import com.study.springboot.entity.ChallengeParticipation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeParticipationRepository extends JpaRepository<ChallengeParticipation, Long> {
}
