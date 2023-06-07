/** 
작성자 : 양현우
작성일 : 2023-04-25
수정자 : 양현우
수정일 : 2023-04-25
**/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn6" href="#">배포</a>');
	$('#btn_panel0').append('<a id="btn0" href="#">조회</a>');
	$('#btn_panel0').append('<a id="btn3" href="#">취소</a>');
	$('#btn_panel0').append('<a id="btn4" href="#">저장</a>');
	$('#btn_panel0').append('<a id="btn5" href="#">닫기</a>');
	
	$('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
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
	$('#btn6').linkbutton({
	    height: 24,
	    iconCls: ''
	});
	
	//btn 기능 binding
	$('#btn0').bind('click', function(){
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg1'));
		}
	});
	$('#btn3').bind('click', function(){
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg1'), 'all');
		}
	});
	$('#btn4').bind('click', function(){
		 if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))
		 {
			// $.jf_savedgdata($('#dg1'), '/al/AL0203G1S0', 'post', null)
			
			// 동적 변환된 그리드를 저장하기 위해 공통 저장을 사용하지 않음
			$.uf_bgudajax();

		 }
	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
	$('#btn6').bind('click', function(){
		$.uf_distri();
	});
  
});