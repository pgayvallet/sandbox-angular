<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="stripes" uri="http://stripes.sourceforge.net/stripes.tld" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
    <head>
        <title>Angular Sandbox</title>

        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/wro/libs.css"/>
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/wro/app.css"/>

        <script type="text/javascript" src="${pageContext.request.contextPath}/wro/libs.js?minimize=false"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/wro/app.js?minimize=false"></script>

    </head>
    <c:set var="contextPath" value="${pageContext.request.contextPath}" scope="request"/>

    <body ng-app="myApp" id="ng-app">

        Hello angular
        <div ng-view ng-cloak></div>

    </body>
</html>