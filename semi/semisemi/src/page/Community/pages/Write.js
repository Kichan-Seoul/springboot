import React, { useState } from "react";
import axios from "axios";
import "./Write.css";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); 

    if (!userId || !password) {
      alert("로그인이 필요하거나 비밀번호가 누락되었습니다.");
      return;
    }

    const postData = {
      title,
      content,
      userId,             
      passwordHash: password, 
    };

    try {
      const response = await axios.post("http://localhost:8080/posts", postData);
      alert("게시글이 성공적으로 등록되었습니다.");
      navigate("/community");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("비밀번호가 일치하지 않거나 로그인 정보를 확인하세요.");
      } else {
        alert("게시글 작성 중 오류 발생!");
        console.error("에러 로그:", error);
      }
    }
  };

  return (
    <div className="write-container">
      <h1 className="write-title-header">게시글 작성</h1>
      <form onSubmit={handleSubmit} className="write-form">
        <input
          className="write-input"
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="write-textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          className="write-input"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="write-button-group">
          <button
            type="button"
            className="write-button reset"
            onClick={() => {
              setTitle("");
              setContent("");
              setPassword("");
            }}
          >
            초기화
          </button>
          <button type="submit" className="write-button submit">
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
