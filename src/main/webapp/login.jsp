<%@page isELIgnored="false"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- saved from url=(0047)http://keede.arkodata.com/arko/account/login.do -->
<html lang="en"><!--<![endif]--><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Viewport Metatag -->
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<!-- Required Stylesheets -->
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css" href="css/stylesheet.css" media="screen">
<link rel="stylesheet" type="text/css" href="css/style.css" media="screen">

<link rel="stylesheet" type="text/css" href="css/login.css" media="screen">
<link rel="stylesheet" type="text/css" href="css/mws-style.css" media="screen">
<link rel="stylesheet" type="text/css" href="css/mws-theme.css" media="screen">

<title>ARKO支付宝服务窗开发平台</title>

<script type="text/javascript" async="" src="js/login.js"></script></head>

<body>

<div id="mws-header" class="clearfix">
    <!-- Logo Container -->
    <div id="mws-logo-container">
        <!-- Logo Wrapper, images put within this wrapper will always be vertically centered -->
        <div id="mws-logo-wrap">
            <img src="images/mws-logo.png" alt="ARKO支付宝服务窗开发平台">
            <!--ARKO Logo -->
		</div>
    </div>
</div>  
    
    <div id="mws-login-wrapper">
        <div id="mws-login">
            <h1>ARKO支付宝服务窗开发平台</h1>
            <div class="mws-login-lock"><i class="icon-lock"></i></div>
            <div id="mws-login-form">
                <form class="mws-form" action="j_spring_security_check" method="post" novalidate="novalidate">
                    <div class="mws-form-row">
                        <div class="mws-form-item">
                            <input type="text" name="j_username" class="mws-login-username required" required="" title="请输入正确的帐号" placeholder="帐号">
                        </div>
                    </div>
                    <div class="mws-form-row">
                        <div class="mws-form-item">
                            <input type="password" name="j_password" class="mws-login-password required" required="" title="请输入正确的密码" placeholder="密码">
                        </div>
                    </div>
	                <div class="mws-form-row">
						<ul style="color:red">
							${sessionScope.SPRING_SECURITY_LAST_EXCEPTION.message}
						</ul>
					</div>
                    <div class="mws-form-row">
                        <input type="submit" value="登录系统" class="btn btn-primary mws-login-button">
                    </div>
					
					<div id="mws-login-remember" class="mws-form-row mws-inset">
                        <ul class="mws-form-list inline" style="text-align:center;">
                            <li>
                                <label for="remember"><a href="forgetpassword.jsp" class="forget-link"> ? 忘记密码</a></label>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
		
    </div>
	
	<div class="index-copyright-foot">
    2012-2013 © ARKO支付宝服务窗开发平台 版权所有.
    <!-- <br/>
    <a href="#">爱客主页</a>
    |
    <a href="#">帮助中心</a>
    | 联系方式:400-8218-9188 -->
</div>  


</body></html>