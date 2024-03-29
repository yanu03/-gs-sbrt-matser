<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>SAMPLE</title>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
	<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
	<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
	<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/material/easyui.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/demo/demo.css">
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.min.js"></script>
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.easyui.min.js"></script>

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

	$.ajax({
		type : "GET",
		data : params,
		url : "/user/checkAccessType",
		dataType : "json",
		success : function(response) {
			if(response.rsMsg.statusCode=='S'){
				goLogin();
			}
			else{
				alert(response.rsMsg.message);
			}
				
		},
		error : function(response, textStatus, jqXHR) {
			
		}
	});
	
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
	<img src='/static/img/login_sample.gif' alt='로그인 샘플' style="width: 60%; position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"/>
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