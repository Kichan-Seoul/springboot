import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ReplyList.css';

const ReplyList = () => {

        const { id } = useParams();  // 게시글 id
        const [replies, setReplies] = useState([]);
        const [newReply, setNewReply] = useState("");
        const userId = localStorage.getItem("userId");

        const [editingId, setEditingId] = useState(null);  // 현재 수정 중인 댓글 ID
        const [editingContent, setEditingContent] = useState("");  // 수정할 내용

        console.log("userId :", userId); 
        console.log("댓글 등록 요청:", userId, newReply);
      
        useEffect(() => {
         fetchReplies(); // 게시글 ID가 바뀔 때마다 댓글 새로 가져옴
            },[id]);

        //댓글목록 불러오기
        const fetchReplies = () => {
        axios.get(`http://localhost:8080/posts/${id}/comments`)
        .then(res => setReplies(res.data))
        .catch(err => console.error("댓글 불러오기 실패:", err));
    };

    //댓글등록
     const handleReplySubmit = (e) => {
    e.preventDefault();

    if (newReply.trim() === "") return;

    axios.post(`http://localhost:8080/posts/${id}/comments`, {  
      userId: userId,  
      content: newReply
    }).then(() => {
      setNewReply("");
      fetchReplies();  // 댓글 등록 후 목록 갱신
    }).catch(err => console.error("댓글 작성 실패:", err));
  };

  //댓글 삭제
  const handleDelete = (commentId) => {
    axios.post(`http://localhost:8080/posts/${id}/comments/${commentId}/delete`, {
        userId: userId  // 백엔드에서 권한 확인용
      })
    .then(() => {
      fetchReplies(); // 삭제 후 목록 갱신
    })
    .catch(err => {
      console.error("댓글 삭제 실패:", err);
      alert("삭제 권한이 없습니다.");
    });
  };

  //댓글수정
  const handleUpdate = (commentId) => {
    axios.post(`http://localhost:8080/posts/${id}/comments/${commentId}/edit`, {
      userId: userId,
      content: editingContent
    })
    .then(() => {
      fetchReplies();  // 다시 댓글 목록 불러오기
      setEditingId(null);  // 수정 모드 종료
    })
    .catch(err => {
      console.error("댓글 수정 실패:", err);
      alert("수정 권한이 없습니다.");
    });
  };
   

    return(
        <div className="reply-section">
        <h3>댓글</h3>
        <ul className="reply-list">
          {replies.map((reply, index) => (
            <li key={index}>
              <strong className="reply-user" >{reply.user.userId}</strong>
              <span className="reply-date">
              ({new Date(reply.createdAt).toLocaleString("ko-KR", {
                year: "2-digit", 
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })})
              </span>: 
              {""} {editingId === reply.id ? (
        <>
          <input
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />
          <button onClick={() => handleUpdate(reply.id)}>저장</button>
          <button onClick={() => setEditingId(null)}>취소</button>
        </>
      ) : (
        reply.content
      )}

{reply.user.userId === userId && editingId !== reply.id && (
  <>
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
  </>
)}
            </li>
          ))}
        </ul>
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
      </div>
    );
  };

export default ReplyList;