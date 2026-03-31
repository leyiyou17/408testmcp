<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>408考研刷题系统 - 错题本</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        nav {
            background-color: #333;
            color: white;
            padding: 15px 0;
            margin-bottom: 30px;
        }
        nav ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: space-around;
        }
        nav li {
            display: inline;
        }
        nav a {
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
        }
        nav a:hover, nav a.active {
            background-color: #555;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .filter {
            margin-bottom: 30px;
        }
        .filter label {
            margin-right: 10px;
        }
        .filter select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-right: 20px;
        }
        .flex {
            display: flex;
            gap: 30px;
        }
        .flex-1 {
            flex: 1;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
        }
        .mb-20 {
            margin-bottom: 20px;
        }
        .border {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 4px;
        }
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            min-height: 150px;
            resize: vertical;
        }
        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
        }
        button:hover {
            background-color: #45a049;
        }
        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        .success {
            background-color: #e8f5e9;
            color: #2e7d32;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .error {
            background-color: #ffebee;
            color: #c62828;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
        }
        .welcome {
            text-align: right;
            margin-right: 20px;
        }
        .logout {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        .logout:hover {
            background-color: #d32f2f;
        }
    </style>
</head>
<body>
    <nav>
        <ul>
            <li><a href="dashboard.jsp">选择科目</a></li>
            <li><a href="error-book.jsp" class="active">错题本</a></li>
            <li><a href="score-statistics.jsp">成绩统计</a></li>
            <li style="margin-left: auto;">
                <span class="welcome">欢迎，<%= session.getAttribute("username") %></span>
                <a href="exam/logout" class="logout">退出登录</a>
            </li>
        </ul>
    </nav>
    
    <div class="container">
        <div class="card">
            <h1>错题本</h1>
            
            <div class="filter mb-20">
                <label>科目筛选:</label>
                <select id="subject">
                    <option value="">所有科目</option>
                    <option value="数据结构">数据结构</option>
                    <option value="计算机组成原理">计算机组成原理</option>
                    <option value="操作系统">操作系统</option>
                    <option value="计算机网络">计算机网络</option>
                </select>
                
                <label style="margin-left: 20px;">题型筛选:</label>
                <select id="questionType">
                    <option value="">所有题型</option>
                    <option value="选择题">选择题</option>
                    <option value="综合题">综合题</option>
                </select>
            </div>

            <div class="flex">
                <div class="flex-1">
                    <h2>错题列表</h2>
                    <ul id="errorList">
                        <li>
                            <div><strong>题目:</strong> 以下关于栈的描述，正确的是？</div>
                            <div style="font-size: 14px; color: #666;">
                                科目: 数据结构 | 题型: 选择题 | 日期: 2024-01-15
                            </div>
                            <div style="font-size: 14px; color: #f44336;">
                                你的答案: A
                            </div>
                            <div class="mt-20" style="display: flex; gap: 10px;">
                                <button onclick="showQuestion(1)">重做</button>
                                <button onclick="markAsMastered(1)">标记已掌握</button>
                            </div>
                        </li>
                        <li>
                            <div><strong>题目:</strong> 请简述操作系统中的进程和线程的区别。</div>
                            <div style="font-size: 14px; color: #666;">
                                科目: 操作系统 | 题型: 综合题 | 日期: 2024-01-16
                            </div>
                            <div style="font-size: 14px; color: #f44336;">
                                你的答案: 进程和线程没有区别
                            </div>
                            <div class="mt-20" style="display: flex; gap: 10px;">
                                <button onclick="showQuestion(2)">重做</button>
                                <button onclick="markAsMastered(2)">标记已掌握</button>
                            </div>
                        </li>
                        <li>
                            <div><strong>题目:</strong> 在计算机网络中，OSI模型的七层协议从上到下依次是？</div>
                            <div style="font-size: 14px; color: #666;">
                                科目: 计算机网络 | 题型: 选择题 | 日期: 2024-01-17
                            </div>
                            <div style="font-size: 14px; color: #f44336;">
                                你的答案: B
                            </div>
                            <div class="mt-20" style="display: flex; gap: 10px;">
                                <button onclick="showQuestion(3)">重做</button>
                                <button onclick="markAsMastered(3)">标记已掌握</button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="flex-1">
                    <h2>题目详情</h2>
                    <div id="questionDetail" class="border mb-20">
                        <h3>请选择一个题目</h3>
                    </div>

                    <button id="submitBtn" onclick="submitAnswer()" disabled>提交答案</button>

                    <div id="result" class="border mt-20" style="display: none;"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentQuestion = null;
        
        const errorRecords = [
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
            },
            {
                id: 3,
                question_id: {
                    id: 3,
                    content: '在计算机网络中，OSI模型的七层协议从上到下依次是？',
                    question_type: '选择题',
                    subject: '计算机网络',
                    options: {
                        A: '应用层、表示层、会话层、传输层、网络层、数据链路层、物理层',
                        B: '物理层、数据链路层、网络层、传输层、会话层、表示层、应用层',
                        C: '应用层、会话层、表示层、传输层、网络层、数据链路层、物理层',
                        D: '物理层、数据链路层、网络层、传输层、表示层、会话层、应用层'
                    },
                    correct_answer: 'A',
                    analysis: 'OSI七层模型从上到下依次是：应用层、表示层、会话层、传输层、网络层、数据链路层、物理层。'
                },
                user_answer: 'B',
                created_at: '2024-01-17'
            }
        ];
        
        function showQuestion(id) {
            const record = errorRecords.find(r => r.id === id);
            currentQuestion = record.question_id;
            const detailDiv = document.getElementById('questionDetail');
            const submitBtn = document.getElementById('submitBtn');
            const resultDiv = document.getElementById('result');
            
            resultDiv.style.display = 'none';
            
            if (currentQuestion.question_type === '选择题') {
                detailDiv.innerHTML = `
                    <h3>${currentQuestion.content}</h3>
                    <div class="mt-20">
                        ${Object.entries(currentQuestion.options).map(([key, value]) => `
                            <div style="margin-bottom: 10px;">
                                <input type="radio" name="answer" value="${key}" onchange="enableSubmit()">
                                <label style="margin-left: 10px;">${key}. ${value}</label>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                detailDiv.innerHTML = `
                    <h3>${currentQuestion.content}</h3>
                    <div class="mt-20">
                        <textarea id="textareaAnswer" oninput="enableSubmit()" placeholder="请输入你的答案..."></textarea>
                    </div>
                `;
            }
            
            submitBtn.disabled = true;
        }
        
        function enableSubmit() {
            document.getElementById('submitBtn').disabled = false;
        }
        
        function submitAnswer() {
            let userAnswer;
            if (currentQuestion.question_type === '选择题') {
                const radio = document.querySelector('input[name="answer"]:checked');
                userAnswer = radio ? radio.value : '';
            } else {
                userAnswer = document.getElementById('textareaAnswer').value;
            }
            
            const isCorrect = userAnswer === currentQuestion.correct_answer;
            const resultDiv = document.getElementById('result');
            
            resultDiv.innerHTML = `
                <h3>提交结果</h3>
                <div class="${isCorrect ? 'success' : 'error'}">
                    <strong>结果:</strong> ${isCorrect ? '正确' : '错误'}
                </div>
                <div>
                    <strong>正确答案:</strong> ${currentQuestion.correct_answer}
                </div>
                <div>
                    <strong>解析:</strong> ${currentQuestion.analysis}
                </div>
            `;
            resultDiv.style.display = 'block';
            
            if (isCorrect) {
                // 从错题列表中移除
                setTimeout(() => {
                    const recordId = errorRecords.find(r => r.question_id.id === currentQuestion.id).id;
                    markAsMastered(recordId);
                }, 1000);
            }
        }
        
        function markAsMastered(recordId) {
            const errorList = document.getElementById('errorList');
            const item = errorList.children[recordId - 1];
            if (item) {
                item.style.display = 'none';
            }
        }
    </script>
</body>
</html>