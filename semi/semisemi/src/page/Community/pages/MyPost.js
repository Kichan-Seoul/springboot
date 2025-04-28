import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import List from "../components/List";
import './MyPost.css'; 

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId"); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/posts")
      .then((res) => {
        console.log("받은 전체 게시글:", res.data);
        const userId = localStorage.getItem("userId");  
        const myPosts = res.data.filter(post => String(post.userId) === String(userId));
        setPosts(myPosts);
      })
      .catch((err) => {
        console.error("내 게시글 가져오기 실패:", err);
        alert("게시글 로딩 실패");
      });
  }, [userId]);

  return (
    <div className="my-post-container">
    <h1>내가 쓴 글</h1>
    {posts.length > 0 ? (
      <List posts={posts} />
    ) : (
      <p className="my-post-empty">작성한 게시글이 없습니다.</p>
    )}
  </div>  
  );
};

export default MyPost;
