/**
 * 프로그램명 : 휴일관리 검색창
 * 작성자 : 박원용
 * 작성일 : 2023.04.06
 */
$(function(){

	$('#sch_panel0').append('<input id="sch_sb0">');

	//searcher에 정의되는 함수는 사전에 정의 되어 있어야합니다.
	$.jf_schbox = function(a_value, a_name){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg0'));	
		}
	}

	$('#sch_sb0').searchbox({
    width: 150,
    height: 24,
    prompt: '',
    searcher: $.jf_schbox
	});
	
});