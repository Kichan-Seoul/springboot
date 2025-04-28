import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ReplyList.css';

const ReplyList = () => {
  const { id } = useParams(); // 게시글 id
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchReplies();
  }, [id]);

  const fetchReplies = () => {
    axios.get(`http://localhost:8080/posts/${id}/comments`)
      .then(res => setReplies(res.data))
      .catch(err => console.error("댓글 불러오기 실패:", err));
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (newReply.trim() === "") return;

    axios.post(`http://localhost:8080/posts/${id}/comments`, {
      userId: userId,
      content: newReply
    }).then(() => {
      setNewReply("");
      fetchReplies();
    }).catch(err => console.error("댓글 작성 실패:", err));
  };

  const handleDelete = (commentId) => {
    axios.post(`http://localhost:8080/posts/${id}/comments/${commentId}/delete`, {
      userId: userId
    }).then(() => {
      fetchReplies();
    }).catch(err => {
      console.error("댓글 삭제 실패:", err);
      alert("삭제 권한이 없습니다.");
    });
  };

  const handleUpdate = (commentId) => {
    axios.post(`http://localhost:8080/posts/${id}/comments/${commentId}/edit`, {
      userId: userId,
      content: editingContent
    }).then(() => {
      fetchReplies();
      setEditingId(null);
    }).catch(err => {
      console.error("댓글 수정 실패:", err);
      alert("수정 권한이 없습니다.");
    });
  };

  return (
    <div className="reply-section">
      <h3>💬 댓글</h3>

      <form onSubmit={handleReplySubmit} className="reply-form">
        <input
          className="reply-input"
          type="text"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button className="reply-button" type="submit">등록</button>
      </form>

      <ul className="reply-list">
        {replies.map((reply) => (
          <li key={reply.id} className="reply-item">
            <div className="reply-top">
              <strong className="reply-user">{reply.userId}</strong>
              <span className="reply-date">
                ({new Date(reply.createdAt).toLocaleString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })})
              </span>
            </div>

            {editingId === reply.id ? (
              <>
                <input
                  className="reply-edit-input"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <div className="reply-actions">
                  <button onClick={() => handleUpdate(reply.id)}>저장</button>
                  <button onClick={() => setEditingId(null)}>취소</button>
                </div>
              </>
            ) : (
              <>
                <div className="reply-content">{reply.content}</div>

                {String(reply.userId) === String(userId) && (
                  <div className="reply-actions">
                    <button
                      onClick={() => {
                        setEditingId(reply.id);
                        setEditingContent(reply.content);
                      }}
                    >
                      수정
                    </button>
                    <button onClick={() => handleDelete(reply.id)} className="delete-btn">
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplyList;
