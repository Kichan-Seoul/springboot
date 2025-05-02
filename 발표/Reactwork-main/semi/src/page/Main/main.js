import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Cell
} from 'recharts';
import './main.css';
import { useDarkMode } from '../../context/DarkModeContext';

const Main = () => {
  const { isDarkMode } = useDarkMode(); 
  const [user, setUser] = useState(null);
  const [todayCalories, setTodayCalories] = useState(null);
  const [burnedCalories, setBurnedCalories] = useState(null);
  const [mealCalories, setMealCalories] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
  const [exerciseTypes, setExerciseTypes] = useState([]);

  const mainCharacterImages = {
    "0": "/img/main1.png",
    "1": "/img/main2.png",
    "2": "/img/main3.png",
    "3": "/img/main4.png",
  };

  const typeIconMap = {
    유산소: isDarkMode ? "/img/dark_img1.png" : "/img/img1.png",
    근력: isDarkMode ? "/img/dark_img2.png" : "/img/img2.png",
    유연성: isDarkMode ? "/img/dark_img3.png" : "/img/img3.png",
    일상활동: isDarkMode ? "/img/dark_img4.png" : "/img/img4.png",
    균형감각: isDarkMode ? "/img/dark_img5.png" : "/img/img5.png",
  };

  const getKSTDateString = () => {
    const now = new Date();
    const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return kst.toISOString().split('T')[0];
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const today = getKSTDateString();

    axios.get(`http://localhost:8080/users/${userId}`).then(res => setUser(res.data));
    axios.get(`http://localhost:8080/food-logs/${userId}?date=${today}`).then(res => {
      const categorized = { breakfast: 0, lunch: 0, dinner: 0 };
      res.data.forEach(item => {
        const meal = item.MEAL_TIME || item.mealTime;
        const kcal = item.TOTAL_CALORIES || item.totalCalories || 0;
        const key = meal === "아침" ? "breakfast" : meal === "점심" ? "lunch" : meal === "저녁" ? "dinner" : null;
        if (key) categorized[key] += kcal;
      });
      setMealCalories(categorized);
      setTodayCalories(categorized.breakfast + categorized.lunch + categorized.dinner);
    });

    axios.get(`http://localhost:8080/users/${userId}/burned-calories`).then(res => setBurnedCalories(res.data || 0));
    axios.get(`http://localhost:8080/api/exercise-types/today`, { params: { userId } }).then(res => setExerciseTypes(res.data));
  }, []);

  if (!user || todayCalories === null || burnedCalories === null) {
    return <div style={{ textAlign: 'center' }}>로딩 중...</div>;
  }

  const remainingCalories = todayCalories - burnedCalories;

  const chartData = [
    { name: '아침', kcal: mealCalories.breakfast },
    { name: '점심', kcal: mealCalories.lunch },
    { name: '저녁', kcal: mealCalories.dinner },
    { name: '운동', kcal: burnedCalories },
  ];

  return (
    <>
      <div className={`main-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="main-user-card">
          <div className="main-user-info">
            <h3>👤 {user.name}님의 피트니스 리포트</h3>
            <p><strong>키</strong>: {user.height}cm | <strong>현재 몸무게</strong>: {user.weight}kg</p>
            <p><strong>목표 몸무게</strong>: {user.goalWeight}kg | <strong>도전 점수</strong>:
              <span className="main-badge">{user.challengeScore}점</span>
            </p>
            <div className="main-calories">
              🔥 잔여 칼로리: {remainingCalories} kcal
            </div>
          </div>

          <div className="main-character-wrapper">
            <img src={mainCharacterImages[user.profileImageUrl] || "/img/default.jpg"} alt="캐릭터" />
          </div>

          <div className="main-activity-section">
            <div className="main-activity-title">오늘 한 운동</div>
            <div className="main-exercise-icons">
              {exerciseTypes.map((type, index) => (
                <img
                  key={index}
                  src={typeIconMap[type] || "/icons/default.png"}
                  alt={type}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="main-graph-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#555" : "#ccc"} />
              <XAxis dataKey="name" tick={{ fill: isDarkMode ? "#fff" : "#000" }} tickLine={false} />
              <YAxis domain={[0, 800]} tick={{ fill: isDarkMode ? "#fff" : "#000" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#333" : "#fff",
                  borderColor: isDarkMode ? "#777" : "#ccc",
                  color: isDarkMode ? "#fff" : "#000"
                }}
                itemStyle={{ color: isDarkMode ? "#fff" : "#000" }}
                labelStyle={{ color: isDarkMode ? "#fff" : "#000" }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                content={() => (
                  <div style={{
                    display: 'flex',justifyContent: 'flex-end',marginBottom: '30px',fontSize: '13px', fontFamily: 'Noto Sans KR, Arial, sans-serif',
                    gap: '10px', paddingRight: '20px',color: isDarkMode ? '#ccc' : '#555'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '10px', height: '10px', backgroundColor: '#82ca9d', borderRadius: '50%', marginRight: '6px' }}></div>
                      식사
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '10px', height: '10px', backgroundColor: '#ff7f7f', borderRadius: '50%', marginRight: '6px' }}></div>
                      운동
                    </div>
                  </div>
                )}
              />
              <Bar
                dataKey="kcal"
                radius={[10, 10, 0, 0]}
                isAnimationActive
                label={{ position: 'top', fontSize: 12, fill: isDarkMode ? "#fff" : "#555" }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === '운동' ? '#ff7f7f' : '#82ca9d'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <footer className="main-footer">
          <div className="main-footer-top">
            <div className="main-footer-content">
              <img src="/img/footer1.png" alt="Footer Icon 1" className="main-footer-icon" />
              <span className="main-footer-text">더 조은 아카데미 | 4조 칼로몽</span>
              <img src="/img/footer2.png" alt="Footer Icon 2" className="main-footer-icon" />
            </div>
          </div>
          <div className="main-footer-bottom">
            <p>Made by: 이하늘 한정환 김기찬 안순화 한수연</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Main;
