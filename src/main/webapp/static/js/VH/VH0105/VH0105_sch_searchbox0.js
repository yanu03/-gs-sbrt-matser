/**
 * 프로그램명 :버스 운행 경로 이력 searchbox
 * 작성자 : 박원용
 * 작성일 : 2023.05.11
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0">&nbsp;&nbsp;&nbsp;');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['REP_ROUT_NM', 'VHC_NO', ''];
		$.jf_findtext($('#dg0'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb0').searchbox({
		width: 250,
		height: 24,
		prompt: '노선그룹명, 차량번호, 운행상태',
		searcher: $.jf_schbox
	});
	
});