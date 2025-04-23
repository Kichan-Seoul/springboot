package com.study.springboot.service;

import com.study.springboot.entity.ChallengeParticipation;
import com.study.springboot.repository.ChallengeParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeParticipationService {

    @Autowired
    private ChallengeParticipationRepository challengeParticipationRepository;

    public ChallengeParticipation createParticipation(ChallengeParticipation participation) {
        return challengeParticipationRepository.save(participation);
    }
}
