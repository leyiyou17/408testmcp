<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>408考研刷题系统 - 成绩统计</title>
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
        h2 {
            color: #555;
            margin-top: 40px;
            margin-bottom: 20px;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #ddd;
        }
        .stat-card h3 {
            color: #666;
            margin-bottom: 10px;
        }
        .stat-card p {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .stat-card .success {
            color: #4CAF50;
        }
        .stat-card .error {
            color: #f44336;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .chart {
            height: 300px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 20px;
            margin-top: 20px;
        }
        .bar-container {
            display: flex;
            justify-content: space-between;
            height: 100%;
            align-items: end;
        }
        .bar {
            width: 60px;
            background-color: #4CAF50;
            margin: 0 10px;
            border-radius: 4px 4px 0 0;
            position: relative;
        }
        .bar-label {
            position: absolute;
            bottom: -30px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
        }
        .bar-value {
            position: absolute;
            top: -25px;
            left: 0;
            right: 0;
            text-align: center;
            font-weight: bold;
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
            <li><a href="error-book.jsp">错题本</a></li>
            <li><a href="score-statistics.jsp" class="active">成绩统计</a></li>
            <li style="margin-left: auto;">
                <span class="welcome">欢迎，<%= session.getAttribute("username") %></span>
                <a href="exam/logout" class="logout">退出登录</a>
            </li>
        </ul>
    </nav>
    
    <div class="container">
        <div class="card">
            <h1>成绩统计</h1>
            
            {/* 总体统计 */}
            <div class="grid">
                <div class="stat-card">
                    <h3>总答题数</h3>
                    <p>120</p>
                </div>
                <div class="stat-card">
                    <h3>正确答题数</h3>
                    <p class="success">85</p>
                </div>
                <div class="stat-card">
                    <h3>错误答题数</h3>
                    <p class="error">35</p>
                </div>
                <div class="stat-card">
                    <h3>正确率</h3>
                    <p>70.8%</p>
                </div>
            </div>

            {/* 科目统计 */}
            <h2>科目统计</h2>
            <table>
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
                    <tr>
                        <td>数据结构</td>
                        <td>30</td>
                        <td class="success">25</td>
                        <td class="error">5</td>
                        <td>83.3%</td>
                    </tr>
                    <tr>
                        <td>计算机组成原理</td>
                        <td>30</td>
                        <td class="success">20</td>
                        <td class="error">10</td>
                        <td>66.7%</td>
                    </tr>
                    <tr>
                        <td>操作系统</td>
                        <td>30</td>
                        <td class="success">20</td>
                        <td class="error">10</td>
                        <td>66.7%</td>
                    </tr>
                    <tr>
                        <td>计算机网络</td>
                        <td>30</td>
                        <td class="success">20</td>
                        <td class="error">10</td>
                        <td>66.7%</td>
                    </tr>
                </tbody>
            </table>

            {/* 最近成绩趋势 */}
            <h2>最近成绩趋势</h2>
            <div class="chart">
                <div class="bar-container">
                    <div class="bar" style="height: 75px;">
                        <div class="bar-value">75</div>
                        <div class="bar-label">2024-01-15</div>
                    </div>
                    <div class="bar" style="height: 80px;">
                        <div class="bar-value">80</div>
                        <div class="bar-label">2024-01-16</div>
                    </div>
                    <div class="bar" style="height: 78px;">
                        <div class="bar-value">78</div>
                        <div class="bar-label">2024-01-17</div>
                    </div>
                    <div class="bar" style="height: 82px;">
                        <div class="bar-value">82</div>
                        <div class="bar-label">2024-01-18</div>
                    </div>
                    <div class="bar" style="height: 85px;">
                        <div class="bar-value">85</div>
                        <div class="bar-label">2024-01-19</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>