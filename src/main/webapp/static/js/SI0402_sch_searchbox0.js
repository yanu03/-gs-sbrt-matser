$(function(){
	$('#subbtn_panel0').append('<input id="sch_sb1"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['NODE_ID', 'NODE_NM'];
		$.jf_findtext($('#dg1'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	}

	$('#sch_sb1').searchbox({
		width: 200,
		height: 24,
		prompt: '노드ID, 노드명',
		searcher: $.jf_schbox
	});
	
});