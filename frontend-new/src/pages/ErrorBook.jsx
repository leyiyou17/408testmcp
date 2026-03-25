import React, { useState, useEffect } from 'react';

const ErrorBook = () => {
  const [errorRecords, setErrorRecords] = useState([]);
  const [subject, setSubject] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // 模拟错题数据
  const mockErrorRecords = [
    {
      id: 1,
      question_id: {
        id: 1,
        content: '以下关于栈的描述，正确的是？',
        question_type: '选择题',
        subject: '数据结构',
        options: {
          A: '栈是一种先进先出的数据结构',
          B: '栈是一种后进先出的数据结构',
          C: '栈的插入操作在栈底进行',
          D: '栈的删除操作在栈顶进行'
        },
        correct_answer: 'B',
        analysis: '栈是一种后进先出(LIFO)的数据结构，插入和删除操作都在栈顶进行。'
      },
      user_answer: 'A',
      created_at: '2024-01-15'
    },
    {
      id: 2,
      question_id: {
        id: 2,
        content: '请简述操作系统中的进程和线程的区别。',
        question_type: '综合题',
        subject: '操作系统',
        correct_answer: '进程是资源分配的基本单位，线程是CPU调度的基本单位。一个进程可以包含多个线程，线程共享进程的资源。',
        analysis: '进程和线程的主要区别在于：1. 资源分配：进程拥有独立的地址空间，线程共享进程的地址空间；2. 调度：线程是CPU调度的基本单位；3. 并发性：线程的并发性更高；4. 开销：线程的创建和切换开销小于进程。'
      },
      user_answer: '进程和线程没有区别',
      created_at: '2024-01-16'
    }
  ];

  useEffect(() => {
    // 模拟加载错题
    setTimeout(() => {
      setErrorRecords(mockErrorRecords);
      setLoading(false);
    }, 500);
  }, []);

  const handleQuestionClick = (record) => {
    setCurrentQuestion(record.question_id);
    setUserAnswer('');
    setSubmissionResult(null);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !userAnswer) return;

    const isCorrect = userAnswer === currentQuestion.correct_answer;
    setSubmissionResult({
      isCorrect,
      correctAnswer: currentQuestion.correct_answer,
      analysis: currentQuestion.analysis
    });

    if (isCorrect) {
      // 如果答案正确，从错题本中移除
      setErrorRecords(prev => prev.filter(record => record.question_id.id !== currentQuestion.id));
    }
  };

  const handleMarkAsMastered = (recordId) => {
    // 标记为已掌握，从错题本中移除
    setErrorRecords(prev => prev.filter(record => record.id !== recordId));
  };

  if (loading) {
    return <div>加载错题中...</div>;
  }

  return (
    <div>
      <h1>错题本</h1>
      
      {/* 筛选 */}
      <div className="mb-20">
        <label>科目筛选:</label>
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginLeft: '10px', width: '200px' }}
        >
          <option value="">所有科目</option>
          <option value="数据结构">数据结构</option>
          <option value="计算机组成原理">计算机组成原理</option>
          <option value="操作系统">操作系统</option>
          <option value="计算机网络">计算机网络</option>
        </select>
        
        <label style={{ marginLeft: '20px' }}>题型筛选:</label>
        <select 
          value={questionType} 
          onChange={(e) => setQuestionType(e.target.value)}
          style={{ marginLeft: '10px', width: '200px' }}
        >
          <option value="">所有题型</option>
          <option value="选择题">选择题</option>
          <option value="综合题">综合题</option>
        </select>
      </div>

      <div className="flex">
        {/* 错题列表 */}
        <div className="flex-1">
          <h2>错题列表</h2>
          {errorRecords.length === 0 ? (
            <p>暂无错题</p>
          ) : (
            <ul style={{ listStyle: 'none' }}>
              {errorRecords
                .filter(record => (!subject || record.question_id.subject === subject) && (!questionType || record.question_id.question_type === questionType))
                .map(record => (
                  <li 
                    key={record.id}
                    className="border mb-20"
                  >
                    <div><strong>题目:</strong> {record.question_id.content.substring(0, 100)}...</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      科目: {record.question_id.subject} | 题型: {record.question_id.question_type} | 日期: {record.created_at}
                    </div>
                    <div style={{ fontSize: '14px', color: '#f44336' }}>
                      你的答案: {record.user_answer}
                    </div>
                    <div className="mt-20" style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleQuestionClick(record)}>重做</button>
                      <button onClick={() => handleMarkAsMastered(record.id)}>标记已掌握</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          )}
        </div>

        {/* 题目详情 */}
        {currentQuestion && (
          <div className="flex-1">
            <h2>题目详情</h2>
            <div className="border mb-20">
              <h3>{currentQuestion.content}</h3>
              
              {currentQuestion.question_type === '选择题' && (
                <div className="mt-20">
                  {Object.entries(currentQuestion.options).map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '10px' }}>
                      <input 
                        type="radio" 
                        name="answer" 
                        value={key}
                        checked={userAnswer === key}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      <label style={{ marginLeft: '10px' }}>{key}. {value}</label>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.question_type === '综合题' && (
                <div className="mt-20">
                  <textarea 
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    style={{ width: '100%', height: '200px' }}
                    placeholder="请输入你的答案..."
                  />
                </div>
              )}
            </div>

            <button onClick={handleSubmitAnswer} disabled={!userAnswer}>
              提交答案
            </button>

            {/* 提交结果 */}
            {submissionResult && (
              <div className="border mt-20">
                <h3>提交结果</h3>
                <div className={submissionResult.isCorrect ? 'success' : 'error'}>
                  <strong>结果:</strong> {submissionResult.isCorrect ? '正确' : '错误'}
                </div>
                <div>
                  <strong>正确答案:</strong> {submissionResult.correctAnswer}
                </div>
                <div>
                  <strong>解析:</strong> {submissionResult.analysis}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorBook;