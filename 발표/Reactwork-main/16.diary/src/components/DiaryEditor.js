import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "./Button";
import { getEmotionImg } from "../util/emotion-img"; 

const DiaryEditor = () => {
  const [content, setContent] = useState(""); 
  const [emotionId, setEmotionId] = useState(1); 
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); 

  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.trim().length < 1) {
      alert("일기 내용을 입력해주세요!");
      return;
    }

   
    const dateInMillis = new Date(selectedDate).getTime();

  
    onCreate(dateInMillis, emotionId, content);
    navigate("/", { replace: true });
  };


  const handleEmotionClick = (id) => {
    setEmotionId(id);
  };

  return (
    <div className="DiaryEditor">
      <h3>오늘의 감정</h3>

      
      <div>
        <h4>날짜 선택</h4>
        <input 
          type="date"
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
        />
      </div>

      
      <div>
        <h4>감정 선택</h4>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {[
            { id: 1, name: "기쁨" },
            { id: 2, name: "슬픔" },
            { id: 3, name: "분노" },
            { id: 4, name: "두려움" },
            { id: 5, name: "당황" },
            { id: 6, name: "평온" },
            { id: 7, name: "놀람" },
            { id: 8, name: "질투" }
          ].map((emotion) => (
            <div
              key={emotion.id}
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => handleEmotionClick(emotion.id)} 
            >
              <img 
                src={getEmotionImg(emotion.id)} 
                alt={emotion.name} 
                style={{ width: 60, height: 60 }}
              />
              <div>{emotion.name}</div> 
            </div>
          ))}
        </div>
      </div>

 
      <div>
        <h4>선택한 감정</h4>
        <img 
          src={getEmotionImg(emotionId)} 
          alt="Selected Emotion" 
          style={{ width: 100, height: 100 }}
        />
      </div>

   
<h3>오늘의 일기</h3>
<textarea
  value={content}
  onChange={(e) => setContent(e.target.value)}
  rows={8}
  placeholder="오늘 어떤 일이 있었나요?"
  style={{ width: "100%", marginTop: 10 }}
/>

  
      <div>
        <Button text="저장하기" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default DiaryEditor;
