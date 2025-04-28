package com.study.springboot.dto;

import java.time.LocalDateTime;

public class PostDTO {

    private Long id;
    private String title;
    private String content;
    private String userId;
    private String userName;
    private LocalDateTime createdAt;
    private Boolean isNotice;
    private String passwordHash;
    private Integer views;

    // --- 기본 생성자 ---
    public PostDTO() {}

    // --- 모든 필드를 받는 생성자 ---
    public PostDTO(Long id, String title, String content, String userId, String userName,
                   LocalDateTime createdAt, Boolean isNotice, String passwordHash, Integer views) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.userName = userName;
        this.createdAt = createdAt;
        this.isNotice = isNotice;
        this.passwordHash = passwordHash;
        this.views = views;
    }

    // --- Getter & Setter ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Boolean getIsNotice() { return isNotice; }
    public void setIsNotice(Boolean isNotice) { this.isNotice = isNotice; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }
}
