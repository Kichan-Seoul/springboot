import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/login.css";  // Login 스타일 적용

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8080/users/${userId}`);
      const user = res.data;
      if (user) {
        localStorage.setItem('userId', user.userId);
        setIsLoggedIn(true);
        alert(`${user.name}님 반갑습니다!`);
        navigate('/main');
      } else {
        alert("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 아이디를 다시 확인해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-circle">로그인 후<br></br> 이용가능</div>
        <form onSubmit={handleLogin}>
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
          <button type="button" className="signup-button" onClick={() => navigate('/signup')}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
