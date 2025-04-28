import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import './main.css';

const Main = () => {
  const [user, setUser] = useState(null);
  const [todayCalories, setTodayCalories] = useState(null);
  const [burnedCalories, setBurnedCalories] = useState(null);
  const [mealCalories, setMealCalories] = useState({ breakfast: 0, lunch: 0, dinner: 0 });
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const mainCharacterImages = {
    "0": "/img/main1.png",
    "1": "/img/main2.png",
    "2": "/img/main3.png",
    "3": "/img/main4.png",
  };

  const typeIconMap = {
    유산소: "/img/img1.png",
    근력: "/img/img2.png",
    유연성: "/img/img3.png",
    일상활동: "/img/img4.png",
    균형감각: "/img/img5.png"
  };

  const getKSTDateString = () => {
    const now = new Date();
    const kst = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return kst.toISOString().split('T')[0];
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("userId가 없습니다.");
      return;
    }

    const today = getKSTDateString();

    axios.get(`http://localhost:8080/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error("사용자 정보 불러오기 실패", err));

    axios.get(`http://localhost:8080/food-logs/${userId}?date=${today}`)
      .then(res => {
        const categorized = { breakfast: 0, lunch: 0, dinner: 0 };
        res.data.forEach(item => {
          const meal = item.MEAL_TIME || item.mealTime;
          const kcal = item.TOTAL_CALORIES || item.totalCalories || 0;

          const key =
            meal === "아침" ? "breakfast" :
            meal === "점심" ? "lunch" :
            meal === "저녁" ? "dinner" :
            null;

          if (key) categorized[key] += kcal;
        });
        setMealCalories(categorized);
        setTodayCalories(
          categorized.breakfast + categorized.lunch + categorized.dinner
        );
      })
      .catch(() => setTodayCalories(0));

    axios.get(`http://localhost:8080/users/${userId}/burned-calories`)
      .then(res => setBurnedCalories(res.data || 0))
      .catch(() => setBurnedCalories(0));

    axios.get(`http://localhost:8080/api/exercise-types/today`, {
      params: { userId }
    })
      .then(res => {
        setExerciseTypes(res.data);
      })
      .catch(err => {
        console.error("오늘 운동 타입 불러오기 실패", err);
        setExerciseTypes([]);
      });

  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  if (!user || todayCalories === null || burnedCalories === null) {
    return <div style={{ textAlign: 'center' }}>로딩 중...</div>;
  }

  const remainingCalories = todayCalories - burnedCalories;

  const chartData = [
    { name: '아침', kcal: mealCalories.breakfast },
    { name: '점심', kcal: mealCalories.lunch },
    { name: '저녁', kcal: mealCalories.dinner },
    { name: '운동', kcal: -burnedCalories },
  ];

  return (
    <div className="main-container">
      <button onClick={toggleDarkMode} className="dark-toggle">
        {darkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
      </button>

      <div className="user-info">
        키: {user.height}cm | 현재 몸무게: {user.weight}kg | 목표 몸무게: {user.goalWeight}kg |
        도전 점수: {user.challengeScore}점 | 🔥 잔여 칼로리: {remainingCalories}kcal
      </div>

      <img
        src={mainCharacterImages[user.profileImageUrl] || "/img/default.jpg"}
        alt="내 캐릭터"
        style={{ width: "500px", borderRadius: "10px" }}
      />

      <div className="graph-wrapper">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[-300, 800]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="kcal" radius={[10, 10, 0, 0]} isAnimationActive fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="charts">
        <div>
          <h4>오늘 섭취 칼로리</h4>
          <p>🍱 {todayCalories} kcal</p>
        </div>
        <div>
          <h4>운동 칼로리</h4>
          <p>🔥 총 소모 칼로리: {burnedCalories} kcal</p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        오늘 한 운동:
        {exerciseTypes.map((type) => (
          <img
            key={type}
            src={typeIconMap[type] || "/icons/default.png"}
            alt={type}
            style={{ width: '40px', margin: '0 10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
