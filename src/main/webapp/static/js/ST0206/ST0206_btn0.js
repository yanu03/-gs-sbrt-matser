/*
프로그램명 : 정류소 정차시간 통계 btn
작성자 : 박원용
작성일 : 2023.05.25
*/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
	
    $('#btn1').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	$('#btn6').linkbutton({
        height: 24,
        iconCls: 'icon-clear'
	});
	
	
	//btn 기능 binding
    $('#btn1').bind('click', function(){
        uv_chkdata1 = false;
        $.pf_retrieve($('#dg0'));
    });
    $('#btn6').bind('click', function(){
        $.jf_close();   
    });
    
});