package com.study.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.springboot.dto.PostDTO;
import com.study.springboot.entity.Post;
import com.study.springboot.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByIdDesc();
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    @Transactional
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Transactional
    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    @Transactional
    public void increaseViews(Long postId) {
        System.out.println("increaseViews called for postId = " + postId);
        postRepository.incrementViews(postId);
    }

    // ✅ Post -> PostDTO 변환 메소드
    private PostDTO convertToDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setUserId(post.getUser().getUserId());
        dto.setUserName(post.getUser().getName()); // ✅ 수정된 부분
        dto.setCreatedAt(post.getCreatedAt());
        dto.setIsNotice(post.getIsNotice());
        dto.setPasswordHash(post.getUser().getPasswordHash());
        dto.setViews(post.getViews());
        return dto;
    }

    // ✅ 단건 조회 DTO 반환
    public PostDTO getPostDTOById(Long id) {
        Post post = postRepository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Post not found: " + id));
        return convertToDTO(post);
    }

    // ✅ 전체 조회 DTO 반환
    public List<PostDTO> getAllPostDTOs() {
        List<Post> posts = postRepository.findAll();
        
        posts.sort((a, b) -> {
            if (a.getIsNotice() && !b.getIsNotice()) return -1;
            if (!a.getIsNotice() && b.getIsNotice()) return 1;
            return b.getId().compareTo(a.getId()); // 같은 종류끼리는 최신순
        });

        return posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
