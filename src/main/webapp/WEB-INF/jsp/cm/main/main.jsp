<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
	<meta charset="UTF-8">
	<title>SAMPLE</title>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/material/easyui.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="/static/jquery-easyui-1.10.15/demo/demo.css">
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.min.js"></script>
	<script type="text/javascript" src="/static/jquery-easyui-1.10.15/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="/static//js/sample_comm.js"></script>
	
		<script type="text/javascript">
 			var jf_addtab = function(a_menucd, a_pgmcode, a_str){
 				 if($('#tab-main').tabs('getTab', 20)!=null) return false;
 				 
 				 //동일한 title의 tab이 열리지 않도록 한다.
 				 if($('#tab-main').tabs('getTab', a_str)!=null) return false;
 				 
 				//var tabbody = $('<div class="easyui-panel" data-options="fit:true,border:false" style="padding:0 0 0 0;overflow:hidden;"></div>').attr("id", "tab_" + a_menucd).load(a_pgmcode);
 				//var tabbody = $('<div class="easyui-panel"></div>').attr("id", "tab_" + a_menucd).load(a_pgmcode);
 				
 				/* $('#tab-main').tabs('add',{
 					id : "tab_"+a_menucd,
 			        title: a_str,
 			        content: tabbody,
 			        closable: true
 			    }); */ 
 				
 				/* setTimeout(function tick() {
 					$('#tab-main').tabs('add',{
 	 					id : "tab_"+a_menucd,
 	 			        title: a_str,
 	 			        content: tabbody,
 	 			        closable: true
 	 			    });
 				}, 500); */
 				$('#tab-main').tabs('add',{
			        //id : a_pgmcode,
			        title: a_str,
			        content: '<div class="easyui-panel" data-options="fit:true,border:false" style="padding:0 0 0 0;overflow:hidden;"><object data="'+a_pgmcode+'" type="text/html" style="border:0px;width:100%;height:100%;"></object></div>',
			        closable: true
         		}); 
 			}


		$( document ).ready(function() {
			
			var a = function() {
				alert(1);
			}
			$.ajax({
				type : "POST",
				data : JSON.stringify({
					dma_search : {}
				}),
				url : "/main/allMenuInfo",
				dataType : "json",
				contentType : 'application/json; charset=utf-8',
				success : function(response) {
					//debugger;
					//menuList = response.rows;	            
					$.jf_setmenulist(response.rows);
					$('#main_panel').panel('refresh', '/static/layout/main_layout.jsp');
				},
				error : function(response, textStatus, jqXHR) {
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