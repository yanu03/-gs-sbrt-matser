/*
프로그램 명 : 배차별 차량 관리 subbtn
작성자 : 박원용
작성일 : 2023.04.08

수정자 : 박원용
수정일 : 2023.04.25
*/
$(function(){
	//권한에 따라서 btn0-4까지 만들어 준다
    $('#btn_panel1').append('<br><br><br><br><br><br><br>');
    $('#btn_panel1').append('<a id="join_btn" href="#"> > </a><br>');
	$('#btn_panel1').append('<a id="out_btn" href="#"> < </a>');
	
	
	$('#join_btn').linkbutton({
        height: 24,
        
	});
    $('#out_btn').linkbutton({
        height: 24,
        
	});
	
	//btn 기능 binding
    $('#join_btn').bind('click', function(){
		  //alert('join');
        $.uf_movevhc("add");
    });
    $('#out_btn').bind('click', function(){
		  //alert('out');
        $.jf_checkforeigntable($.jf_curdgrow($('#dg2')),"AL0104", function(){
                //$.jf_delete($('#dg1'));
                $.uf_movevhc("del");
            }
        );
        
    });
    
});