/*
프로그램 명 : 배차별 차량 관리 searchbox1
작성자 : 박원용
작성일 : 2023.05.01
*/
$(function(){

	$('#sch_panel1').append('<input id="sch_sb1">&nbsp;&nbsp;&nbsp;');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['DRV_ID', 'DRV_NM'];
		$.jf_findtext($('#dg1'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb1').searchbox({
		width: 180,
		height: 24,
		prompt: '검색: 운전자 ID, 명',
		searcher: $.jf_schbox
	});
	
});