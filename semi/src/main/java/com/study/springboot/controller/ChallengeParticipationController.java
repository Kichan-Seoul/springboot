package com.study.springboot.controller;

import com.study.springboot.entity.ChallengeParticipation;
import com.study.springboot.service.ChallengeParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/challenge-participations")
@CrossOrigin(origins = "http://localhost:3000")  // React 클라이언트와의 CORS 설정
public class ChallengeParticipationController {

    @Autowired
    private ChallengeParticipationService challengeParticipationService;

    @PostMapping
    public ChallengeParticipation createParticipation(@RequestBody ChallengeParticipation participation) {
        return challengeParticipationService.createParticipation(participation);
    }
}
