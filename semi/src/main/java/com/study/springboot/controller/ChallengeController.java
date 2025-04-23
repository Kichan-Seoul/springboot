package com.study.springboot.controller;

import com.study.springboot.entity.Challenge;
import com.study.springboot.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenges")
@CrossOrigin(origins = "http://localhost:3000") // React 클라이언트가 3000번 포트에서 실행되므로 해당 포트를 추가
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping
    public List<Challenge> getAllChallenges() {
        return challengeService.getAllChallenges();
    }

    @GetMapping("/{id}")
    public Challenge getChallengeById(@PathVariable Long id) {
        return challengeService.getChallengeById(id);
    }

    @PostMapping
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeService.createChallenge(challenge);
    }

    @DeleteMapping("/{id}")
    public void deleteChallenge(@PathVariable Long id) {
        challengeService.deleteChallenge(id);
    }

    @GetMapping("/category/{category}")
    public List<Challenge> getChallengesByCategory(@PathVariable String category) {
        return challengeService.getChallengesByCategory(category);
    }
}
