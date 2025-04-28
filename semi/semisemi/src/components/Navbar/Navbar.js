import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';  // 스타일링을 위한 CSS 파일

const Navbar = ({ isLoggedIn, handleLogout, isAuthLoaded }) => {
  const navigate = useNavigate();

  // 로그아웃 클릭 시 로그아웃 처리 및 홈으로 이동
  const onLogoutClick = () => {
    handleLogout();
    navigate('/');  // 로그아웃 후 홈으로 이동
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

        {/* 우측 로그인/로그아웃 */}
        <div className="nav-right">
          {isAuthLoaded && isLoggedIn ? (
            <button onClick={onLogoutClick} className="logout-button">로그아웃</button>
          ) : (
            <ul className="nav-list auth-links">
              <li><Link to="/signup">회원가입</Link></li>
              <li><Link to="/login">로그인</Link></li>  {/* 여기에서 Link를 사용하여 로그인 페이지로 이동 */}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
