import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDarkMode } from '../../context/DarkModeContext'; 

const Navbar = ({ isLoggedIn, handleLogout, isAuthLoaded }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { isDarkMode, toggleDarkMode } = useDarkMode(); 

  const onLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
    <div className="navbar-content">
   
      <div className="nav-left">
        <li className="logo">
          <Link to="/">🏃‍♀️ CALOMONG</Link>
        </li>
      </div>
  
  
      <div className="nav-center">
        <ul className="nav-list">
          <li><Link to="/calendar">캘린더</Link></li>
          <li><Link to="/calories">칼로리</Link></li>
          <li><Link to="/challenge">챌린지</Link></li>
          <li><Link to="/community">커뮤니티</Link></li>
          <li><Link to="/exercise">운동</Link></li>
          <li><Link to="/myinfo">내 정보</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {isDarkMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
        </button>
        {isAuthLoaded && isLoggedIn ? (
          <>
            {userId && <span className="welcome-text">{userId}님 환영합니다</span>}
            <button onClick={onLogoutClick} className="logout-button">로그아웃</button>
          </>
        ) : (
          <ul className="nav-list auth-links">
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
          </ul>
        )}
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;
