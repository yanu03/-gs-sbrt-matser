/*
프로그램명 : 사용자 그룸 권한 관리 btn0
작성자 : 박원용
작성일 : 2023.05.01
*/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
    if(authority.SAV_AH=="Y"){
        $('#subbtn_panel0').append('<a id="sub_btn0" href="#">추가</a>&nbsp;');
        $('#subbtn_panel0').append('<a id="sub_btn1" href="#">삭제</a>&nbsp;');
        $('#subbtn_panel0').append('<a id="sub_btn2" href="#">취소</a>&nbsp;');
        $('#subbtn_panel0').append('<a id="sub_btn3" href="#">사용자 저장</a>&nbsp;');
    }
	if(authority.EXL_AH=="Y"){
		$('#subbtn_panel0').append('<a id="sub_btn7" href="#">엑셀 다운로드</a>&nbsp;');
	}
	if(authority.SAV_AH=="Y"&&authority.IEX_AH=="Y"){
		$('#subbtn_panel0').append('<a id="sub_btn8" href="#">엑셀 업로드</a>&nbsp;');
	}

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
    $('#btn7').linkbutton({
        height: 24,
        iconCls: 'icon-excel'
	});
	$('#btn8').linkbutton({
        height: 24,
        iconCls: 'icon-excel'
	});
	//sub_btn 기능 binding
    $('#sub_btn0').bind('click', function(){
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
            if(!$.jf_changeddg($('#dg0'), null)){
                // let v_values = {USER_ID:$('#USER_ID').textbox('getValue'), USER_NM:$('USER_NM').textbox('getValue')};
                let v_values = {USER_ID:null, USER_NM:null, AUTH_CD: null};
                // $.mf_selusermdopen($('#dg1'), null,null,null,'g');
                $.mf_selusermdopen($('#dg1'), $('#ef0'), v_values, null, 'g');
            }else{
                $.tracomalmsg('정보', '저장되지 않는 데이터가 있어 추가할 수 없습니다.', null);
            }
        }
    });
    $('#sub_btn1').bind('click', function(){
        $.jf_delete($('#dg1'));
    });
    $('#sub_btn2').bind('click', function(){
        $.jf_resetdg($('#dg1'));
    });
    $('#sub_btn3').bind('click', function(){
        if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')) $.jf_savedgdata($('#dg1'), '/authority/saveAuthorityMember', 'post', null);
    }); 
    $('#sub_btn7').bind('click', function(){
        $.jf_exceldownload($('#dg0'), '/sm/SM0402G0_exlDownload?param='+ $('#sch_sb0').searchbox('getValue'));
    });
 
    $('#sub_btn8').bind('click', function(){
        $.tracomcfmsg('확인', '엑셀 업로드시 차량관리 데이터가 재 갱신됩니다. 엑셀 업로드를 하시겠습니까?', 'excelupload');
    });
 
    $("#excelinputfile").on("change", function(e){
        var form = $("#excelfrm")[0];
        var formData = new FormData(form); 
        $("#excelupload_p0").window('close');
        $.jf_excelupload($('#dg1'), formData, '/sm/SM0402G0_exlUpload');
    }); 
});