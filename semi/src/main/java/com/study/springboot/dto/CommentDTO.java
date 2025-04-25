package com.study.springboot.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {
	private String userId;
	private String content;
	private LocalDateTime createdAt;
}
