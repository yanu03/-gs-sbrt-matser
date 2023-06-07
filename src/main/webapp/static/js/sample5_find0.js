$(function(){

	$('#find_panel0').append('<input id="find_fb0"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		let a_fields = ['BUS_NUM'];
		$.jf_findtext($('#dg2'), a_fields, a_value);
		$(this).textbox('textbox').focus();
	};
    
	$('#find_fb0').searchbox({
        width: 200,
        height: 24,
        prompt: '버스번호',
        searcher: $.jf_schbox
	});
	
});