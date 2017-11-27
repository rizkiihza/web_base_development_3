<%--
  Created by IntelliJ IDEA.
  User: iqbal
  Date: 27/11/17
  Time: 19:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    String message = (String) request.getAttribute("message");
%>
    <div>
        <h3><%=message%></h3>
        <a href="login.jsp">Login</a>
    </div>
</body>
</html>
