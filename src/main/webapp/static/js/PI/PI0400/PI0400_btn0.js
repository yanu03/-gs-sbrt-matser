/*
프로그램명 : 기상관리 btn
작성자 : 박원용
작성일 : 2023.04.26
*/
$(function(){
	
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
      //조회 endedit 태우는 방법을 찾아라!
      uv_dg0Load = false;
      uv_dg1Load = false;
      $.jf_retrieve($('#dg0'));	
      $.jf_retrieve($('#dg1'));	
    });
    
    $('#btn1').bind('click', function(){
      $.jf_close();
    });
    
});