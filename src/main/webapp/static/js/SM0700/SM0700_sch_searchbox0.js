/**
 * 프로그램명 : 뉴스/기상 관리 searchbox
 * 작성자 : 박원용
 * 작성일 : 2023.04.24
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0">&nbsp;&nbsp;&nbsp;');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['INTG_ID', 'INTG_NM'];
		$.jf_findtext($('#dg0'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb0').searchbox({
		width: 150,
		height: 24,
		prompt: '연계ID, 연계명',
		searcher: $.jf_schbox
	});
	
});