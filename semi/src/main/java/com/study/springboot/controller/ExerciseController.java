package com.study.springboot.controller;

import com.study.springboot.entity.Exercise;
import com.study.springboot.repository.ExerciseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercises")
@CrossOrigin(origins = "http://localhost:3000") // React와 연동 시 필수!
public class ExerciseController {

    private final ExerciseRepository exerciseRepository;

    public ExerciseController(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping
    public List<Exercise> getAllExercises() {
        List<Exercise> list = exerciseRepository.findAll();
        list.forEach(e -> System.out.println("✅ 운동 이름: " + e.getName()));
        System.out.println("🔥 백엔드 운동 개수: " + list.size());
        return list;
    }
}
