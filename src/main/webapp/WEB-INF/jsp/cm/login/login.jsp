<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
    <link rel="stylesheet" type="text/css" href="/static/easyui/themes/default/easyui.css">
 <link rel="stylesheet" type="text/css" href="/static/easyui/themes/icon.css">  
    <%-- <script type="text/javascript" src="<c:url value='/static/js/jquery/3.2.1/jquery.min.js'/>"></script> --%>
     <script type="text/javascript" src="/static/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="<c:url value='/static/js/common.js'/>"></script>
    <script type="text/javascript" src="/static/easyui/jquery.easyui.min.js"></script>

    <title><t:getAsString name="title" ignore="true" /></title>
</head>
    
<%
	String msg = (String)session.getAttribute("errMsg");
	if(msg != null){	
	    out.println("<script>alert('" + msg + "');</script>");
	    session.removeAttribute("errMsg");
	} 		
%>

<script type="text/javascript">

$( document ).ready(function() {
	$(document).keydown(function(event) {
		if (event.keyCode == '13') { 
			memberLogin();
		}
		
	});
});

function memberLogin(){
	var params = {userID : $('#j_username').val()};
	com.ajaxLogin("GET", "<c:url value='/user/checkAccessType'/>", params, "json", false,
		function(response){
	        goLogin();// $("form#loginForm").submit();
	    }
	);
}

function goLogin() {
 	//$.blockUI();
	var pw = $('#j_password').val();
	
	var form = "<form action='/loginProcess' method='post'>"; 
			form += "<input type='hidden' name='username' value='"+$('#j_username').val()+"' />"; 
			form += "<input type='hidden' name='password' value='"+pw+"' />"; 
			form += "</form>"; 
			jQuery(form).appendTo("body").submit().remove();
}
</script>

<body style="margin: 0 auto;">
<div style="width: 100vw; height: 100vh; position: relative;">
	<img src='<c:url value='/static/images/login_sample.gif' />' alt='로그인 샘플' style="width: 60%; position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"/>
	<div class="easyui-panel" style="width:400px;padding:50px 60px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
	    <div style="margin-bottom:20px">
	        <input class="easyui-textbox" prompt="Username" id="j_username" value="<c:out value='${j_username}' />" placeholder="아이디" iconWidth="28" style="width:100%;height:34px;padding:10px;">
	    </div>
	    <div style="margin-bottom:20px">
	        <input class="easyui-passwordbox" prompt="Password" id="j_password" placeholder="비밀번호" iconWidth="28" style="width:100%;height:34px;padding:10px">
	    </div>
	    <div style="text-align:center;padding:5px 0">
	        <a href="javascript:void(0)" class="easyui-linkbutton" onclick="memberLogin()" style="width:80px">로그인</a>
	    </div>
	</div>
</div>
</body>
</html>