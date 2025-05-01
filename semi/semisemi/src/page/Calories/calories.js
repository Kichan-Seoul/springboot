import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './calories.css';

const Calories = ({ userId }) => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [grams, setGrams] = useState('');
  const [calories, setCalories] = useState(0);
  const [meals, setMeals] = useState({ 아침: [], 점심: [], 저녁: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageGroup, setPageGroup] = useState(0);
  const itemsPerPage = 10;


  const getKSTDateString = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kst = new Date(utc + 9 * 60 * 60 * 1000);
    return kst.toISOString().split('T')[0];
  };

  useEffect(() => {
    axios.get('http://localhost:8080/foods')
      .then((res) => {
        setFoods(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching foods', err);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    if (keyword.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = foods.filter(food => food.name.includes(keyword));
      setSearchResults(filtered);
    }
  };

  const calculateCalories = (food, grams) => (food.calories * (grams / 100));

  const handleGramsChange = (e) => {
    const gramsValue = e.target.value;
    setGrams(gramsValue);
    if (selectedFood) {
      const cal = calculateCalories(selectedFood, gramsValue);
      setCalories(cal);
    }
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setGrams(200);
    const cal = calculateCalories(food, 200);
    setCalories(cal);
  };

  const addFoodToMeal = (meal) => {
    if (selectedFood && grams) {
      const newFood = {
        ...selectedFood,
        grams,
        calories: calculateCalories(selectedFood, grams),
      };
      setMeals(prev => ({
        ...prev,
        [meal]: [...prev[meal], newFood],
      }));
    }
  };

  const removeFoodFromMeal = (meal, idx) => {
    setMeals((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== idx),
    }));
  };

  const saveFoodLog = () => {
    const todayStr = getKSTDateString();
    const today = new Date(todayStr); 
  
    const allFoods = Object.entries(meals).flatMap(([mealName, foods]) =>
      foods.map((food) => ({
        userId,
        foodId: food.foodId,
        quantity: food.grams,
        totalCalories: food.calories,
        mealTime: mealName,
        logDate: today,
      }))
    );

    if (allFoods.length === 0) return;

    axios.post('http://localhost:8080/food-logs/bulk', allFoods)
      .then(() => {
        alert('저장되었습니다!');
        setMeals({ 아침: [], 점심: [], 저녁: [] });
        setSelectedFood(null);
        setGrams('');
        setCalories(0);
      })
      .catch((err) => {
        console.error('전체 식사 저장 실패', err);
      });
  };

  const getTotalCalories = () => {
    return Object.values(meals).flat().reduce((total, food) => total + food.calories, 0);
  };

  const displayedFoods = search ? searchResults : foods;
  const totalPages = Math.ceil(displayedFoods.length / itemsPerPage);

  return (
    <div className="calories-container">
      <h2>섭취 칼로리</h2>
      <input type="text" placeholder="음식 검색" value={search} onChange={handleSearch} />
      {isLoading ? <p>로딩 중...</p> : (
        <>
          <div className="food-grid">
            {displayedFoods.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((food, idx) => (
                <div className="food-card" key={idx}>
                  <span className="food-name">{food.name}</span>
                  <span className="food-calories">{food.calories} kcal</span>
                  <button onClick={() => handleSelectFood(food)}>선택</button>
                </div>
            ))}
          </div>

          <div className="calories-pagination">
            <button
              onClick={() => pageGroup > 0 && setPageGroup((g) => g - 1)}
              disabled={pageGroup === 0}
            >
              &lt; 이전
            </button>
            {Array.from({ length: 9 }, (_, i) => {
              const pageNum = pageGroup * 9 + i;
              if (pageNum >= totalPages) return null;
              return (
                <button
                  key={pageNum}
                  className={currentPage === pageNum ? "active" : ""}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum + 1}
                </button>
              );
            })}
            <button
              onClick={() => (pageGroup + 1) * 9 < totalPages && setPageGroup((g) => g + 1)}
              disabled={(pageGroup + 1) * 9 >= totalPages}
            >
              다음 &gt;
            </button>
          </div>
        </>
      )}
      {selectedFood && (
        <>
          <div className="input-calorie-block">
            <input type="number" className="gram-input" placeholder="그램 수 입력" value={grams} onChange={handleGramsChange} step="50"/>
            <p className="calculated-kcal">계산된 칼로리: {calories ? `${Math.round(calories)} kcal` : "-"}</p>
            <div className="meal-buttons">
              <button type="button" onClick={() => addFoodToMeal("아침")}>🥪 아침 추가</button>
              <button type="button" onClick={() => addFoodToMeal("점심")}>🍱 점심 추가</button>
              <button type="button" onClick={() => addFoodToMeal("저녁")}>🍲 저녁 추가</button>
            </div>
          </div>
          <div className="selected-food-container">
            <div className="text-left">
              <h3>선택된 음식: {selectedFood.name}</h3>
              <p>칼로리: {selectedFood.calories} kcal<br />(100g/ml 기준)</p>
            </div>
            <div className="text-right">
              <p>평균 1인분 기준</p>
              <p>
                불고기, 잡채, 돈까스, 삼겹살: 200g<br />
                된장찌개, 순두부찌개, 갈비탕: 250g<br />
                김치찌개, 국수, 닭볶음탕: 300g<br />
                비빔밥, 볶음밥: 350g
              </p>
            </div>
          </div>
        </>
      )}
      <div className="meals-row">
        {["아침", "점심", "저녁"].map((meal) => (
          <div className="meal-box" key={meal}>
            <h3>{meal}</h3>
            <div className="meal-items">
              {meals[meal].map((food, idx) => (
                <div key={idx} className="food-item">
                  <span>{food.name} ({food.grams}g) - {Math.round(food.calories)} kcal</span>
                  <button onClick={() => removeFoodFromMeal(meal, idx)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="total-calories-box">
        <h3>총 칼로리: {Math.round(getTotalCalories())} kcal</h3>
        <span className="text1">하루 평균 권장 칼로리: 남성 2400kcal, 여성 2000kcal</span>
      </div>
      {Object.values(meals).some(meal => meal.length > 0) && (
        <button onClick={saveFoodLog} className="save-button">전체 저장하기</button>
      )}
    </div>
  );
};

export default Calories;
