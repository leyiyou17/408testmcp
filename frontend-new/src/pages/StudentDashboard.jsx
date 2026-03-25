import React, { useState } from 'react';
import SubjectSelection from './SubjectSelection';
import QuestionBank from './QuestionBank';
import ErrorBook from './ErrorBook';
import ScoreStatistics from './ScoreStatistics';

const StudentDashboard = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('subjects');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage('question-bank');
  };

  return (
    <div>
      {/* 导航栏 */}
      <nav>
        <ul>
          <li>
            <a 
              href="#" 
              className={currentPage === 'subjects' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('subjects');
              }}
            >
              选择科目
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'error-book' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('error-book');
              }}
            >
              错题本
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={currentPage === 'statistics' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('statistics');
              }}
            >
              成绩统计
            </a>
          </li>
          <li style={{ marginLeft: 'auto' }}>
            <span>欢迎，{user.username}</span>
            <button 
              style={{ marginLeft: '10px', backgroundColor: '#f44336' }}
              onClick={onLogout}
            >
              退出登录
            </button>
          </li>
        </ul>
      </nav>

      {/* 内容区域 */}
      <div className="card">
        {currentPage === 'subjects' && <SubjectSelection onSubjectSelect={handleSubjectSelect} />}
        {currentPage === 'question-bank' && selectedSubject && <QuestionBank subject={selectedSubject} />}
        {currentPage === 'error-book' && <ErrorBook />}
        {currentPage === 'statistics' && <ScoreStatistics />}
      </div>
    </div>
  );
};

export default StudentDashboard;