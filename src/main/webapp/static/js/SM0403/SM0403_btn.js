/*
프로그램명 : 로그인 이력 조회 btn
작성자 : 박원용
작성일 : 2023.04.10

수정자 : 박원용
수정일 : 2023.04.12
*/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
    // $('#btn_panel0').append('<a id="btn0" href="#"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	$('#sch_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
	
	// $('#btn0').linkbutton({
    //     height: 24,
    //     iconCls: 'icon-reload'
	// });
    $('#btn1').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	$('#btn6').linkbutton({
        height: 24,
        iconCls: 'icon-clear'
	});
	
	
	//btn 기능 binding
    // $('#btn0').bind('click', function(){;
    //     $.uf_resetvalue();
	// 	$.jf_retrieve($('#dg0'));	
    // });
    $('#btn1').bind('click', function(){
        $.jf_retrieve($('#dg0'));	
    });
    $('#btn6').bind('click', function(){
        $.jf_close();   
    });
    
});