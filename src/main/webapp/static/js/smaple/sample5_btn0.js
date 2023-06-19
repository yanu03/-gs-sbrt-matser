$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
    $('#btn_panel0').append('<a id="btn0" href="#"></a>');
	$('#btn_panel0').append('<a id="btn2" href="#">닫기</a>');
    
	
	
    $('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-reload'
	});
	$('#btn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-clear'
	});
	
	
	//btn 기능 binding

    $('#btn0').bind('click', function(){
		//조회 endedit 태우는 방법을 찾아라!
		//$.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') false; --> confirm 
		//$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
		$.jf_retrieve($('#dg0'), $.pf_combineparams($('#dg0')));	
    });

    $('#btn2').bind('click', function(){
            // if($.jf_changeddg($('#dg0'), 'all')) {
            // 	$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
            // }else{
            // 	$.jf_close();
            // }

            $.jf_close();
    });
  
});