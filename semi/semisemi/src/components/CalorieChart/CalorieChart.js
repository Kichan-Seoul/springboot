import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 필요한 Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CalorieChart = ({ userId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("유효한 userId가 없습니다."); // userId가 없을 경우 오류 처리
      return; // userId가 없으면 차트를 렌더링하지 않음
    }

    // userId로 데이터를 요청하는 API 호출
    fetch(`http://localhost:8080/users/${userId}/calories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const labels = data.map(item => item.date); // x축: 날짜
          const caloriesConsumed = data.map(item => item.caloriesConsumed); // 섭취 칼로리
          const caloriesBurned = data.map(item => item.caloriesBurned); // 운동 칼로리

          setChartData({
            labels,
            datasets: [
              {
                label: '섭취 칼로리',
                data: caloriesConsumed,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
              {
                label: '운동 칼로리',
                data: caloriesBurned,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
              },
            ],
          });
        } else {
          console.error("서버에서 받은 데이터가 배열이 아닙니다:", data);
        }
      })
      .catch(err => {
        console.error('데이터를 불러오는 데 실패했습니다.', err);
      });
  }, [userId]);

  if (!chartData) return <div>로딩 중...</div>;

  return (
    <div>
      <h3>칼로리 차트</h3>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default CalorieChart;
