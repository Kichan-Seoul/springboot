package com.study.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.study.springboot.entity.ChallengeParticipation;
import com.study.springboot.service.ChallengeParticipationService;

@RestController
@RequestMapping("/challenge-participations")
@CrossOrigin(origins = "http://localhost:3000")
public class ChallengeParticipationController {

    @Autowired
    private ChallengeParticipationService challengeParticipationService;

    @PostMapping
    public ChallengeParticipation createParticipation(@RequestBody ChallengeParticipation participation) {
        return challengeParticipationService.createParticipation(participation);
    }
}
