import React, { useState } from "react";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(""); // 사용자 ID

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const postData = {
      title: title,
      content: content,
      user: { userId: userId },
    };
  
    // 요청 URL 경로를 확인 후 수정 (예: /posts => /api/posts)
    axios
      .post("http://localhost:8080/api/posts", postData)  // 수정된 경로
      .then((response) => {
        console.log("게시글 작성 성공:", response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("사용자가 존재하지 않습니다.");
        } else {
          console.error("게시글 작성 실패:", error);
        }
      });
  };
  
  return (
    <div>
      <h1>게시글 작성</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="사용자 ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default Write;
