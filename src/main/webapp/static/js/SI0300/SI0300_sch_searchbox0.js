/*
프로그램명 : 운전자 관리 searchbox
작성자 : 박원용
작성일 : 2023.04.19
*/
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['DRV_ID', 'DRV_NM','COMP_NM'];
		$.jf_findtext($('#dg0'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	};
	$('#sch_sb0').searchbox({
		width: 240,
		height: 24,
		prompt: '운전자 ID, 운전자명, 운수사명',
		searcher: $.jf_schbox
	});
	
});