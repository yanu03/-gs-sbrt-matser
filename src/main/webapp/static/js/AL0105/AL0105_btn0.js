/*
프로그램 명 : 배차별 운전자 관리 btn
작성자 : 박원용
작성일 : 2023.05.01
*/
$(function(){
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn0" href="#">조회</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn1" href="#">취소</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn2" href="#">저장</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn3" href="#">닫기</a>');
	
    $('#btn0').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	$('#btn1').linkbutton({
        height: 24,
        iconCls: 'icon-cancel',
	});
	$('#btn2').linkbutton({
        height: 24,
        iconCls: 'icon-save'
	});
	$('#btn3').linkbutton({
        height: 24,
        iconCls: 'icon-clear'
	});
	
	
	//btn 기능 binding
    $('#btn0').bind('click', function(){
		//조회 endedit 태우는 방법을 찾아라!
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'search');
		}else{
			$.jf_retrieve($('#dg0'));	
        }
    });
    $('#btn1').bind('click', function(){
        if($.jf_changeddg($('#dg2'), null)) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg1'));
            $.jf_resetdg($('#dg2'));
		}
    });
    $('#btn2').bind('click', function(){
        $.jf_savedgdata($('#dg2'), '/al/AL0105G2S0', 'post', null);
    });
    $('#btn3').bind('click', function(){
        if($.jf_changeddg($('#dg2'), null)) {
            $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'close');
        }else{
            $.jf_close();
        }
    });
    
});