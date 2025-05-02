import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App'; 
import { getEmotionImg } from '../util/emotion-img'; 
import Button from '../components/Button'; 

const Detail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const data = useContext(DiaryStateContext); 

  const selectedDiary = data.find((diary) => diary.id === Number(id));

  if (!selectedDiary) {
    return <div>해당 일기를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="Detail">
      <Button 
        text="뒤로가기" 
        onClick={() => navigate(-1)} 
      />
      <h2>일기 상세</h2>
      <div>
        <strong>감정: </strong>{selectedDiary.emotionId}
      </div>
      <div>
        <img 
          src={getEmotionImg(selectedDiary.emotionId)} 
          alt="감정 이미지" 
          style={{ width: 100, height: 100 }} 
        />
      </div>
      <div>
        <strong>일기 내용: </strong>{selectedDiary.content}
      </div>
      <div>
        <strong>작성일: </strong>{new Date(selectedDiary.createDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Detail;
