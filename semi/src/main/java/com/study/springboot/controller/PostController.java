package com.study.springboot.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.study.springboot.dto.CommentDTO;
import com.study.springboot.dto.PostDTO;
import com.study.springboot.entity.Comment;
import com.study.springboot.entity.Post;
import com.study.springboot.entity.User;
import com.study.springboot.repository.PostRepository;
import com.study.springboot.repository.UserRepository;
import com.study.springboot.service.CommentService;
import com.study.springboot.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostService postService;
    private final CommentService commentService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // ✅ 게시글 작성
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String content = request.get("content");
        String userId = request.get("userId");
        String passwordHash = request.get("passwordHash");

        if (title == null || content == null || passwordHash == null || userId == null) {
            return ResponseEntity.badRequest().body("입력값이 누락되었습니다.");
        }

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 사용자입니다.");
        }

        User user = userOpt.get();
        if (!user.getPasswordHash().equals(passwordHash)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 일치하지 않습니다.");
        }

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);

        post.setIsNotice("admin".equals(user.getUserId()));

        Post saved = postRepository.save(post);
        return ResponseEntity.ok(saved);
    }

    // ✅ 게시글 전체 조회
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        try {
            List<PostDTO> dtos = postService.getAllPostDTOs();
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ 게시글 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable("id") Long id) {
        try {
            postService.increaseViews(id); // ✅ 조회수 먼저 증가
            PostDTO dto = postService.getPostDTOById(id); // ✅ 그 다음 DTO 변환
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // ✅ 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable("id") Long id, @RequestBody PostDTO postDTO) {
        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            if (!post.getUser().getUserId().equals(postDTO.getUserId()) && !"admin".equals(postDTO.getUserId())) {
                return new ResponseEntity<>("수정 권한 없음", HttpStatus.FORBIDDEN);
            }

            post.setTitle(postDTO.getTitle());
            post.setContent(postDTO.getContent());
            postRepository.save(post);

            return new ResponseEntity<>("수정 완료", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("게시글 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id, @RequestBody Map<String, String> request) {
        String userId = request.get("userId");

        try {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            if (!post.getUser().getUserId().equals(userId) && !"admin".equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한 없음");
            }

            List<Comment> comments = commentService.getCommentsByPostId(id);
            for (Comment comment : comments) {
                commentService.deleteComment(comment.getId(), comment.getUser().getUserId());
            }

            postRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 삭제 실패");
        }
    }

    // ✅ 조회수 증가
    @PostMapping("/{id}/views")
    public ResponseEntity<?> increaseViews(@PathVariable("id") Long id) {
        try {
            postService.increaseViews(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회수 증가 실패");
        }
    }

    // ✅ 댓글 등록/조회/수정/삭제 (기존과 동일)
    @PostMapping("/{postId}/comments")
    public ResponseEntity<?> createComment(@PathVariable("postId") Long postId, @RequestBody CommentDTO commentDTO) {
        try {
            commentService.saveComment(postId, commentDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("댓글 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable("postId") Long postId) {
        try {
            List<Comment> comments = commentService.getCommentsByPostId(postId);
            List<CommentDTO> dtos = comments.stream().map(comment -> {
                CommentDTO dto = new CommentDTO();
                dto.setId(comment.getId());
                dto.setUserId(comment.getUser().getUserId());
                dto.setContent(comment.getContent());
                dto.setCreatedAt(comment.getCreatedAt());
                return dto;
            }).collect(Collectors.toList());

            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{postId}/comments/{commentId}/delete")
    public ResponseEntity<?> deleteComment(@PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId, @RequestBody CommentDTO dto) {
        try {
            commentService.deleteComment(commentId, dto.getUserId());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한 없음");
        }
    }

    @PostMapping("/{postId}/comments/{commentId}/edit")
    public ResponseEntity<?> updateComment(@PathVariable("postId") Long postId, @PathVariable("commentId") Long commentId, @RequestBody CommentDTO dto) {
        try {
            commentService.updateComment(commentId, dto.getUserId(), dto.getContent());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한 없음");
        }
    }
}
