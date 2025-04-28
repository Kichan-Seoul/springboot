package com.study.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.springboot.entity.ChallengeParticipation;

@Repository
public interface ChallengeParticipationRepository extends JpaRepository<ChallengeParticipation, Long> {

    List<ChallengeParticipation> findByUser_UserIdAndStatus(String userId, String status);

    ChallengeParticipation findByChallenge_ChallengeIdAndUser_UserId(Long challengeId, String userId);

    // 상태 조건 포함 메서드 추가
    ChallengeParticipation findByChallenge_ChallengeIdAndUser_UserIdAndStatus(Long challengeId, String userId, String status);
    List<ChallengeParticipation> findAllByChallenge_ChallengeIdAndUser_UserIdAndStatus(
    	    Long challengeId,
    	    String userId,
    	    String status
    	);

}
