import React, { useState, useEffect } from "react";
import axios from "axios";
import './Challenge.css';

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("전체");
  const [pointReward, setPointReward] = useState(50);
  const [userId, setUserId] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const visibleChallenges = isExpanded ? challenges : challenges.slice(0, 8);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId) {
      setUserId(loggedInUserId);
    } else {
      alert("로그인된 사용자 정보가 없습니다.");
    }
  }, []);

  useEffect(() => {
    let url = "http://localhost:8080/challenges";
    if (difficulty !== "전체") {
      url = `http://localhost:8080/challenges/filter?difficulty=${difficulty}`;
    }
    axios.get(url)
      .then(res => setChallenges(res.data))
      .catch(err => console.error("챌린지 불러오기 실패:", err));
  }, [difficulty]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/challenges/participating`, { params: { userId } })
        .then(res => setParticipatingChallenges(res.data))
        .catch(err => console.error("진행 중인 챌린지 불러오기 실패:", err));
    }
  }, [userId]);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleChallengeClick = (challengeId) => {
    if (!userId) {
      alert("로그인된 사용자 정보가 없습니다.");
      return;
    }

    axios.post(`http://localhost:8080/challenges/${challengeId}/participate`, null, {
      params: { userId }
    })
      .then(() => {
        alert('도전하기 성공!');
        axios.get(`http://localhost:8080/challenges/participating`, { params: { userId } })
          .then(res => setParticipatingChallenges(res.data))
          .catch(err => console.error("참여 목록 새로고침 실패:", err));
      })
      .catch(err => {
        console.error("도전하기 실패:", err);
        alert("도전하기 실패");
      });
  };

  const handleSuccess = (challengeId) => {
    if (!userId) {
      alert("로그인된 사용자 정보가 없습니다.");
      return;
    }

    axios.post(`http://localhost:8080/challenges/${challengeId}/complete`, null, {
      params: { userId }
    })
      .then(() => {
        alert('챌린지 성공!');
        axios.get(`http://localhost:8080/challenges/participating`, { params: { userId } })
          .then(res => setParticipatingChallenges(res.data))
          .catch(err => console.error("참여 목록 새로고침 실패:", err));
      })
      .catch(err => {
        console.error("챌린지 성공 처리 실패:", err);
        alert("챌린지 성공 처리 실패");
      });
  };

  const handleFailure = (challengeId) => {
    if (!userId) {
      alert("로그인된 사용자 정보가 없습니다.");
      return;
    }

    axios.post(`http://localhost:8080/challenges/${challengeId}/fail`, null, {
      params: { userId }
    })
      .then(() => {
        alert('챌린지 실패!');
        setParticipatingChallenges(prev =>
          prev.filter(ch => ch.challengeId !== challengeId)
        );
      })
      .catch(err => {
        console.error("챌린지 실패 처리 실패:", err);
        alert("챌린지 실패 처리 실패");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !difficulty || difficulty === "전체" || !pointReward) {
      alert("모든 필드를 정확히 입력해주세요.");
      return;
    }

    const today = new Date();
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);

    const newChallenge = {
      title,
      difficulty,
      category: "기타",
      startDate: today.toISOString().slice(0, 10),
      endDate: thirtyDaysLater.toISOString().slice(0, 10),
      pointReward: parseInt(pointReward, 10)
    };

    axios.post("http://localhost:8080/challenges", newChallenge)
      .then(res => {
        setChallenges(prev => [...prev, res.data]);
        setTitle("");
        setDifficulty("전체");
        setPointReward(50);
      })
      .catch(err => {
        console.error("챌린지 추가 실패:", err);
        alert("서버 오류로 챌린지를 추가할 수 없습니다.");
      });
  };

  return (
    <div className="challenge-container">
      <h1>챌린지 목록</h1>

      <div className="difficulty-filter">
        <label htmlFor="difficulty">난이도 선택:</label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="전체">전체</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
      </div>

      <h2>진행 중인 챌린지</h2>
      <div className="challenge-list">
        {participatingChallenges.length > 0 ? (
          participatingChallenges.map(challenge => (
            <div key={challenge.participationId || challenge.challengeId} className="challenge-card">
              <h3>{challenge.title}</h3>
              <p>난이도: {challenge.difficulty}</p>
              <p>상태: {challenge.status || "진행 중"}</p>
              <p>리워드 점수: {challenge.pointReward || 0}</p>
              <button onClick={() => handleSuccess(challenge.challengeId)}>성공</button>
              <button onClick={() => handleFailure(challenge.challengeId)}>실패</button>
            </div>
          ))
        ) : (
          <p>진행 중인 챌린지가 없습니다.</p>
        )}
      </div>

      <h2>전체 챌린지 목록</h2>
      <div className="challenge-list">
        {visibleChallenges.length > 0 ? (
          visibleChallenges.map(challenge => (
            <div key={challenge.challengeId} className="challenge-card">
              <h3>{challenge.title}</h3>
              <p>난이도: {challenge.difficulty}</p>
              <p>상태: {challenge.status || "대기 중"}</p>
              <p>리워드 점수: {challenge.pointReward || 0}</p>
              <button onClick={() => handleChallengeClick(challenge.challengeId)}>
                도전하기
              </button>
            </div>
          ))
        ) : (
          <p>등록된 챌린지가 없습니다.</p>
        )}
      </div>

      {challenges.length > 8 && (
        <div className="more-button-container2">
          <button className="toggle-btn2" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "접기 ▲" : "더 보기 ▼"}
          </button>
        </div>
      )}


      <h2>챌린지 추가</h2>
      <form className="challenge-form" onSubmit={handleSubmit}> 
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
          <option value="전체">-- 선택 --</option>
          <option value="초급">초급</option>
          <option value="중급">중급</option>
          <option value="고급">고급</option>
        </select>
        <label>리워드 점수:</label>
        <input
          type="number"
          value={pointReward}
          onChange={(e) => setPointReward(e.target.value)}
          required
        />
        <button type="submit">챌린지 추가</button>
      </form>
    </div>
  );
};

export default Challenge;
