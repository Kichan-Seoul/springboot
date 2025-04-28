package com.study.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.springboot.dto.CommentDTO;
import com.study.springboot.entity.Comment;
import com.study.springboot.entity.Post;
import com.study.springboot.entity.User;
import com.study.springboot.repository.CommentRepository;
import com.study.springboot.repository.PostRepository;
import com.study.springboot.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // 댓글 등록
    public void saveComment(Long postId, CommentDTO dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자가 존재하지 않습니다."));

        Comment comment = new Comment();
        comment.setContent(dto.getContent());
        comment.setUser(user);
        comment.setPost(post);

        commentRepository.save(comment);
    }

    // 목록 가져오기
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글 없음"));

        if (!comment.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("삭제 권한 없음");
        }

        commentRepository.delete(comment);
    }

    // 댓글 수정
    public void updateComment(Long commentId, String userId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));

        if (!comment.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("수정 권한이 없습니다.");
        }

        comment.setContent(content);
        commentRepository.save(comment);
    }
}


