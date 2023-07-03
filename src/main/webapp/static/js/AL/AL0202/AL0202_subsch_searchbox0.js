$(function(){

	$('#subsch_panel0').append('<input id="subsch_sb0"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['ROUT_NM', 'NODE_NM'];
		$.jf_findtext($('#dg1'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#subsch_sb0').searchbox({
		width: 200,
		height: 24,
		prompt: '노선명 혹은 노드명',
		searcher: $.jf_schbox
	});
	
});