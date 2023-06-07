/*
프로그램명 : 차량관리 btn
작성자 : 박원용
작성일 : 2023.04.12
*/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn2" href="#">추가</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn3" href="#">삭제</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn4" href="#">취소</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn5" href="#">저장</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');

    $('#btn1').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	$('#btn2').linkbutton({
        height: 24,
        iconCls: 'icon-add',
        disabled: false
	});
	$('#btn3').linkbutton({
        height: 24,
        iconCls: 'icon-remove',
        plain: false
	});
	$('#btn4').linkbutton({
        height: 24,
        iconCls: 'icon-cancel',
	});
	$('#btn5').linkbutton({
        height: 24,
        iconCls: 'icon-save'
	});
	$('#btn6').linkbutton({
        height: 24,
        iconCls: 'icon-clear'
	});
	
	
	//btn 기능 binding
    
    $('#btn1').bind('click', function(){
		//조회 endedit 태우는 방법을 찾아라!
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'search');
		}else{
			$.jf_retrieve($('#dg0'));
		}
    });
    $('#btn2').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
		}else{
            $.tracomalmsg('정보','필수 입력창을 입력후 추가해주세요');
        }
    });
    $('#btn3').bind('click', function(){
        $.jf_delete($('#dg0'));
        // 하위 데이터가 존재하는지 db에서 확인 해야함
    });
    $('#btn4').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
		}
    });
    $('#btn5').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
            $.jf_savedgdata($('#dg0'), '/si/SI0200G0S0', 'post', null);
        }else{
            $.tracomalmsg('정보','필수 입력창을 입력후 저장해주세요');
        }
    });
    $('#btn6').bind('click', function(){
        if($.jf_changeddg($('#dg0'), null)) {
            $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'close');
        }else{
            $.jf_close();
        }
    });
    
});