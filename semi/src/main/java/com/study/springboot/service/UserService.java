package com.study.springboot.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.springboot.repository.CommentRepository;
import com.study.springboot.repository.ExerciseLogRepository;
import com.study.springboot.repository.FoodLogRepository;
import com.study.springboot.repository.PostRepository;
import com.study.springboot.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ExerciseLogRepository exerciseLogRepository;
    private final FoodLogRepository foodLogRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public UserService(UserRepository userRepository,
                       ExerciseLogRepository exerciseLogRepository,
                       FoodLogRepository foodLogRepository,
                       CommentRepository commentRepository,
                       PostRepository postRepository) {
        this.userRepository = userRepository;
        this.exerciseLogRepository = exerciseLogRepository;
        this.foodLogRepository = foodLogRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Transactional
    public void deleteUserAndRelatedData(String userId) {
        commentRepository.deleteByUser_UserId(userId);     // 1. 댓글 삭제
        postRepository.deleteByUser_UserId(userId);        // 2. 게시글 삭제
        exerciseLogRepository.deleteByUserId(userId);      // 3. 운동 기록 삭제
        foodLogRepository.deleteByUserId(userId);          // 4. 식사 기록 삭제
        userRepository.deleteById(userId);                 // 5. 마지막으로 유저 삭제
    }
}
