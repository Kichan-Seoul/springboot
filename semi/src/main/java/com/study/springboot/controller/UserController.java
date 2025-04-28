package com.study.springboot.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.study.springboot.entity.User;
import com.study.springboot.repository.UserRepository;
import com.study.springboot.service.ExerciseLogService;
import com.study.springboot.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;
    private final ExerciseLogService exerciseLogService;
    private final UserService userService;

    public UserController(UserRepository userRepository,
                          ExerciseLogService exerciseLogService,
                          UserService userService) {
        this.userRepository = userRepository;
        this.exerciseLogService = exerciseLogService;
        this.userService = userService; 
    }

    @GetMapping
    public List<User> getAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                            .collect(Collectors.toList());
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (user.getHeight() != null) existingUser.setHeight(user.getHeight());
            if (user.getWeight() != null) existingUser.setWeight(user.getWeight());
            if (user.getGoalWeight() != null) existingUser.setGoalWeight(user.getGoalWeight());

            userRepository.save(existingUser);
            return ResponseEntity.ok(existingUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/{id}/burned-calories")
    public ResponseEntity<Integer> getTodayBurnedCalories(@PathVariable("id") String id) {
        int todayCalories = exerciseLogService.getTodayCalories(id);
        return ResponseEntity.ok(todayCalories);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String id) {
    	userService.deleteUserAndRelatedData(id);
        return ResponseEntity.noContent().build();
    }
    
    
 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userRepository.findById(loginRequest.getUserId()).orElse(null);
        if (user == null) return ResponseEntity.status(401).body("존재하지 않는 아이디입니다.");
        if (!user.getPasswordHash().equals(loginRequest.getPasswordHash())) {
            return ResponseEntity.status(401).body("비밀번호가 틀렸습니다.");
        }
        return ResponseEntity.ok(user);
    }

    
    
}
