import React, { useState, useEffect } from 'react';
import CalendarComponent from 'react-calendar';
import axios from 'axios';
import './calendar.css'; 

function Calendar({ userId }) {
  const [value, setValue] = useState(new Date());
  const [calorieData, setCalorieData] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);

  const getKSTDateString = (date) => {
    const kst = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return kst.toISOString().split('T')[0];
  };

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

  
  const getExerciseName = (exerciseId) => {
    const exercise = exerciseList.find(ex => ex.id === exerciseId);
    return exercise ? exercise.name : `운동 ID: ${exerciseId}`;
  };

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8080/exercises`)
      .then((res) => setExerciseList(res.data))
      .catch((err) => console.error('❌ [운동 목록 오류]', err));
  }, [userId]);

  useEffect(() => {
    if (!userId || !value) return;
    const dateStr = getKSTDateString(value);

    axios.get(`http://localhost:8080/food-logs/${userId}?date=${dateStr}`)
      .then((res) => setFoodLogs(res.data))
      .catch((err) => console.error('❌ [식사 기록 오류]', err));

    axios.get(`http://localhost:8080/exercise-logs/${userId}?date=${dateStr}`)
      .then((res) => setExerciseLogs(res.data))
      .catch((err) => console.error('❌ [운동 기록 오류]', err));
  }, [userId, value]);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:8080/foods/total-calories?userId=${userId}`)
      .then((res) => setCalorieData(res.data))
      .catch((err) => console.error('❌ [칼로리 전체 오류]', err));
  }, [userId]);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#3f528c', marginBottom: '1rem' }}>
        내 건강 캘린더
      </h2>

      <CalendarComponent
        onChange={setValue}
        value={value}
        calendarType="gregory"
        formatDay={(locale, date) => date.getDate()}
        showNeighboringMonth={false}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            if (date.getDay() === 0) return 'calendar-sunday'; 
            if (date.getDay() === 6) return 'calendar-saturday';
          }
          return null;
        }}
        tileContent={({ date, view }) =>
          view === 'month' && (
            <div style={{ marginTop: 2, fontSize: '0.75rem', color: '#666' }}>
              {getCaloriesForDate(date)}
            </div>
          )
        }
      />


      <div className="calendar-log-section">
        <h3>📅 {getKSTDateString(value)} 기록</h3>

        <div className="calendar-meal-grid">
          {['아침', '점심', '저녁'].map((meal) => (
            <div key={meal} className="calendar-meal-column">
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

        <div className="calendar-exercise-log">
          <h4>🔥 운동 기록</h4>
          {exerciseLogs.length === 0 ? (
            <p style={{ color: '#999' }}>운동 기록 없음</p>
          ) : (
            <ul>
              {exerciseLogs.map((log, idx) => (
                <li key={idx}>
                  {getExerciseName(log.exerciseId)} | 소요 시간: {log.durationMin}분 | 소모 칼로리: {log.caloriesBurned} kcal
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;