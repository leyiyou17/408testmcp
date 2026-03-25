import React, { useState, useEffect } from 'react';

const ScoreStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  // 模拟统计数据
  const mockStatistics = {
    totalQuestions: 120,
    correctQuestions: 85,
    accuracy: 70.8,
    subjectStats: [
      { subject: '数据结构', total: 30, correct: 25, accuracy: 83.3 },
      { subject: '计算机组成原理', total: 30, correct: 20, accuracy: 66.7 },
      { subject: '操作系统', total: 30, correct: 20, accuracy: 66.7 },
      { subject: '计算机网络', total: 30, correct: 20, accuracy: 66.7 }
    ],
    recentScores: [
      { date: '2024-01-15', score: 75 },
      { date: '2024-01-16', score: 80 },
      { date: '2024-01-17', score: 78 },
      { date: '2024-01-18', score: 82 },
      { date: '2024-01-19', score: 85 }
    ]
  };

  useEffect(() => {
    // 模拟加载统计数据
    setTimeout(() => {
      setStatistics(mockStatistics);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div>加载统计数据中...</div>;
  }

  return (
    <div>
      <h1>成绩统计</h1>
      
      {/* 总体统计 */}
      <div className="grid mb-20">
        <div className="card text-center">
          <h3>总答题数</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{statistics.totalQuestions}</p>
        </div>
        <div className="card text-center">
          <h3>正确答题数</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>{statistics.correctQuestions}</p>
        </div>
        <div className="card text-center">
          <h3>错误答题数</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>{statistics.totalQuestions - statistics.correctQuestions}</p>
        </div>
        <div className="card text-center">
          <h3>正确率</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{statistics.accuracy}%</p>
        </div>
      </div>

      {/* 科目统计 */}
      <div className="mb-20">
        <h2>科目统计</h2>
        <table className="table">
          <thead>
            <tr>
              <th>科目</th>
              <th>总题数</th>
              <th>正确数</th>
              <th>错误数</th>
              <th>正确率</th>
            </tr>
          </thead>
          <tbody>
            {statistics.subjectStats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.subject}</td>
                <td>{stat.total}</td>
                <td style={{ color: '#4CAF50' }}>{stat.correct}</td>
                <td style={{ color: '#f44336' }}>{stat.total - stat.correct}</td>
                <td>{stat.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 最近成绩趋势 */}
      <div>
        <h2>最近成绩趋势</h2>
        <div className="border" style={{ height: '300px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'end' }}>
            {statistics.recentScores.map((item, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  style={{
                    width: '40px',
                    backgroundColor: '#4CAF50',
                    marginBottom: '10px',
                    height: `${item.score * 2.5}px`
                  }}
                ></div>
                <span style={{ fontSize: '12px' }}>{item.date}</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreStatistics;