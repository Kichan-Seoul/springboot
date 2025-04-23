import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CalorieChart from '../../components/CalorieChart/CalorieChart';  // CalorieChart 컴포넌트 임포트
import './main.css';

const Main = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    console.log("userId:", userId); // userId 값이 정상적으로 출력되는지 확인

    if (!userId) {
      console.error("userId가 없습니다."); // userId가 없을 경우 오류 출력
      return; // userId가 없으면 API 요청을 하지 않음
    }

    // userId로 사용자 정보를 API에서 가져오기
    axios.get(`http://localhost:8080/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", err);
      });
  }, []);

  if (!user) return <div>로딩 중...</div>;

  const remainingCalories = (user.caloriesConsumed || 0) - (user.caloriesBurned || 0);

  return (
    <div className="main-container">
      <div className="user-info">
        키 : {user.height}cm | 현재 몸무게 : {user.weight}kg | 목표 몸무게 : {user.goalWeight}kg | 도전 점수 : {user.challengeScore}점 | 잔여 칼로리 : {remainingCalories}kcal
      </div>

      <img src="/tiger.png" alt="호랑이" style={{ width: '150px' }} />

      <div className="charts">
        <div>
          <h4>섭취 칼로리</h4>
          <CalorieChart userId={user.id} /> {/* userId를 차트에 전달하여 데이터 로딩 */}
        </div>
        <div>
          <h4>운동 칼로리</h4>
          <p>🔥 총 소모 칼로리: {user.caloriesBurned || 0} kcal</p>
        </div>
      </div>

      <div>
        오늘 한 운동 :
        <img src="/icon1.png" alt="운동1" />
        <img src="/icon2.png" alt="운동2" />
        <img src="/icon3.png" alt="운동3" />
      </div>
    </div>
  );
};

export default Main;
