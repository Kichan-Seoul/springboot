package com.study.springboot.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springboot.entity.Challenge;
import com.study.springboot.entity.ChallengeParticipation;
import com.study.springboot.entity.User;
import com.study.springboot.repository.ChallengeParticipationRepository;
import com.study.springboot.repository.ChallengeRepository;
import com.study.springboot.repository.UserRepository;

@Service
public class ChallengeParticipationService {

    @Autowired
    private ChallengeParticipationRepository challengeParticipationRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserRepository userRepository;

    public ChallengeParticipation createParticipation(ChallengeParticipation participation) {
        try {
            return challengeParticipationRepository.save(participation);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create participation", e);
        }
    }

    public List<Challenge> getParticipatingChallenges(String userId) {
        try {
            List<ChallengeParticipation> participations =
                challengeParticipationRepository.findByUser_UserIdAndStatus(userId, "대기 중");

            if (participations.isEmpty()) {
                return new ArrayList<>();
            }

            return participations.stream()
                    .map(ChallengeParticipation::getChallenge)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch participating challenges", e);
        }
    }

    public boolean participateInChallenge(Long challengeId, String userId) {
        try {
            Challenge challenge = challengeRepository.findById(challengeId).orElse(null);
            User user = userRepository.findById(userId).orElse(null);

            if (challenge != null && user != null) {
                ChallengeParticipation participation = new ChallengeParticipation();
                participation.setChallenge(challenge);
                participation.setUser(user);
                participation.setStatus("대기 중");
                participation.setJoinedAt(LocalDate.now());

                challengeParticipationRepository.save(participation);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean completeChallenge(Long challengeId, String userId) {
        try {
            List<ChallengeParticipation> participations =
                challengeParticipationRepository.findAllByChallenge_ChallengeIdAndUser_UserIdAndStatus(
                    challengeId, userId, "대기 중");

            System.out.println("조회된 participation 수: " + participations.size());

            if (!participations.isEmpty()) {
                int earnedTotal = 0;

                for (ChallengeParticipation participation : participations) {
                    Integer earned = participation.getEarnedPoints();
                    if (earned == null) earned = 0;

                    // 해당 챌린지의 리워드 포인트 가져오기
                    int reward = participation.getChallenge().getPointReward();
                    earned += reward;
                    earnedTotal += reward;

                    participation.setStatus("완료");
                    participation.setCompletedAt(LocalDate.now());
                    participation.setEarnedPoints(earned);
                    challengeParticipationRepository.save(participation);
                }

                // 사용자 점수에 누적
                User user = userRepository.findById(userId).orElse(null);
                if (user != null) {
                    Integer score = user.getChallengeScore();
                    if (score == null) score = 0;
                    user.setChallengeScore(score + earnedTotal);
                    userRepository.save(user);
                }

                return true;
            }

            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }




    public boolean failChallenge(Long challengeId, String userId) {
        try {
            ChallengeParticipation participation =
                challengeParticipationRepository.findByChallenge_ChallengeIdAndUser_UserIdAndStatus(challengeId, userId, "대기 중");

            if (participation != null) {
                participation.setStatus("취소");
                participation.setCompletedAt(LocalDate.now());

                challengeParticipationRepository.save(participation);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}
