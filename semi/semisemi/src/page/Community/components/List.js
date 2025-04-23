import React from "react";
import { Link } from "react-router-dom";
import './List.css';

const List = ({ posts }) => {
  return (
    <div className="list-container">
      {posts.map((post) => (
        <div key={post.id} className="list-item"> 
          {/* Link를 사용해 post 상세 페이지로 이동 */}
          <Link to={`/post/${post.id}`} className="post-link">
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
