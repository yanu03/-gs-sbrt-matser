/**
 * 프로그램명 : 코드 관리 searchbox
 * 작성자 : 박원용
 * 작성일 : 2023.04.10
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0">&nbsp;&nbsp;&nbsp;');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['CO_CD', 'CO_CD_NM'];
		$.jf_findtext($('#dg0'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb0').searchbox({
		width: 180,
		height: 24,
		prompt: '공통코드, 공통코드명',
		searcher: $.jf_schbox
	});
	
});