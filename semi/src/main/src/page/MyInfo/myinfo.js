import React, { useState, useEffect } from 'react';
import './myinfo.css';
import axios from 'axios';

const MyInfo = () => {
  const [isEditable, setIsEditable] = useState(false);  // 정보 수정 가능 여부
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    birth: '',
    gender: '',
    height: '',
    weight: '',
    goalWeight: '',
  });

  const userId = localStorage.getItem('userId');  // 로컬 스토리지에서 userId를 가져옵니다.

  // useEffect를 사용해 사용자 정보 가져오기
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then((response) => {
          const data = response.data;
          console.log("Server Response:", data);  // 서버 응답 데이터 확인

          // 상태 업데이트
          setUserInfo({
            id: data.userId || '',
            name: data.name || '',
            birth: data.birthDate || '',
            gender: data.gender || '',
            height: data.height || '',
            weight: data.weight || '',
            goalWeight: data.goalWeight || '',
          });
        })
        .catch((error) => {
          console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
        });
    } else {
      console.error('유효한 userId가 없습니다.');
    }
  }, [userId]);  // userId가 변경될 때마다 다시 데이터를 가져옵니다.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditable) {
      const { height, weight, goalWeight } = userInfo;
      const numberRegex = /^[0-9]+$/;

      // 입력 값 검증
      if (!height || !weight || !goalWeight) {
        alert('값을 모두 입력해주세요.');
        return;
      }

      // 숫자만 입력하도록 체크
      if (!numberRegex.test(height) || !numberRegex.test(weight) || !numberRegex.test(goalWeight)) {
        alert('숫자만 입력해주세요.');
        return;
      }

      // 수정된 정보를 DB에 전송 (성별은 보내지 않음)
      axios.put(`http://localhost:8080/users/${userId}`, {
        height: userInfo.height,
        weight: userInfo.weight,
        goalWeight: userInfo.goalWeight,
        // 성별은 수정하지 않으므로 포함시키지 않음
      })
        .then((response) => {
          if (response.status === 200) {
            alert('정보가 수정되었습니다!');
          } else {
            alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
          }
        })
        .catch((error) => {
          console.error('정보 수정에 실패했습니다.', error);
          alert('정보 수정에 실패했습니다. 오류: ' + error.message);
        });
    }

    setIsEditable((prev) => !prev);  // 수정 모드 토글
  };

  return (
    <div className="myinfo-container">
      <div className="myinfo-box">
        <h2 className="myinfo-title">내 프로필</h2>

        <div className="myinfo-form">
          <div className="info-group">
            <label>아이디</label>
            <input type="text" value={userInfo.id} disabled />
          </div>
          <div className="info-group">
            <label>이름</label>
            <input type="text" value={userInfo.name} disabled />
          </div>
          <div className="info-group">
            <label>생년월일</label>
            <input type="text" value={userInfo.birth} disabled />
          </div>
          <div className="info-group">
            <label>성별</label>
            <input type="text" value={userInfo.gender} disabled />
          </div>
          <div className="info-group">
            <label>키</label>
            <input
              type="text"
              name="height"
              value={userInfo.height}
              disabled={!isEditable}
              onChange={handleChange}
            />
          </div>
          <div className="info-group">
            <label>몸무게</label>
            <input
              type="text"
              name="weight"
              value={userInfo.weight}
              disabled={!isEditable}
              onChange={handleChange}
            />
          </div>
          <div className="info-group">
            <label>목표 몸무게</label>
            <input
              type="text"
              name="goalWeight"
              value={userInfo.goalWeight}
              disabled={!isEditable}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="edit-button" onClick={handleEditToggle}>
          {isEditable ? '수정 완료' : '내 정보 수정하기'}
        </button>
      </div>
    </div>
  );
};

export default MyInfo;
