$(function(){

	$('#subsch_panel0').append('<input id="subsch_sb0"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['ALLOC_NO'];
		$.jf_findtext($('#dg1'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#subsch_sb0').searchbox({
		width: 150,
		height: 24,
		prompt: '배차번호',
		searcher: $.jf_schbox
	});
	
});