/*
프로그램 명 : 배차별 차량 관리 searchbox
작성자 : 박원용
작성일 : 2023.04.07

수정자 : 박원용
수정일 : 2023.04.25
*/
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0">&nbsp;&nbsp;&nbsp;');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['ALLOC_ID', 'ALLOC_NM'];
		$.jf_findtext($('#dg0'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb0').searchbox({
		width: 180,
		height: 24,
		prompt: '배차ID, 배차명',
		searcher: $.jf_schbox
	});
	
});