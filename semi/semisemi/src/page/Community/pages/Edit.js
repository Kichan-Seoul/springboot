import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Edit.css';

const Edit = () => {
  const { id } = useParams();  // URL로부터 게시글 ID 받기
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 1. 기존 게시글 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${id}`)
      .then((res) => {
        console.log("불러온 게시글:", res.data);  // ✅ 이거 꼭 찍어봐

        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패:", err);
      });
  }, [id]);

  // 2. 수정 요청 보내기
  const currentUser = localStorage.getItem("userId");

  const handleUpdate = () => {
    const updatedPost = {
      title,
      content,
      userId: currentUser
    };

    axios.put(`http://localhost:8080/posts/${id}`, updatedPost)
      .then(() => {
        alert("수정 완료!");
        navigate(`/post/${id}`);
      })
      .catch((err) => {
        console.error("수정 실패:", err);
        alert("수정에 실패했습니다.");
      });
  };

  return (
    <div className="edit-container">
      <h2>게시글 수정</h2>
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
      <div className="button-row">
        <button className="cancel-btn" onClick={() => navigate(`/post/${id}`)}>취소</button>
        <button className="update-btn" onClick={handleUpdate}>수정 완료</button>
      </div>
    </div>
  );
};

export default Edit;
