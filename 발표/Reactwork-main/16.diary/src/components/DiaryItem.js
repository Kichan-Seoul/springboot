import React, { useState } from 'react'; 
import Button from "./Button";
import './DiaryItem.css';
import { getEmotionImg } from "../util/emotion-img";
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트

const DiaryItem = ({ id, emotionId, createDate, content, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newEmotionId, setNewEmotionId] = useState(emotionId);
  const navigate = useNavigate();  // navigate 훅

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newContent.trim().length < 1) {
      alert("내용을 입력해주세요!");
      return;
    }
    onUpdate(id, new Date().getTime(), newEmotionId, newContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewContent(content);
    setNewEmotionId(emotionId);
    setIsEditing(false);
  };

  // 일기 항목을 클릭하면 Detail 페이지로 이동
  const handleClick = () => {
    navigate(`/detail/${id}`);  // id를 경로에 포함시켜 Detail 페이지로 이동
  };

  return (
    <div className="DiaryItem" onClick={handleClick}> {/* 클릭 시 handleClick 호출 */}
      <div className="img_section">
        <img src={getEmotionImg(newEmotionId)} alt="Emotion" style={{ width: 60, height: 60 }} />
      </div>
      <div className="info_section">
        <div>{new Date(createDate).toLocaleDateString()}</div>
        {isEditing ? (
          <>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              style={{ width: "100%", marginTop: 10 }}
            />
            <div style={{ marginTop: 10 }}>
              <label>감정 선택:</label>
              <select
                value={newEmotionId}
                onChange={(e) => setNewEmotionId(Number(e.target.value))}
                style={{ marginLeft: 10 }}
              >
                <option value={1}>기쁨</option>
                <option value={2}>슬픔</option>
                <option value={3}>분노</option>
                <option value={4}>두려움</option>
                <option value={5}>당황</option>
                <option value={6}>평온</option>
                <option value={7}>놀람</option>
                <option value={8}>질투</option>
              </select>
            </div>
          </>
        ) : (
          <div>{newContent}</div>
        )}
      </div>
      <div className="button_section">
        {isEditing ? (
          <>
            <Button text={"저장하기"} onClick={handleSave} />
            <Button text={"취소"} onClick={handleCancel} />
          </>
        ) : (
          <Button text={"수정하기"} onClick={handleEdit} />
        )}
      </div>
    </div>
  );
};

export default DiaryItem;
