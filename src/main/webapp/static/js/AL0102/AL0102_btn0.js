/*
프로그램명 : 휴일관리 버튼

작성자 : 박원용
작성일 : 2023.04.06

수정자 : 박원용
수정일 : 2023.04.17

2차 수정자 : 박원용
2차 수정일 : 2023.05.08
*/
$(function(){
	
	//권한에 따라서 btn2-4까지 만들어 준다
    $('#btn_panel0').append('<a id="btn0" href="#">휴일 불러오기</a>&nbsp;');
    $('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn2" href="#">추가</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn3" href="#">삭제</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn4" href="#">취소</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn5" href="#">저장</a>&nbsp;');
	$('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
	
    $('#btn0').linkbutton({
        height: 24,
        iconCls: ''
	});
    $('#btn1').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	$('#btn2').linkbutton({
        height: 24,
        iconCls: 'icon-add'
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


    $('#btn0').bind('click', function(){
        $.tracomcfmsg('확인', '설정하신 연도에 맞추어 휴일데이터를 가져옵니다.<p> 현재있는 날짜와 불러오는 날짜가 같으면 불러온 휴일은 제외됩니다.<p>불러 오시겠습니까?', 'loadHoli');
    });
    $('#btn1').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg0'));
		}
    });
    $('#btn2').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
		}
        else $.tracomalmsg('정보','필수 입력창을 입력후 추가해주세요');
    });
    $('#btn3').bind('click', function(){
        // if($.jf_curdgrow($('#dg0')) == null) $.tracomalmsg('정보','삭제할 데이터가 존재하지 않습니다.');
        // else 

        //$.jf_protectform(null,$('#ef0'),true, $.jf_fnddgstrct($('#dg0')));
        $.jf_delete($('#dg0')); 
        
    });
    $('#btn4').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
		}
    });
    $('#btn5').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
            $.jf_savedgdata($('#dg0'), '/al/AL0102G0S0', 'post', null);
        }
        else $.tracomalmsg('정보','필수 입력창을 입력후 저장해주세요');
    });
    $('#btn6').bind('click', function(){
        if($.jf_changeddg($('#dg0'), null)) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'close');
        else $.jf_close();
    });
    
});