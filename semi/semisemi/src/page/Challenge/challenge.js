import React, { useState, useEffect } from "react";
import axios from "axios";

const Challenge = () => {
  // 챌린지 목록 상태 관리
  const [challenges, setChallenges] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("초급");
  const [category, setCategory] = useState("");  // 카테고리 상태 추가

  // 챌린지 목록 조회
  useEffect(() => {
    // 카테고리 필터가 비어있으면 모든 챌린지를 가져오고, 카테고리가 있으면 그에 맞는 챌린지를 조회
    let url = "http://localhost:8080/challenges";
    if (category) {
      url = `http://localhost:8080/challenges/category/${category}`;
    }

    axios.get(url)
      .then(response => {
        console.log(response.data);  // 데이터 확인
        setChallenges(response.data);
      })
      .catch(error => {
        console.error("챌린지 불러오기 실패:", error);
      });
  }, [category]);  // 카테고리 값이 바뀔 때마다 호출되도록

  // 챌린지 추가 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const newChallenge = { title, difficulty, category }; // category 추가

    axios.post("http://localhost:8080/challenges", newChallenge)
      .then(response => {
        setChallenges([...challenges, response.data]); // 새 챌린지를 목록에 추가
        setTitle(""); // 폼 초기화
        setDifficulty("초급"); // 폼 초기화
        setCategory(""); // 카테고리 초기화
      })
      .catch(error => {
        console.error("챌린지 추가 실패:", error);
      });
  };

  // 참여하기 버튼 처리 (ChallengeParticipation)
  const handleParticipation = (challengeId) => {
    const userId = "userId123"; // 사용자 ID 예시 (실제 사용자 ID는 로그인 시스템에서 받아와야 함)

    const participation = {
      userId,
      challengeId,
      status: '진행 중',
      joinedAt: new Date(),
    };

    axios.post("http://localhost:8080/challenge-participations", participation)
      .then(response => {
        alert("참여 성공!");
        // 필요한 경우, 참여 목록에 추가하거나 업데이트
      })
      .catch(error => {
        console.error("참여 실패:", error);
        alert("참여 실패!");
      });
  };

  // 카테고리 필터 처리
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);  // 카테고리 변경 시 상태 업데이트
  };

  return (
    <div>
      <h1>챌린지 목록</h1>
      
      {/* 카테고리 필터 */}
      <div>
        <label>카테고리 선택:</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">전체</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
      </div>

      {/* 챌린지 목록 표시 */}
      <div>
        {challenges.length > 0 ? (
          challenges.map(challenge => (
            <div key={challenge.challengeId} className="challenge-card">
              <h3>{challenge.title}</h3>
              <p>난이도: {challenge.difficulty}</p>
              <p>카테고리: {challenge.category}</p>
              <button onClick={() => handleParticipation(challenge.challengeId)}>
                참여하기
              </button>
            </div>
          ))
        ) : (
          <p>등록된 챌린지가 없습니다.</p>
        )}
      </div>

      {/* 챌린지 추가 폼 */}
      <h2>챌린지 추가</h2>
      <form onSubmit={handleSubmit}>
        <label>챌린지 제목:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
        <label>난이도:</label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)} 
          required
        >
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
        <label>카테고리:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        >
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
        <button type="submit">챌린지 추가</button>
      </form>
    </div>
  );
};

export default Challenge;
