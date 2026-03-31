<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>408考研刷题系统 - 学生仪表盘</title>
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
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .subject-card {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .subject-card:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .subject-card h2 {
            color: #333;
            margin-bottom: 10px;
        }
        .subject-card p {
            color: #666;
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
            <li><a href="dashboard.jsp" class="active">选择科目</a></li>
            <li><a href="error-book.jsp">错题本</a></li>
            <li><a href="score-statistics.jsp">成绩统计</a></li>
            <li style="margin-left: auto;">
                <span class="welcome">欢迎，<%= session.getAttribute("username") %></span>
                <a href="exam/logout" class="logout">退出登录</a>
            </li>
        </ul>
    </nav>
    
    <div class="container">
        <div class="card">
            <h1>选择科目</h1>
            <div class="grid">
                <div class="subject-card" onclick="window.location.href='question-bank.jsp?subject=数据结构'">
                    <h2>数据结构</h2>
                    <p>点击进入刷题</p>
                </div>
                <div class="subject-card" onclick="window.location.href='question-bank.jsp?subject=计算机组成原理'">
                    <h2>计算机组成原理</h2>
                    <p>点击进入刷题</p>
                </div>
                <div class="subject-card" onclick="window.location.href='question-bank.jsp?subject=操作系统'">
                    <h2>操作系统</h2>
                    <p>点击进入刷题</p>
                </div>
                <div class="subject-card" onclick="window.location.href='question-bank.jsp?subject=计算机网络'">
                    <h2>计算机网络</h2>
                    <p>点击进入刷题</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>