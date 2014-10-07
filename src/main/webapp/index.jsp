<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
	
	<head>
		<title>hello</title>
	</head>
	<body>
		hello,<sec:authentication property="name" />! <br />
	</body>

	<a href="hello.do?method=sayHello">Hello</a><br />
	<a href="hello.do?method=sayBye">Bye</a><br />

	<a href="j_spring_security_logout">sign out</a>
	
</html>