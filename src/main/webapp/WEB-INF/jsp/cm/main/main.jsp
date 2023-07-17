<!DOCTYPE html>
<html>
<head>
	<!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
	<meta charset="UTF-8">
	<title>SAMPLE</title>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/material/easyui.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/demo/demo.css">
	<link rel="stylesheet" type="text/css" href="/static/css/main.css">
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.min.js"></script>
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="/static//js/common/main_comm.js"></script>
	
	<script type="text/javascript">
		var jf_logout = function(){
			 $.messager.confirm('알림','로그아웃 하시겠습니까?',function(r){
				if (r){
					$.ajax({
						type : "POST",
						data : JSON.stringify({
							dma_search : {}
						}),
						url : "/user/logout",
						dataType : "json",
						success : function(response) {
							location.href = "<c:url value='/user/login'/>";
						},
						error : function(response, textStatus,jqXHR) {
						}
					});
				}
			});
		}
	
		var jf_addtab = function(a_progcd, a_pgmcode, a_str) {
			
			var authority = $.jf_getcurauthority(a_progcd);
			
			if(authority.SCH_AH!="Y"){
				$.tracomalmsg('정보','조회 권한이 없습니다.');
				return;
			}
			
			if ($('#tab-main').tabs('getTab', 20) != null)
				return false;

			//동일한 title의 tab이 열리지 않도록 한다.
			if ($('#tab-main').tabs('getTab', a_str) != null)
				return false;

			$('#tab-main').tabs('add',{
				id : a_progcd,
				title : a_str,
				content : '<div class="easyui-panel" data-options="fit:true,border:false" style="padding:0 0 0 0;overflow:hidden;"><object data="'
						+ a_pgmcode
						+ '" type="text/html" style="border:0px;width:100%;height:100%;"></object></div>',
				closable : true
			});
		}

		$(document).ready(
			function() {

				var a = function() {
					alert(1);
				}
				
				$.ajax({
					type : "POST",
					data : JSON.stringify({
						dma_search : {}
					}),
					url : "/main/init",
					dataType : "json",
					contentType : 'application/json; charset=utf-8',
					success : function(response) {
						//menuList = response.rows;	            
						$.jf_setmenulist(response.list_menu);
						$.jf_setdefInfo(response.map_defInfo);	
						$.jf_setprogramauthority(response.list_programAuthority);
						$('#main_panel').panel('refresh','/static/layout/main_layout.jsp');
					},
					error : function(response, textStatus,
							jqXHR) {
					}
				});
			});
	</script>
</head>
<body style="margin:0 0 0 0;padding:0 0 0 0;">
<!--최상이 div -->
<div style="positon:left;margin:0 0 0 0;border:0px solid red;width:100vw;height:100vh;">
	<div id="main_panel" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:''">

	</div>
	<div id="win"></div>
	<div id="modal_compay"> <!--</div> style="안보이게">-->
		<!-- 그리드.js -->
	</div>
</div>
<!--
초기로딩 -> 로그인페이지
로그린후 -> 꽉착 div 및 기본 판넬 페이지
기본후 -> 기본 레이아웃(tab) + 메인페이지 로딩
메뉴선택 -> tab 생성 및 메뉴 로딩
-->
</body>
</html>