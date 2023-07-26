/*
프로그램명 : 차내장치 정보 관리 btn
작성자 : 박원용
작성일 : 2023.04.19

수정자 : 박원용
수정일 : 2023.05.09
*/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
    // $('#btn_panel0').append('<a id="btn0" href="#"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	// $('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
    if(authority.SAV_AH=="Y"){
        $('#btn_panel0').append('<a id="btn2" href="#">추가</a>&nbsp;');
        $('#btn_panel0').append('<a id="btn3" href="#">삭제</a>&nbsp;');
        $('#btn_panel0').append('<a id="btn4" href="#">취소</a>&nbsp;');
        $('#btn_panel0').append('<a id="btn5" href="#">저장</a>&nbsp;');
        $('#btn_panel0').append('<a id="btn6" href="#">닫기</a>');
    }
	if(authority.EXL_AH=="Y"){
		$('#btn_panel0').append('<a id="btn7" href="#">엑셀 다운로드</a>&nbsp;');
	}
	if(authority.SAV_AH=="Y"&&authority.IEX_AH=="Y"){
		$('#btn_panel0').append('<a id="btn8" href="#">엑셀 업로드</a>&nbsp;');
	}
	// $('#btn0').linkbutton({
    //     height: 24,
    //     iconCls: 'icon-reload'
	// });
    // $('#btn1').linkbutton({
    //     height: 24,
    //     iconCls: 'icon-search'
	// });
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
	$('#btn7').linkbutton({
        height: 24,
        iconCls: 'icon-excel'
	});
	$('#btn8').linkbutton({
        height: 24,
        iconCls: 'icon-excel'
	});
	
	//btn 기능 binding
    // $('#btn0').bind('click', function(){
	// 	if($.jf_changeddg($('#dg1'), 'all')) {
    //         $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
    //     }
    //     else $.jf_retrieve($('#dg1')); //$.jf_retrieve($('#dg1'));	
    // });
    // $('#btn1').bind('click', function(){
	// 	//조회 endedit 태우는 방법을 찾아라!
	// 	if($.jf_changeddg($('#dg1'), 'all')) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
	// 	else $.jf_retrieve($('#dg1'));	
    // });
    $('#btn2').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f')){
			$.jf_append($('#dg1'), $.pf_defaultparams($('#dg1')));
		}
        else $.tracomalmsg('정보','필수 입력창을 입력후 추가해주세요');
    });
    $('#btn3').bind('click', function(){
		$.jf_checkforeigntable($.jf_curdgrow($('#dg0')),"VD0100", function(){
				$.jf_delete($('#dg1'));
			}
		);
    });
    $('#btn4').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
		}
    });
    $('#btn5').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f'))$.jf_savedgdata($('#dg1'), '/vd/VD0100G0S0', 'post', null);
        else $.tracomalmsg('정보','필수 입력창을 입력후 저장해주세요');
    });
    $('#btn6').bind('click', function(){
        if($.jf_changeddg($('#dg1'), null)) $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
        else $.jf_close();
    });
    $('#btn7').bind('click', function(){
        let v_selected = $('#dg0').datagrid('getSelected');
        $.jf_exceldownload($('#dg1'), '/vd/VD0100G0_exlDownload?param='+ v_selected.VHC_ID+'&name='+ v_selected.VHC_NO);
    });
 
    $('#btn8').bind('click', function(){
        $.tracomcfmsg('확인', '엑셀 업로드시 차량관리 데이터가 재 갱신됩니다. 엑셀 업로드를 하시겠습니까?', 'excelupload');
    });
 
    $("#excelinputfile").on("change", function(e){
        var form = $("#excelfrm")[0];
        var formData = new FormData(form); 
        $("#excelupload_p0").window('close');
        $.jf_excelupload($('#dg0'), formData, '/vd/VD0100G0_exlUpload');
    });
});