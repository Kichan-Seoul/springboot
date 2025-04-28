package com.study.springboot.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {
    private Long id; // 댓글 고유 ID (프론트에서 수정/삭제 시 필요)
    private String userId; // 수정: String 타입으로 변경
    private String content;
    private LocalDateTime createdAt;
}
