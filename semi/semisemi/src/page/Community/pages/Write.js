import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate(); // 👈 이동 훅

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      content: content,
      user: { userId: userId },
    };

    axios
      .post("http://localhost:8080/posts", postData)
      .then((response) => {
        console.log("게시글 작성 성공:", response.data);
        alert("게시물이 등록되었습니다."); // ✅ 알림창
        navigate("/community"); // ✅ 커뮤니티 페이지로 이동
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("사용자가 존재하지 않습니다.");
          alert("사용자가 존재하지 않습니다.");
        } else {
          console.error("게시글 작성 실패:", error);
          alert("게시글 작성에 실패했습니다.");
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
