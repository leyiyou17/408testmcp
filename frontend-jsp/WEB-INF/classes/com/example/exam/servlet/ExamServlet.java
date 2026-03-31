package com.example.exam.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

public class ExamServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getPathInfo();
        
        if (path == null) {
            response.sendRedirect("/login.jsp");
            return;
        }
        
        switch (path) {
            case "/login":
                handleLogin(request, response);
                break;
            case "/register":
                handleRegister(request, response);
                break;
            case "/logout":
                handleLogout(request, response);
                break;
            default:
                response.sendRedirect("/login.jsp");
        }
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getPathInfo();
        
        if (path != null && path.equals("/logout")) {
            handleLogout(request, response);
        } else {
            response.sendRedirect("/login.jsp");
        }
    }
    
    private void handleLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // 模拟登录验证
        if (username != null && !username.isEmpty()) {
            HttpSession session = request.getSession();
            session.setAttribute("username", username);
            response.sendRedirect("/dashboard.jsp");
        } else {
            request.setAttribute("error", "请输入用户名");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
    
    private void handleRegister(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        
        if (username == null || username.isEmpty()) {
            request.setAttribute("error", "请输入用户名");
            request.getRequestDispatcher("/register.jsp").forward(request, response);
            return;
        }
        
        if (password == null || password.isEmpty()) {
            request.setAttribute("error", "请输入密码");
            request.getRequestDispatcher("/register.jsp").forward(request, response);
            return;
        }
        
        if (!password.equals(confirmPassword)) {
            request.setAttribute("error", "两次输入的密码不一致");
            request.getRequestDispatcher("/register.jsp").forward(request, response);
            return;
        }
        
        // 模拟注册成功
        request.setAttribute("success", "注册成功，请登录");
        request.getRequestDispatcher("/register.jsp").forward(request, response);
    }
    
    private void handleLogout(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        session.invalidate();
        response.sendRedirect("/login.jsp");
    }
}