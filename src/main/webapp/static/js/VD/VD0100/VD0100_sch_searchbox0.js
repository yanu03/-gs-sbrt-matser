/**
 * 프로그램명 : 차내장치 정보 관리 btn
 * 작성자 : 박원용
 * 작성일 : 2023.04.13
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['VHC_ID', 'VHC_NO'];
		$.jf_findtext($('#dg0'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb0').searchbox({
		width: 150,
		height: 24,
		prompt: '차량ID, 차량번호',
		searcher: $.jf_schbox
	});
	
});