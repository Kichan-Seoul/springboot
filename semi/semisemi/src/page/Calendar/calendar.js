// calendar.jsx 전체 코드 (KST 날짜 로직 수정 반영)

import React, { useState, useEffect } from 'react';
import './calendar.css';
import CalendarComponent from 'react-calendar';
import axios from 'axios';

function Calendar({ userId }) {
  const [value, setValue] = useState(new Date());
  const [calorieData, setCalorieData] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);

  
 // ✅ 수정된 KST 날짜 함수
 const getKSTDateString = (date) => {
  const kst = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return kst.toISOString().split('T')[0];
};



  // 🔍 날짜별 칼로리 표시
  const getCaloriesForDate = (date) => {
    const dateStr = getKSTDateString(date);
    const entry = calorieData.find(d => {
      const dbDate = typeof d.logDate === 'string'
        ? d.logDate.slice(0, 10)
        : new Date(d.logDate).toISOString().slice(0, 10);
      return dbDate === dateStr;
    });
    return entry ? `${entry.totalCalories} kcal` : '기록 없음';
  };

  // 📅 선택 날짜 식사 기록 요청
  useEffect(() => {
    if (!userId || !value) return;

    const dateStr = getKSTDateString(value);
    axios.get(`http://localhost:8080/food-logs/${userId}?date=${dateStr}`)
      .then((res) => setFoodLogs(res.data))
      .catch((err) => console.error('❌ [식사 기록 오류]', err));
  }, [userId, value]);

  // 📊 전체 날짜 칼로리 요청
  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/foods/total-calories?userId=${userId}`)
      .then((res) => setCalorieData(res.data))
      .catch((err) => console.error('❌ [칼로리 전체 오류]', err));
  }, [userId]);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#3f528c', marginBottom: '1rem' }}>
        내 식단 캘린더
      </h2>

      <CalendarComponent
        onChange={setValue}
        value={value}
        calendarType="gregory"
        formatDay={(locale, date) => date.getDate()}
        showNeighboringMonth={false}
        tileClassName={({ date, view }) => view === 'month' && date.getDay() === 6 ? 'saturday' : null}
        tileContent={({ date, view }) =>
          view === 'month' && (
            <div style={{ marginTop: 2, fontSize: '0.75rem', color: 'rgb(63, 82, 140)' }}>
              {getCaloriesForDate(date)}
            </div>
          )
        }
      />

      <div className="food-log-section">
        <h3>📅 {getKSTDateString(value)} 식사 기록</h3>
        {foodLogs.length === 0 ? (
          <p style={{ color: '#999' }}>기록이 없습니다.</p>
        ) : (
          <div className="meal-grid">
            {['아침', '점심', '저녁'].map((meal) => (
              <div key={meal} className="meal-column">
                <h4>{meal}</h4>
                <ul>
                  {foodLogs
                    .filter(log => log.mealTime === meal)
                    .map((log, i) => (
                      <li key={i}>
                        {log.foodName || '알 수 없음'} - {log.totalCalories} kcal
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
