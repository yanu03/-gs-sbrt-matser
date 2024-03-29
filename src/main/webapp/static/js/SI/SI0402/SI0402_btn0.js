﻿/** 
작성자 : 양현우
작성일 : 2023-04-10
수정자 : 양현우
수정일 : 2023-04-10
**/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<a id="btn0" href="#">조회</a>');
	}
	if(authority.SAV_AH=="Y"){
		$('#btn_panel0').append('<a id="btn3" href="#">취소</a>');
		$('#btn_panel0').append('<a id="btn4" href="#">저장</a>');
		$('#btn_panel0').append('<a id="btn5" href="#">닫기</a>');
	}
	if(authority.EXL_AH=="Y"){
		$('#btn_panel0').append('<a id="btn7" href="#">엑셀 다운로드</a>&nbsp;');
	}
	if(authority.SAV_AH=="Y"&&authority.IEX_AH=="Y"){
		$('#btn_panel0').append('<a id="btn8" href="#">엑셀 업로드</a>&nbsp;');
	}

	$('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	$('#btn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-cancel',
	});
	$('#btn4').linkbutton({
	    height: 24,
	    iconCls: 'icon-save'
	});
	$('#btn5').linkbutton({
	    height: 24,
	    iconCls: 'icon-clear'
	});
	$('#btn7').linkbutton({
		height: 24,
		iconCls: 'icon-excel'
	});
	$('#btn8').linkbutton({
			height: 24,
			iconCls: 'icon-excel'
	});
	//btn 기능 binding
	$('#btn0').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg0'));
		}
	});
	$('#btn3').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
		}
	});
	$('#btn4').bind('click', function(){
		if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))
		{
			if($.uf_exlvalidatedata()){
				$.jf_savedgdata($('#dg1'), '/si/SI0402G1S0', 'post', null);
			}else{
				$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
			}
		}
	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
  $('#btn7').bind('click', function(){
				let v_selected = $('#dg0').datagrid('getSelected');
        $.jf_exceldownload($('#dg1'), '/si/SI0402G1_exlDownload?param='+ v_selected.ROUT_ID);
    });
 
    $('#btn8').bind('click', function(){
        $.tracomcfmsg('확인', '엑셀 업로드 후 데이터 형식에 맞지 않는 데이터가 존재 시 수정 후 저장 해주십시오.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 엑셀 업로드를 하시겠습니까?', 'excelupload');
    });
 
    $("#excelinputfile").on("change", function(e){
        var form = $("#excelfrm")[0];
        var formData = new FormData(form); 
        $("#excelupload_p0").window('close');
        $.uf_excelupload($('#dg1'), formData, '/si/SI0402G1_exlUpload');
    }); 
});