package com.study.springboot.service;

import com.study.springboot.entity.Challenge;
import com.study.springboot.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    public Challenge getChallengeById(Long id) {
        return challengeRepository.findById(id).orElse(null);
    }

    public List<Challenge> getChallengesByCategoryAndDifficulty(String category, String difficulty) {
        if (category != null && !category.isEmpty() && difficulty != null && !difficulty.isEmpty()) {
            return challengeRepository.findByCategoryAndDifficulty(category, difficulty);
        } else if (category != null && !category.isEmpty()) {
            return challengeRepository.findByCategory(category);
        } else if (difficulty != null && !difficulty.isEmpty()) {
            return challengeRepository.findByDifficulty(difficulty);
        } else {
            return challengeRepository.findAll();
        }
    }

    public List<Challenge> getChallengesByCategory(String category) {
        return challengeRepository.findByCategory(category);
    }

    public Challenge saveChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }
} 
