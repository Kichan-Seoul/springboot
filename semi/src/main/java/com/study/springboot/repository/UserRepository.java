package com.study.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.study.springboot.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
    // JPA 기본 메소드 제공, 추가적인 쿼리 메소드 필요 시 작성
}