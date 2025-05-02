import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './List.css';

const List = ({ posts }) => {
  const navigate = useNavigate();

  const handlePostClick = (e, postId) => {
    e.preventDefault();
    navigate(`/detail/${postId}`);
  };

  return (
    <div className="list-container">
      {posts.map((post) => (
        <div key={post.id} className="list-item">
          <Link
            to="#"
            className="post-link"
            onClick={(e) => handlePostClick(e, post.id)}
          >
            <h2>
              {post.userName === '관리자' ? (
                <span className="admin-tag">공지사항</span>
              ) : (
                post.isNotice && <span className="notice-tag">[공지]</span>
              )}
              {post.title}
            </h2>
          </Link>

          <p>{post.content}</p>

          <div className="post-meta">
            <span className="author">작성자: {post.userName}</span>
            <span className="views">조회수: {post.views || 0}</span>
            <span className="date">
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
