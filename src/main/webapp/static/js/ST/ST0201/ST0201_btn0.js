/*
프로그램명 : 정류소 구간별 평균속도 통계 btn
작성자 : 박원용
작성일 : 2023.05.31
*/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
    if(authority.SCH_AH=="Y"){
	    $('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
    }
    if(authority.SAV_AH=="Y"){
	    $('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
    }
	
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
        uv_chkdata0 = false;
        let v_selected = $('#dg0').datagrid('getSelected');
        $.pf_childretrieve($('#dg1'),v_selected.ROUT_ID);
        
    });
    $('#btn6').bind('click', function(){
        $.jf_close();   
    });
    
});