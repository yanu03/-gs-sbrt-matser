/*
프로그램명 : 차량관리 btn
작성자 : 박원용
작성일 : 2023.04.12
*/
$(function(){

	var authority = $.jf_getcurauthority();
	
	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	}
	
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
	$('#btn7').linkbutton({
        height: 24,
        iconCls: 'icon-excel'
	});
	$('#btn8').linkbutton({
        height: 24,
        iconCls: 'icon-excel'
	});
	
	//btn 기능 binding
    
    $('#btn1').bind('click', function(){
		//조회 endedit 태우는 방법을 찾아라!
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'search');
		}else{
			$.jf_retrieve($('#dg0'));
		}
    });
    $('#btn2').bind('click', function(){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
		}else{
            $.tracomalmsg('정보','필수 입력창을 입력후 추가해주세요');
        }
    });
    $('#btn3').bind('click', function(){
	
        $.jf_checkforeigntable($.jf_curdgrow($('#dg0')),"SI0200", function(a_type){
						if(a_type != "Y") $.jf_delete($('#dg0'));
				});
    });
    $('#btn4').bind('click', function(){
        if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg0'), 'all');
			$('#dg0').datagrid('load');
		}
    });
    $('#btn5').bind('click', function(){
        if($.jf_validatedata($('#dg0'), $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
						if($.uf_exlvalidatedata()){
							$.jf_savedgdata($('#dg0'), '/si/SI0200G0S0', 'post', null);
						}else{
							$.tracomalmsg('정보', '데이터가 정상적이지 않아 저장할 수 없습니다.', null);  
						}
        }else{
            $.tracomalmsg('정보','필수 입력창을 입력후 저장해주세요');
        }
    });
    $('#btn6').bind('click', function(){
        if($.jf_changeddg($('#dg0'), null)) {
            $.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'close');
        }else{
            $.jf_close();
        }
    });
    
	$('#btn7').bind('click', function(){
		$.jf_exceldownload($('#dg0'), '/si/SI0200G0_exlDownload?param='+ $('#sch_sb0').searchbox('getValue'));
	});

	$('#btn8').bind('click', function(){
		$.tracomcfmsg('확인', '엑셀 업로드 후 데이터 형식에 맞지 않는 데이터가 존재 시 수정 후 저장 해주십시오.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 엑셀 업로드를 하시겠습니까? ', 'excelupload');
	});

	$("#excelinputfile").on("change", function(e){
		var form = $("#excelfrm")[0];
		var formData = new FormData(form); 
		$("#excelupload_p0").window('close');
		$.uf_excelupload($('#dg0'), formData, '/si/SI0200G0_exlUpload');
	}); 

});