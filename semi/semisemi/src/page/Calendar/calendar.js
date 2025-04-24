import React, { useState, useEffect } from 'react';
import './calendar.css';
import Calendar from 'react-calendar';
import axios from 'axios';

function CalendarPage({ userId }) {
  const [value, setValue] = useState(new Date());
  const [calorieData, setCalorieData] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);

  // KST 기준 날짜 문자열 반환
  const getKSTDateString = (date) => {
    const kst = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return kst.toISOString().split('T')[0];
  };

  // 날짜별 칼로리 가져오기
  const getCaloriesForDate = (date) => {
    const dateStr = getKSTDateString(date);
    const entry = calorieData.find(d => d.logDate === dateStr);
    return entry ? `${entry.totalCalories}kcal` : '0kcal';
  };

  // 날짜 선택 시 해당 날짜의 식단 데이터 요청
  useEffect(() => {
    if (!userId || !value) return;
    const dateStr = getKSTDateString(value);

    axios.get(`http://localhost:8080/food-logs/${userId}?date=${dateStr}`)
      .then((res) => setFoodLogs(res.data))
      .catch((err) => console.error('식단 데이터 불러오기 실패', err));
  }, [userId, value]);

  // 칼로리 데이터 최초 로딩
  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/foods/total-calories?userId=${userId}`)
      .then((res) => setCalorieData(res.data))
      .catch((err) => console.error('칼로리 데이터 불러오기 실패', err));
  }, [userId]);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#3f528c', marginBottom: '1rem' }}>
        내 식단 캘린더
      </h2>
      <Calendar 
        onChange={setValue} 
        value={value} 
        calendarType="gregory"
        formatDay={(locale, date) => date.getDate()}
        showNeighboringMonth={false}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const day = date.getDay();
            if (day === 6) {
              return 'saturday';
            }
          }
          return null;
        }}
        tileContent={({ date, view }) =>
          view === 'month' ? (
            <div
              style={{
                marginTop: 2,
                fontSize: '0.75rem',
                color: 'rgb(63, 82, 140)',
              }}
            >
              {getCaloriesForDate(date)}
            </div>
          ) : null
        }
      />

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#333' }}>📅 {getKSTDateString(value)} 식사 기록</h3>
        {foodLogs.length === 0 ? (
          <p style={{ color: '#999' }}>기록이 없습니다.</p>
        ) : (
          <ul style={{ paddingLeft: '1rem' }}>
            {foodLogs.map((log, index) => (
              <li key={index} style={{ marginBottom: '0.5rem', color: '#555' }}>
                [{log.mealTime}] {log.foodName ?? '알 수 없음'} - {log.totalCalories}kcal
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
