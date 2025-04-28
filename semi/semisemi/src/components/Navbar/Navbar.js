import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout, isAuthLoaded }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');


  const onLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-center">
          <ul className="nav-list">
            <li className="logo">
              <Link to="/">🏃‍♀️ HOME</Link>
            </li>
            <li><Link to="/calendar">캘린더</Link></li>
            <li><Link to="/calories">칼로리</Link></li>
            <li><Link to="/challenge">챌린지</Link></li>
            <li><Link to="/community">커뮤니티</Link></li>
            <li><Link to="/exercise">운동</Link></li>
            <li><Link to="/myinfo">내 정보</Link></li>
          </ul>
        </div>

     
        <div className="nav-right">
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
