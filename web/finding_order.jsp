<%@ page import="ws.OjekWSImpl" %>
<%--
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
    OjekWSImpl.validateAccess((String)session.getAttribute("TokenUserAktif"));

    // Stub //
//    session.setAttribute("UNUserAktif", "hilmi");
//    session.setAttribute("IDUserAktif", 1);
%>
<div id="frame">
    <span id="idUserAktif" hidden><%=session.getAttribute("IDUserAktif")%></span>

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
        <h2>LOOKING FOR AN ORDER</h2>
    </div>

    <div id="finding-block">
        <div id="finding-status">

        </div>

        <div>
            <button type="button" id="find-button" class="btn-inactive" name="find" onclick="sendFindRequest()">FIND ORDER</button>
        </div>
    </div>

    <div id="chat-block">
        <iframe src="http://localhost:8000/index2.html?sender_id=<%=session.getAttribute("IDUserAktif")%>&receiver_id=<%=session.getAttribute("idDriver")%>" height="250" width="100%"></iframe>
    </div>

</div>

<script type="text/javascript" src="js/finding_order.js"></script>
</body>
</html>
