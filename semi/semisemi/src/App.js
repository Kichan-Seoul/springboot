import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


import Navbar from './components/Navbar/Navbar';  
import Main from './page/Main/main';  
import Calories from './page/Calories/calories';  
import Challenge from './page/Challenge/challenge';  
import Exercise from './page/Exercise/exercise';  
import Community from './page/Community/pages/Community';  
import Calendar from './page/Calendar/calendar';  
import MyInfo from './page/MyInfo/myinfo';  
import Login from './page/Login/login';  
import SignUp from './page/SignUp/SignUp';  
import Write from './page/Community/pages/Write';  
import Detail from './page/Community/pages/Detail';  
import MyPost from "./page/Community/pages/MyPost";
import Edit from './page/Community/pages/Edit';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');

    if (storedLogin === 'true' && storedUserId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
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
        <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
        <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={handleLogin} />} />
        <Route path="/calendar" element={isLoggedIn ? <Calendar userId={localStorage.getItem('userId')} /> : <Navigate to="/" replace />} />
        <Route path="/calories" element={isLoggedIn ? <Calories userId={localStorage.getItem('userId')} /> : <Navigate to="/" replace />} />
        <Route path="/challenge" element={isLoggedIn ? <Challenge /> : <Navigate to="/" replace />} />
        <Route path="/exercise" element={isLoggedIn ? <Exercise /> : <Navigate to="/" replace />} />
        <Route path="/community" element={isLoggedIn ? <Community /> : <Navigate to="/" replace />} />
        <Route path="/detail/:id" element={isLoggedIn ? <Detail /> : <Navigate to="/" replace />} />
        <Route path="/myinfo" element={isLoggedIn ? <MyInfo handleLogout={handleLogout} /> : <Navigate to="/" replace />} />
        <Route path="/write" element={isLoggedIn ? <Write /> : <Navigate to="/" replace />} />
        <Route path="/mypost" element={isLoggedIn ? <MyPost /> : <Navigate to="/" replace />} />
        <Route path="/edit/:id" element={isLoggedIn ? <Edit /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
