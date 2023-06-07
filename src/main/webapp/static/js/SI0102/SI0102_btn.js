/*
프로그램명 : 운수사 정보 관리 btn
작성자 : 박원용
작성일 : 2023.04.11

수정자 : 박원용
수정일 : 2023.04.13
*/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
    // $('#btn_panel0').append('<a id="btn0" href="#"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	$('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn2" href="#">추가</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn3" href="#">삭제</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn4" href="#">취소</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn5" href="#">저장</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
	
	// $('#btn0').linkbutton({
    //     height: 24,
    //     iconCls: 'icon-reload'
	// });
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
    // $('#btn0').bind('click', function(){
	// 	if($.jf_changeddg($('#dg0'), 'all')) {
    //         $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
    //     }
    //     else $.jf_retrieve($('#dg0')); //$.jf_retrieve($('#dg0'));	
    // });
    $('#btn1').bind('click', function(){
		//조회 endedit 태우는 방법을 찾아라!
		if($.jf_changeddg($('#dg0'), 'all')) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		else $.jf_retrieve($('#dg0'));	
    });
    $('#btn2').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
		}
        else $.tracomalmsg('정보','필수 입력창을 입력후 추가해주세요');
    });
    $('#btn3').bind('click', function(){
        // 삭제할때 사용된 데이터가 있는지 확인 후 삭제를 해야함
        // 현재는 확인할 URL이 없기때문에 나중에 확인해야함
        $.jf_delete($('#dg0'));
    });
    $('#btn4').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?<br>취소버튼을 누르시면 현제까지 작업하신 데이터가 전채 취소처리 됩니다.', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
		}
    });
    $('#btn5').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f'))$.jf_savedgdata($('#dg0'), 'http://192.168.34.18:8183/si/SI0102G0S0', 'post', null);
        else $.tracomalmsg('정보','필수 입력창을 입력후 저장해주세요');
    });
    $('#btn6').bind('click', function(){
        if($.jf_changeddg($('#dg0'), null)) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
        else $.jf_close();
    });
    
});