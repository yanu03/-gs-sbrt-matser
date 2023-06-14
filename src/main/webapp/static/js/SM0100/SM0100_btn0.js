/*
프로그램명 : 코드관리 btn0
작성자 : 박원용
작성일 : 2023.04.17
*/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	$('#btn_panel1').append('<a id="btn2" href="#">추가</a>&nbsp;');
	$('#btn_panel1').append('<a id="btn3" href="#">삭제</a>&nbsp;');
	$('#btn_panel1').append('<a id="btn4" href="#">취소</a>&nbsp;');
	$('#btn_panel1').append('<a id="btn5" href="#">공통 코드 저장</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
	
    $('#btn1').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	$('#btn2').linkbutton({
        height: 24,
        iconCls: 'icon-add',
        disabled: false
	});
	$('#btn3').linkbutton({
        height: 24,
        iconCls: 'icon-remove',
        plain: false
	});
	$('#btn4').linkbutton({
        height: 24,
        iconCls: 'icon-cancel',
	});
	$('#btn5').linkbutton({
        height: 24,
        iconCls: 'icon-save'
	});
	$('#btn6').linkbutton({
        height: 24,
        iconCls: 'icon-clear'
	});
	
	
	//btn 기능 binding
    $('#btn1').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'search');
		else $.jf_retrieve($('#dg0'));	
    });
    $('#btn2').bind('click', function(){
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g')){
						if(!$.jf_changeddg($('#dg1'), null)){
								$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
                $.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
            }else{
                $.tracomalmsg('정보', '저장되지 않는 데이터가 있어 추가할 수 없습니다.', null);
            }
		}
        else $.tracomalmsg('정보','필수 입력창을 입력후 추가해주세요');
    });
    $('#btn3').bind('click', function(){
        //$.jf_delete($('#dg0'));
        // 삭제를 할때 사용된 코드가 있는지 확인이 꼭 필요함
        // 현재는 삭제할때 확인할 수 있는 url이 없지만 있다면 확인 url을 던져서 return 값이 '0' 이면 삭제할 수 있게
        // url이 없어서  삭제는 막아둔 상태이다
        if($.jf_datalength($('#dg1'))>0) {
            $.tracomalmsg('정보', '하위 데이터 삭제 후 가능합니다.'); 
            return false;
        }
        else {
            if($.jf_changeddg($('#dg1'))) $.tracomalmsg('정보', '저장 후 삭제 가능합니다.'); 
            else $.jf_delete($('#dg0'));
            return true;
        } 
        
    });
    $('#btn4').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'));
		}
    });
    $('#btn5').bind('click', function(){
        // 공통코드는 순서 issue 때문에 따로 만들었습니다
        // 추후 해결이 되면 저장버튼을 합치겠습니다.
        if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg')), 'g')) {
            $.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
            $.jf_savedgdata($('#dg0'), '/common/updateCommonCo', 'post', null);
        }
        else $.tracomalmsg('정보','필수 입력창을 입력후 저장해주세요');
    });
    $('#btn6').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'close');
        else $.jf_close();
    });
    
});