package com.study.springboot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "POSTS") // 테이블 이름 명시
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Hibernate 프록시 객체 무시
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 설정
    @Column(name = "POST_ID") // 컬럼명 'POST_ID' 명시
    private Long id;

    private String title;
    private String content;

    // User와의 관계 설정 (게시글 작성자)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") // 외래 키 설정
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})  // 추가
    private User user;

    // Getters and Setters
}
