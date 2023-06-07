$(function(){

	$('#sch_panel0').append('<input id="sch_sb0"></input>');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
		//alert(a_value +'|'+ a_name);
		//하부 그리드를 검색하면 되네요.
	}

	$('#sch_sb0').searchbox({
    width: 110,
    height: 24,
    prompt: '검색',
    searcher: $.jf_schbox
	});
	
});