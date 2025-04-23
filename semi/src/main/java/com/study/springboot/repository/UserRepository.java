package com.study.springboot.repository;

import com.study.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // 기본적인 CRUD 메서드는 JpaRepository에서 제공됨
}
