/*
프로그램명 : 코드관리 btn1
작성자 : 박원용
작성일 : 2023.04.10
*/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#sub_btn_panel0').append('<a id="sub_btn0" href="#">추가</a>&nbsp;');
	$('#sub_btn_panel0').append('<a id="sub_btn1" href="#">삭제</a>&nbsp;');
	$('#sub_btn_panel0').append('<a id="sub_btn2" href="#">취소</a>&nbsp;');
	$('#sub_btn_panel0').append('<a id="sub_btn3" href="#">저장</a>&nbsp;');
	
	$('#sub_btn0').linkbutton({
        height: 24,
        iconCls: 'icon-add',
        disabled: false
	});
	$('#sub_btn1').linkbutton({
        height: 24,
        iconCls: 'icon-remove',
        plain: false
	});
	$('#sub_btn2').linkbutton({
        height: 24,
        iconCls: 'icon-cancel',
	});
	$('#sub_btn3').linkbutton({
        height: 24,
        iconCls: 'icon-save'
	});
	
	
	//sub_btn 기능 binding
    $('#sub_btn0').bind('click', function(){
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            if($.jf_changeddg($('#dg0'), 'all')) {
                $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
            }else{
                $.jf_append($('#dg1'), $.pf_defaultparams($('#dg1')));
            }
		}
    });
    $('#sub_btn1').bind('click', function(){
        $.jf_delete($('#dg1'));
        //if($.jf_chkchilddata($('#dg1')) && $.jf_chkchilddata($('#dg2'))) $.jf_delete($('#dg1'));
    });
    $('#sub_btn2').bind('click', function(){
        $.jf_resetdg($('#dg1'));
    });
    $('#sub_btn3').bind('click', function(){
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'f')) $.jf_save($('#dg1'));
        //if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) $.jf_savedgdata($('#dg0'), 'http://192.168.34.82:8183/al/AL0102G0S0', 'post', null);
    }); 
});