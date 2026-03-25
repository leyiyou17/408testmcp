import React from 'react';

const SubjectSelection = ({ onSubjectSelect }) => {
  const subjects = [
    { id: 1, name: '数据结构' },
    { id: 2, name: '计算机组成原理' },
    { id: 3, name: '操作系统' },
    { id: 4, name: '计算机网络' }
  ];

  return (
    <div>
      <h1>选择科目</h1>
      <div className="grid">
        {subjects.map(subject => (
          <div 
            key={subject.id}
            className="card"
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onClick={() => onSubjectSelect(subject)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
          >
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>{subject.name}</h2>
            <p>点击进入刷题</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelection;