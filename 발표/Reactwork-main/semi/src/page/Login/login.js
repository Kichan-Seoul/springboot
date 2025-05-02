import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/login.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/users/login`, {
        userId: userId,
        passwordHash: password
      });

      const user = res.data;
      if (user) {
        localStorage.setItem('userId', user.userId);
        setIsLoggedIn(true);
        alert(`${user.name}님 반갑습니다!`);
        navigate('/main');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      if (error.response && error.response.status === 401) {
        alert(error.response.data);
      } else {
        alert('로그인 실패! 서버 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="login-wrapper">
    <div className="login-card">
      <div className="left-section">
        <img src="/img/character.png" alt="칼로몽 로고" className="logo-image" />
        <div className="logo-footer">로그인 후 이용가능</div>
      </div>
  
      <div className="right-section">
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>아이디</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
          <button type="button" className="signup-button" onClick={() => navigate('/signup')}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  </div>
  

  );
};

export default Login;
