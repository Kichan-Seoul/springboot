package com.study.springboot.controller;

import com.study.springboot.entity.Challenge;
import com.study.springboot.service.ChallengeParticipationService;
import com.study.springboot.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/challenges")
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @Autowired
    private ChallengeParticipationService challengeParticipationService;

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @GetMapping("/{id}")
    public Challenge getChallengeById(@PathVariable("id") Long id) {
        Challenge challenge = challengeService.getChallengeById(id);
        if (challenge == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "챌린지를 찾을 수 없습니다.");
        }
        return challenge;
    }

    @GetMapping("/category/{category}")
    public List<Challenge> getChallengesByCategory(@PathVariable("category") String category) {
        return challengeService.getChallengesByCategory(category);
    }

    @GetMapping("/filter")
    public List<Challenge> getChallengesByCategoryAndDifficulty(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "difficulty", required = false) String difficulty) {
        return challengeService.getChallengesByCategoryAndDifficulty(category, difficulty);
    }

    @GetMapping("/participating")
    public List<Challenge> getParticipatingChallenges(@RequestParam(name = "userId") String userId) {
        try {
            List<Challenge> challenges = challengeParticipationService.getParticipatingChallenges(userId);
            if (challenges == null || challenges.isEmpty()) {
                return List.of();
            }
            return challenges;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류 발생", e);
        }
    }

    @PostMapping("/{challengeId}/participate")
    public void participateInChallenge(@PathVariable("challengeId") Long challengeId,
                                       @RequestParam(name = "userId") String userId) {
        boolean result = challengeParticipationService.participateInChallenge(challengeId, userId);
        if (!result) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "챌린지 참여 실패");
        }
    }

    @PostMapping("/{challengeId}/complete")
    public void completeChallenge(@PathVariable("challengeId") Long challengeId,
                                  @RequestParam(name = "userId") String userId) {
        boolean result = challengeParticipationService.completeChallenge(challengeId, userId);
        if (!result) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "챌린지 성공 처리 실패");
        }
    }

    @PostMapping("/{challengeId}/fail")
    public void failChallenge(@PathVariable("challengeId") Long challengeId,
                              @RequestParam(name = "userId") String userId) {
        boolean result = challengeParticipationService.failChallenge(challengeId, userId);
        if (!result) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "챌린지 실패 처리 실패");
        }
    }

    @PostMapping
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeService.saveChallenge(challenge);
    }
}
