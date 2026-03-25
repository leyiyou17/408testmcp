import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username && password) {
      // 模拟登录成功
      onLogin({ id: '1', username, role: 'student' });
    } else {
      setError('请输入用户名和密码');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <div className="card" style={{ width: '400px' }}>
        <h1 className="text-center">408考研刷题系统</h1>
        <h2 className="text-center mb-20">学生登录</h2>
        
        {error && (
          <div className="error">{error}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-20">
            <label>用户名:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名"
            />
          </div>
          
          <div className="mb-20">
            <label>密码:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </div>
          
          <button type="submit" style={{ width: '100%' }}>
            登录
          </button>
        </form>
        
        <div className="mt-20 text-center">
          <p>没有账号？ <a href="#" onClick={(e) => {
            e.preventDefault();
            onSwitchToRegister();
          }}>点击注册</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;