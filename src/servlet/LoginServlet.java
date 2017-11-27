package servlet;

import database.MySQLConnect_Account;
import identityservice.RandomString;
import identityservice.User;
import validator.Validator;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

import java.net.URLDecoder;
import java.security.SecureRandom;
import java.sql.*;

@WebServlet(name = "LoginServlet", urlPatterns = "loginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String username = request.getParameter("username");
        String password = request.getParameter("userpass");
        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");

//        out.println(username);

        if (validateLogin(username, password, ipAddress, userAgent)) {

            String token = generateToken(username, ipAddress, userAgent);

            User user = new User(username, password, token);

            updateTokenToDatabase(user);

            HttpSession session = request.getSession(true);
            session.setAttribute("UNUserAktif", user.getUsername());
            session.setAttribute("TokenUserAktif", user.getToken());

            String url = request.getContextPath() + "/index.jsp";
            response.sendRedirect(url);

        } else {
            out.println("Sorry UserName or Password Error!");

            RequestDispatcher rd = request.getRequestDispatcher("/index.jsp");

            rd.include(request, response);
        }


    }

    private void updateTokenToDatabase(User user) {
        Connection conn = null;
        PreparedStatement stmt = null;

        try{
            //Open a connection
            System.out.println("[Register Connecting to database ...");
            MySQLConnect_Account.connect();

            conn = MySQLConnect_Account.getConn();

            //Execute a query
            System.out.println("Creating statement...");
            String sql = "UPDATE user SET token = ? WHERE username = ? AND password = ?";
            stmt = conn.prepareStatement(sql);

            // set the preparedstatement parameters
            stmt.setString(1, user.getToken());
            stmt.setString(2, user.getUsername());
            stmt.setString(3, user.getPassword());

            stmt.executeUpdate();

            //STEP 6: Clean-up environment

            stmt.close();
            conn.close();
        }catch(SQLException se){
            //Handle errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //Handle errors for Class.forName
            e.printStackTrace();
        }finally{
            //finally block used to close resources
            try{
                if(stmt!=null)
                    stmt.close();
            } catch (SQLException se2){
            }// nothing we can do
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }//end finally try
        }//end try
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String encodedToken = request.getParameter("token");
        String token = URLDecoder.decode(encodedToken, "UTF-8");
        System.out.println("LoginServlet: " + token);
        String url = request.getContextPath() + "/error.jsp";

        RequestDispatcher dispatcher = request.getRequestDispatcher(url);

        if (!isTokenValid(token)) {
            url = request.getContextPath() + "/login.jsp";
            response.sendRedirect(url);
        } //else {
//            String status = Validator.validate(token, request);
//            System.out.println("LoginServlet: " + status);
//            String message = "";
//            switch (status){
//                case "expired":
//                    message = "Token expired. Please login again";
//                    request.setAttribute("message", message);
//                    dispatcher.forward(request, response);
//                    break;
//                case "ipError":
//                    message = "IP address changed. Please login again";
//                    request.setAttribute("message", message);
//                    dispatcher.forward(request, response);
//                    break;
//                case "agentError":
//                    message = "User agent changed. Please login again";
//                    request.setAttribute("message", message);
//                    dispatcher.forward(request, response);
//                    break;
//                case "unauthorized":
//                    message = "Invalid token. Please login again";
//                    request.setAttribute("message", message);
//                    dispatcher.forward(request, response);
//                    break;
//                default:
//                    break;
//            }
//        }
    }

    private boolean isTokenValid(String token) {
        Connection connection = null;

        boolean found = false;

        if (token == null) {
            return false;
        } else {
            try {
                MySQLConnect_Account.connect();
                connection = MySQLConnect_Account.getConn();
                String query = "SELECT * FROM user WHERE token=\""+ token +"\"";
                Statement stmt = connection.createStatement();

                ResultSet rs = stmt.executeQuery(query);

                while (rs.next() && !found) {
                    if (rs.getString("token").equals(token)) {
                        found = true;
                        System.out.println("Token valid");
                    }
                }

                rs.close();
                stmt.close();
                connection.close();
            } catch (SQLException e) {
                System.out.println("Error: " + e.getMessage());
            }

        }

        return found;
    }

    private String generateToken(String username, String ipAddress, String userAgent) {
        return Validator.generateToken(username, ipAddress, userAgent);
//        String alphanumeric = RandomString.digits + "ACEFGHJKLMNPQRUVWXYabcdefhijkprstuvwx";
//
//        RandomString token = new RandomString(20, new SecureRandom(), alphanumeric);
//
//        return token.getRandomString() + ipAddress + userAgent;
    }

    private boolean validateLogin (String username, String password, String ipAddress, String userAgent) {
        Connection conn = null;
        PreparedStatement stmt = null;

        boolean status = false;

        try{
            //Open a connection
            System.out.println("Connecting to database...");
            MySQLConnect_Account.connect();

            conn = MySQLConnect_Account.getConn();

            //Execute a query
            System.out.println("Creating statement...");
            String sql = "SELECT * FROM user WHERE username=? AND password=?";
            stmt = conn.prepareStatement(sql);

            //Bind values into the parameters.
            stmt.setString(1, username);  // This would set age
            stmt.setString(2, password); // This would set ID


            ResultSet rs = stmt.executeQuery();

            //User ditemukan
            //Dilakukan generate token baru
            //Dilakukan update token
            if (rs.next()) {
                status = true;

                String token = generateToken(username, ipAddress, userAgent);
            }


            //STEP 6: Clean-up environment
            rs.close();
            stmt.close();
            conn.close();
        }catch(SQLException se){
            //Handle errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
            //Handle errors for Class.forName
            e.printStackTrace();
        }finally{
            //finally block used to close resources
            try{
                if(stmt!=null)
                    stmt.close();
            }catch(SQLException se2){
            }// nothing we can do
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }//end finally try
        }//end try


        return status;


    }

}
