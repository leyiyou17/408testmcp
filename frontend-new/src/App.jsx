import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [currentAuthPage, setCurrentAuthPage] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    // 在实际应用中，这里应该处理注册逻辑
    setCurrentAuthPage('login');
  };

  const handleSwitchToLogin = () => {
    setCurrentAuthPage('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentAuthPage('register');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="container">
      {!user ? (
        currentAuthPage === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={handleSwitchToLogin} />
        )
      ) : (
        <StudentDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;