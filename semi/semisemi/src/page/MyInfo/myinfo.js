import React, { useState, useEffect } from 'react';
import './myinfo.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyInfo = ({ handleLogout }) => { 
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    birth: '',
    gender: '',
    height: '',
    weight: '',
    goalWeight: '',
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`)
        .then((response) => {
          const data = response.data;
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
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditable) {
      const { height, weight, goalWeight } = userInfo;
      const numberRegex = /^[0-9]+$/;

      if (!height || !weight || !goalWeight) {
        alert('값을 모두 입력해주세요.');
        return;
      }

      if (!numberRegex.test(height) || !numberRegex.test(weight) || !numberRegex.test(goalWeight)) {
        alert('숫자만 입력해주세요.');
        return;
      }

      axios.put(`http://localhost:8080/users/${userId}`, {
        height: userInfo.height,
        weight: userInfo.weight,
        goalWeight: userInfo.goalWeight,
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

    setIsEditable((prev) => !prev);
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까? 탈퇴 시 모든 정보가 삭제됩니다.');
    if (confirmed) {
      axios.delete(`http://localhost:8080/users/${userId}`)
        .then((response) => {
          if (response.status === 204 || response.status === 200) {
            alert('회원 탈퇴가 완료되었습니다.');
            localStorage.clear(); 
            handleLogout();  
            navigate('/login'); 
          } else {
            alert('서버 오류로 탈퇴에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('회원 탈퇴 실패:', error);
          alert('회원 탈퇴 실패: ' + error.message);
        });
    }
  };

  return (
    <div className="myinfo-container">
      <div className="myinfo-box">
        <h2 className="myinfo-title">내 프로필</h2>

        <div className="myinfo-form">
          {['id', 'name', 'birth', 'gender'].map((field) => (
            <div className="info-group" key={field}>
              <label>{field === 'id' ? '아이디' : field === 'name' ? '이름' : field === 'birth' ? '생년월일' : '성별'}</label>
              <input type="text" value={userInfo[field]} disabled />
            </div>
          ))}
          {['height', 'weight', 'goalWeight'].map((field) => (
            <div className="info-group" key={field}>
              <label>{field === 'height' ? '키' : field === 'weight' ? '몸무게' : '목표 몸무게'}</label>
              <input
                type="text"
                name={field}
                value={userInfo[field]}
                disabled={!isEditable}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button className="edit-button" onClick={handleEditToggle}>
          {isEditable ? '수정 완료' : '내 정보 수정하기'}
        </button>

        <button className="delete-button" onClick={handleDeleteAccount}>
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyInfo;
