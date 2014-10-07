<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- saved from url=(0056)http://keede.arkodata.com/arko/account/forgetpassword.do -->
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
            <h1>忘 记 密 码</h1>
            <div class="mws-login-lock"><a href="index.jsp"><i class="icon-bended-arrow-left"></i></a></div>
            <div id="mws-login-form">
                <form class="mws-form" action="/doForgetPassword.do" method="post" novalidate="novalidate">
                    <div class="mws-form-row">
                        <div class="mws-form-item">
                            <input type="text" name="loginName" class="large required" required="" title="请输入正确的帐号" placeholder="帐号">
                        </div>
                    </div>
                    <div class="mws-form-row">
                        <div class="mws-form-item">
                        	<input type="text" name="email" class="large required email" required="" title="请输入正确的邮箱" placeholder="通知邮箱">
                        </div>
                    </div>
                    <div class="mws-form-row" style="display: block;">
						<ul style="color:red">
						
						
						</ul>
					</div>
                    <div class="mws-form-row">
                        <input type="submit" value="发送邮件" class="btn btn-primary mws-login-button">
                        <div style=" text-align:center;padding:15px 2px 0 2px;color:#fff;">忘记帐号，请联系你的爱客代表</div>
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

    <!-- JavaScript Plugins -->
    <script src="js/libs/jquery-1.8.3.min.js"></script>
    <script src="js/libs/jquery.placeholder.min.js"></script>
    <script src="js/plugins/fileinput.js"></script>
    
    <!-- jQuery-UI Dependent Scripts -->
    <script src="js/ui/jquery-ui-effects.min.js"></script>

    <!-- Plugin Scripts -->
    <script src="js/jquery.validate-min.js"></script>
	<!--[if lt IE 9]><script src="/arko/js/libs/excanvas.min.js"></script><![endif]-->

    <script src="js/core/asyncLoader.js"></script>
    <script type="text/javascript">
    asyncLoader([
                 "js/core/login.js"
        ],{
        'callback':function(){
            asyncLoadCallback();
        }
    });
    </script>



</body></html>