package com.study.springboot.repository;

import com.study.springboot.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    List<Challenge> findByCategory(String category);

    List<Challenge> findByDifficulty(String difficulty);
}
