package com.study.springboot.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.study.springboot.entity.User;

public interface UserRepository extends CrudRepository<User, String> {
	List<User> findAllByPasswordHash(String passwordHash);
	
}
