<%@page isELIgnored="false"%>  

<html>
	<head>
		<title>login</title>
	</head>
	<body>
		<h3>user login</h3>
		${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}
		<form action="/arko_services/j_spring_security_check" method="post">
			username: <input type="text" name="j_username" /><br />
			password: <input type="password" name="j_password"></br />
			
			<input type="submit" value="login" />
		</form>
	</body>
</html>