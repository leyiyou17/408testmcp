import React, { useState } from 'react';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    // 模拟注册成功
    setError('');
    setSuccess('注册成功，请登录');
    setTimeout(() => {
      onSwitchToLogin();
    }, 1500);
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
        <h2 className="text-center mb-20">学生注册</h2>
        
        {error && (
          <div className="error">{error}</div>
        )}
        
        {success && (
          <div className="success">{success}</div>
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
          
          <div className="mb-20">
            <label>确认密码:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请再次输入密码"
            />
          </div>
          
          <button type="submit" style={{ width: '100%' }}>
            注册
          </button>
        </form>
        
        <div className="mt-20 text-center">
          <p>已有账号？ <a href="#" onClick={(e) => {
            e.preventDefault();
            onSwitchToLogin();
          }}>点击登录</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;