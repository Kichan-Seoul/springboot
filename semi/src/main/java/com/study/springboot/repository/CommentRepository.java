package com.study.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.study.springboot.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostId(Long postId);  // 기존 메서드 유지

    void deleteByUser_UserId(String userId);  // userId로 댓글 삭제하는 메서드 추가
}
