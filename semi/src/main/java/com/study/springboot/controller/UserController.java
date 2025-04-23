package com.study.springboot.controller;

import com.study.springboot.dto.BurnedCaloriesDTO;
import com.study.springboot.entity.User;
import com.study.springboot.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 전체 사용자 조회
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 사용자 생성
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ID로 사용자 조회
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userRepository.findById(id).orElse(null);
    }

    // 사용자 수정
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            // 수정할 항목만 갱신
            if (user.getHeight() != null) existingUser.setHeight(user.getHeight());
            if (user.getWeight() != null) existingUser.setWeight(user.getWeight());
            if (user.getGoalWeight() != null) existingUser.setGoalWeight(user.getGoalWeight());

            userRepository.save(existingUser);
            return ResponseEntity.ok(existingUser);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // ✅ 운동 칼로리만 업데이트
    @PutMapping("/{id}/burned-calories")
    public ResponseEntity<String> updateBurnedCalories(
            @PathVariable("id") String id,
            @RequestBody BurnedCaloriesDTO burnedDto
    ) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setCaloriesBurned(burnedDto.getCaloriesBurned());
                    userRepository.save(user);
                    return ResponseEntity.ok("운동 칼로리가 저장되었습니다.");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다."));
    }

    // 사용자 삭제
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userRepository.deleteById(id);
    }
}
