<%@ page import="ws.OjekWSImpl" %><%--
  Created by IntelliJ IDEA.
  User: user
  Date: 04/11/2017
  Time: 01.51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="profile_data.jsp"%>
<html>
<head>
    <title>PR-OJEK Order</title>
    <link rel="stylesheet" href="css/order.css" type="text/css">
</head>
<body>

<%
    session.setAttribute("idDriver", request.getParameter("id"));
%>

<div id="frame">
    <header class="clearfix">
        <div id=logo>
            <h2 id="main-logo"><span id="logo1">PR-</span><span id="logo2">OJEK</span></h2>
            <p id="sub-logo">wush... wush... ngeeeeeenggg...</p>
        </div>
        <div id=user-stat>
            <p id=greeting>Hi, <b><%=session.getAttribute("UNUserAktif")%></b> !</p>
            <a href="logout.jsp">Logout</a>
        </div>
    </header>

    <div id="navbar">
        <ul>
            <li><a href="#" class="active">ORDER</a></li>
            <li><a href="history.jsp?id_active=<%=session.getAttribute("IDUserAktif")%>">HISTORY</a></li>
            <li><a href="profile.jsp?id_active=<%=session.getAttribute("IDUserAktif")%>">MY PROFILE</a></li>
        </ul>
    </div>

    <div id="order-title">
        <h2>MAKE AN ORDER</h2>
    </div>


    <div id="order-flow">
        <div id="step1" class="division">
            <div class="circle">1</div>
            <p>Select Destination</p>
        </div>
        <div id="step2" class="division">
            <div class="circle">2</div>
            <p>Select a Driver</p>
        </div>
        <div id="step3" class="division active">
            <div class="circle">3</div>
            <p>Chat Driver</p>
        </div>
        <div id="step4" class="division">
            <div class="circle">4</div>
            <p>Complete your Order</p>
        </div>
    </div>
    <div id="select-destination">
        <iframe src="http://localhost:8000/index2.html?sender_id=<%=session.getAttribute("IDUserAktif")%>&receiver_id=<%=session.getAttribute("idDriver")%>" height="250" width="100%"></iframe>

        <a href = 'complete-order.jsp?id=<%=session.getAttribute("idDriver")%>'>
            <button class="close-button" name="choose">Close</button></a>
    </div>
</div>

<script type="text/javascript" src="js/order.js"></script>
</body>
</html>
