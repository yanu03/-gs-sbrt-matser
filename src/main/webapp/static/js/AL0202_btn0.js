/** 
작성자 : 양현우
작성일 : 2023-04-25
수정자 : 양현우
수정일 : 2023-05-26
**/
$(function(){
	
	$('#btn_panel0').append('<a id="btn0" href="#">조회</a>');
	$('#btn_panel0').append('<a id="btn1" href="#">추가</a>');
	$('#btn_panel0').append('<a id="btn2" href="#">삭제</a>');
	$('#btn_panel0').append('<a id="btn3" href="#">취소</a>');
	$('#btn_panel0').append('<a id="btn4" href="#">저장</a>');
	$('#btn_panel0').append('<a id="btn5" href="#">닫기</a>');
	
	$('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	$('#btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-add'
	});
	$('#btn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove'
	});
	$('#btn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-cancel',
	});
	$('#btn4').linkbutton({
	    height: 24,
	    iconCls: 'icon-save'
	});
	$('#btn5').linkbutton({
	    height: 24,
	    iconCls: 'icon-clear'
	});
	
	//btn 기능 binding
	$('#btn0').bind('click', function(){
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg0'));
		}
	});
	$('#btn1').bind('click', function(){
		if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
		}		
	});
	$('#btn2').bind('click', function(){
		//미완료, 삭제시 데이터검증 필요함.
		$.jf_delete($('#dg0'));
	});
	$('#btn3').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
		}
	});
	$('#btn4').bind('click', function(){
		if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')&& $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))
		{
			$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			if($.jf_changeddg($('#dg0'))) $.jf_savedgdata($('#dg0'), '/al/AL0202G0S0', 'post', null)
			if($.jf_changeddg($('#dg1'))) $.jf_savedgdata($('#dg1'), '/al/AL0202G1S0', 'post', null)
		}
	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
  
});