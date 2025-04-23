import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 컴포넌트들 import
import Navbar from './components/Navbar/Navbar';  
import Main from './page/Main/main';  
import Calories from './page/Calories/calories';  
import Challenge from './page/Challenge/challenge';  
import Exercise from './page/Exercise/exercise';  
import Community from './page/Community/pages/Community';  // 경로 수정: 대소문자 일치
import Calendar from './page/Calendar/calendar';  
import MyInfo from './page/MyInfo/myinfo';  
import Login from './page/Login/login';  
import SignUp from './page/SignUp/SignUp';  
import Write from './page/Community/pages/Write';  // 글 작성 페이지 추가
import Detail from './page/Community/pages/Detail';  // Detail 페이지 추가

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn');
    if (stored === 'true') {
      setIsLoggedIn(true);
    }
    setIsAuthLoaded(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  };

  if (!isAuthLoaded) return <div>로딩 중...</div>;

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        isAuthLoaded={isAuthLoaded}
      />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/main" replace /> : <Login setIsLoggedIn={handleLogin} />}
        />
        <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={handleLogin} />} />
        <Route path="/calendar" element={isLoggedIn ? <Calendar /> : <Navigate to="/" replace />} />
        <Route path="/calories" element={isLoggedIn ? <Calories /> : <Navigate to="/" replace />} />
        <Route path="/challenge" element={isLoggedIn ? <Challenge /> : <Navigate to="/" replace />} />
        <Route path="/exercise" element={isLoggedIn ? <Exercise /> : <Navigate to="/" replace />} />
        <Route path="/community" element={isLoggedIn ? <Community /> : <Navigate to="/" replace />} />
        <Route path="/post/:id" element={isLoggedIn ? <Detail /> : <Navigate to="/" replace />} /> {/* 게시글 상세 페이지 라우트 추가 */}
        <Route path="/myinfo" element={isLoggedIn ? <MyInfo /> : <Navigate to="/" replace />} />
        <Route path="/write" element={isLoggedIn ? <Write /> : <Navigate to="/" replace />} /> {/* 글 작성 페이지 라우트 */}
      </Routes>
    </Router>
  );
}

export default App;
