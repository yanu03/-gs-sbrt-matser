/*
프로그램명 : 신호형시정보 이력 btn
작성자 : 박원용
작성일 : 2023.05.15
*/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
	if(authority.SCH_AH=="Y"){
	  $('#btn_panel0').append('<a id="btn0" href="#">조회</a>&nbsp;');
  }
  if(authority.SAV_AH=="Y"){
	  $('#btn_panel0').append('<a id="btn1" href="#">닫기</a>');
  }
	
	
  $('#btn0').linkbutton({
    height: 24,
    iconCls: 'icon-search'
	});
	
	$('#btn1').linkbutton({
    height: 24,
    iconCls: 'icon-clear'
	});
	
	//btn 기능 binding
  $('#btn0').bind('click', function(){
    $.jf_retrieve($('#dg0'));	
  });
  
  $('#btn1').bind('click', function(){
    $.jf_close();
  });
    
});