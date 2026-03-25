import React, { useState, useEffect } from 'react';

const QuestionBank = ({ subject }) => {
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // 模拟题目数据
  const mockQuestions = [
    {
      id: 1,
      content: '以下关于栈的描述，正确的是？',
      question_type: '选择题',
      options: {
        A: '栈是一种先进先出的数据结构',
        B: '栈是一种后进先出的数据结构',
        C: '栈的插入操作在栈底进行',
        D: '栈的删除操作在栈顶进行'
      },
      correct_answer: 'B',
      analysis: '栈是一种后进先出(LIFO)的数据结构，插入和删除操作都在栈顶进行。'
    },
    {
      id: 2,
      content: '请简述操作系统中的进程和线程的区别。',
      question_type: '综合题',
      correct_answer: '进程是资源分配的基本单位，线程是CPU调度的基本单位。一个进程可以包含多个线程，线程共享进程的资源。',
      analysis: '进程和线程的主要区别在于：1. 资源分配：进程拥有独立的地址空间，线程共享进程的地址空间；2. 调度：线程是CPU调度的基本单位；3. 并发性：线程的并发性更高；4. 开销：线程的创建和切换开销小于进程。'
    }
  ];

  useEffect(() => {
    // 模拟加载题目
    setTimeout(() => {
      setQuestions(mockQuestions);
      setLoading(false);
    }, 500);
  }, []);

  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
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
  };

  if (loading) {
    return <div>加载题目中...</div>;
  }

  return (
    <div>
      <h1>{subject.name} - 题库</h1>
      
      {/* 题型筛选 */}
      <div className="mb-20">
        <label>题型筛选:</label>
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
        {/* 题目列表 */}
        <div className="flex-1">
          <h2>题目列表</h2>
          <ul style={{ listStyle: 'none' }}>
            {questions
              .filter(q => !questionType || q.question_type === questionType)
              .map(question => (
                <li 
                  key={question.id}
                  className="border mb-20"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleQuestionClick(question)}
                >
                  <div><strong>题目 {question.id}:</strong> {question.content.substring(0, 100)}...</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    题型: {question.question_type}
                  </div>
                </li>
              ))
            }
          </ul>
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

export default QuestionBank;