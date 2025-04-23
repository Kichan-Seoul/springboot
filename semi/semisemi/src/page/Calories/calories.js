import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './calories.css';

const Calories = () => {
  const [foods, setFoods] = useState([]);  // 음식 목록을 저장할 상태
  const [search, setSearch] = useState("");  // 검색어 상태
  const [searchResults, setSearchResults] = useState([]);  // 검색 결과 상태
  const [meals, setMeals] = useState({
    아침: [],
    점심: [],
    저녁: [],
  });  // 각 식사에 추가된 음식들
  const [selectedFood, setSelectedFood] = useState(null);  // 선택된 음식 상태
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 관리

  // 음식 목록 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:8080/foods')
      .then((response) => {
        setFoods(response.data);  // 데이터 받아서 상태 업데이트
        setIsLoading(false);  // 로딩 종료
      })
      .catch((error) => {
        console.error("Error fetching foods", error);
        setIsLoading(false);  // 오류가 나더라도 로딩 종료
      });
  }, []);

  // 음식 검색 처리
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    if (keyword.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = foods.filter((food) =>
      food.name.includes(keyword)
    );
    setSearchResults(filtered);
  };

  // 음식 선택 처리
  const handleSelectFood = (food) => {
    setSelectedFood(food);
  };

  // 식사에 음식 추가
  const addFoodToMeal = (meal, food) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: [...prev[meal], food],
    }));
    setSearch("");  // 검색어 초기화
    setSearchResults([]);  // 검색 결과 초기화
  };

  // 저장 버튼 클릭 시 음식 섭취 기록 저장
  const saveFoodLog = () => {
    if (selectedFood) {
      axios
        .post('http://localhost:8080/food-logs', {
          userId: 'user1', // 현재 로그인된 사용자 ID를 넣어야 합니다.
          foodId: selectedFood.foodId,  // 음식 ID
          quantity: 1,  // 기본적으로 1인분으로 설정
          totalCalories: selectedFood.calories,  // 음식의 칼로리
          logDate: new Date(),  // 현재 날짜 (음식 섭취 날짜)
        })
        .then((response) => {
          console.log('음식 섭취 기록 저장 성공', response.data);
        })
        .catch((error) => {
          console.error('음식 섭취 기록 저장 실패', error);
        });
    }
  };

  // 식사에서 음식 제거
  const removeFoodFromMeal = (meal, index) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== index),
    }));
  };

  // 총 칼로리 계산
  const getTotalCalories = () => {
    return Object.values(meals)
      .flat()
      .reduce((total, food) => total + food.calories, 0);
  };

  return (
    <div className="calories-container">
      <h2>섭취 칼로리</h2>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="음식 검색"
        value={search}
        onChange={handleSearch}
      />

      {/* 검색 결과 */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          {searchResults.map((food, idx) => (
            <div className="search-result" key={idx}>
              <span>{food.name} - {food.calories} kcal</span>
              <div className="search-result-buttons">
                {["아침", "점심", "저녁"].map((meal) => (
                  <button
                    key={meal}
                    onClick={() => addFoodToMeal(meal, food)}
                  >
                    {meal}에 추가
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 선택된 음식 표시 */}
      {selectedFood && (
        <div className="selected-food-container">
          <h3>선택된 음식: {selectedFood.name}</h3>
          <p>칼로리: {selectedFood.calories} kcal</p>
          <p>카테고리: {selectedFood.category}</p>
          <p>단위: {selectedFood.unit}</p>
          <button onClick={saveFoodLog} className="save-button">저장하기</button> {/* 저장 버튼 */}
        </div>
      )}

      {/* 식사별 음식 목록 */}
      <div className="meal-grid">
        {["아침", "점심", "저녁"].map((meal) => (
          <div className="meal-square" key={meal}>
            <h3>{meal}</h3>
            <div className="meal-items">
              {meals[meal].map((food, idx) => (
                <div key={idx} className="food-item">
                  <span>{food.name}</span>
                  <button
                    className="delete-button"
                    onClick={() => removeFoodFromMeal(meal, idx)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 총 칼로리 표시 */}
        <div className="meal-square total-calories-box">
          총 칼로리: {getTotalCalories()} kcal
        </div>
      </div>
    </div>
  );
};

export default Calories;
