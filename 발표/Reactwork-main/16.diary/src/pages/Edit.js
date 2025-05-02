import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DiaryStateContext, DiaryDispatchContext } from '../App';


const Edit = () => {
    const { onUpdate } = useContext(DiaryDispatchContext);  
    const data = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const location = useLocation();
  
    const { id } = location.state || {};
  
    const [content, setContent] = useState('');
    const [emotionId, setEmotionId] = useState(1);
  
    useEffect(() => {
      if (id) {
        const selectedDiary = data.find((diary) => diary.id === id);
        if (selectedDiary) {
          setContent(selectedDiary.content);
          setEmotionId(selectedDiary.emotionId);
        }
      }
    }, [id, data]);
  
    const handleSave = () => {
      if (content.trim().length < 1) {
        alert('내용을 입력해주세요!');
        return;
      }
  
      onUpdate(id, new Date().getTime(), emotionId, content); 
  
      navigate('/');
    };
  
    return (
      <div>
        <h2>일기 수정</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="일기를 수정하세요."
          style={{ width: '100%' }}
        />
        <select value={emotionId} onChange={(e) => setEmotionId(Number(e.target.value))}>
          <option value={1}>기쁨</option>
          <option value={2}>슬픔</option>
          <option value={3}>분노</option>
          <option value={4}>두려움</option>
          <option value={5}>당황</option>
          <option value={6}>평온</option>
          <option value={7}>놀람</option>
          <option value={8}>질투</option>
        </select>
        <button onClick={handleSave}>저장하기</button>
      </div>
    );
  };
  
  export default Edit;
  
