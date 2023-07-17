/** 
작성자 : 양현우
작성일 : 2023-04-25
수정자 : 양현우
수정일 : 2023-05-26
**/
$(function(){
	var authority = $.jf_getcurauthority();

	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<a id="btn0" href="#">조회</a>&nbsp;');
	}
	if(authority.SAV_AH=="Y"){
		$('#btn_panel0').append('<a id="btn1" href="#">추가</a>');
		$('#btn_panel0').append('<a id="btn2" href="#">삭제</a>');
		$('#btn_panel0').append('<a id="btn3" href="#">취소</a>');
		$('#btn_panel0').append('<a id="btn4" href="#">저장</a>');
		$('#btn_panel0').append('<a id="btn5" href="#">닫기</a>');
	}
	if(authority.EXL_AH=="Y"){
		$('#btn_panel0').append('<a id="btn6" href="#">엑셀 다운로드</a>&nbsp;');
	}
	if(authority.SAV_AH=="Y"&&authority.IEX_AH=="Y"){
		$('#btn_panel0').append('<a id="btn7" href="#">엑셀 업로드</a>&nbsp;');
	}
	
	$('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	$('#btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-add'
	});
	$('#btn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove'
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
		if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
			$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
			$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			if($.jf_changeddg($('#dg0'), null)){
				//$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
				$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
			} 
			if($.jf_changeddg($('#dg1'), null)){
				//$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
				$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까????', 'subsave');
			} 
			else {
				$.jf_retrieve($('#dg0'));
			}
		}		
		
		
		/*if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg0'));
		}*/
	});
	$('#btn1').bind('click', function(){
		if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
			if($.jf_changeddg($('#dg1'), null)) $.tracomalmsg('정보', '저장 후 추가 가능합니다.');
			else {
			$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));	
			}
		}		
	});
	$('#btn2').bind('click', function(){
		$.jf_checkforeigntable($.jf_curdgrow($('#dg0')),"AL0202", function(){
			if($.jf_datalength($('#dg1'))>0) {
				$.tracomalmsg('정보', '하위 데이터 삭제 후 가능합니다.'); 
				return false;
			}
			else {
				if($.jf_changeddg($('#dg1'), null)) $.tracomalmsg('정보', '저장 후 삭제 가능합니다.'); 
				else {
					//DEL_YN 업데이트 기능 사용하기 위함
					let v_curdgData = $.jf_curdgrow($('#dg0'));
					v_curdgData['DEL_YN'] = 'Y';
					$('#dg0').datagrid('updateRow',{index:$.jf_curdgindex($('#dg0')),row:v_curdgData});
					$.jf_delete($('#dg0'));
				} 
			}
		});
	});
	$('#btn3').bind('click', function(){
		if($.jf_changeddg($('#dg0'), null)) {
			$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}
		else if($.jf_changeddg($('#dg1'), null)) {
			$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'subsave');
		}
		else{
			$.jf_resetdg($('#dg0'), 'all');
		}
	});
	$('#btn4').bind('click', function(){
		if($.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g')&& $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))
		{
			$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));
			$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			if($.jf_changeddg($('#dg0'))) $.jf_savedgdata($('#dg0'), '/al/AL0202G0S0', 'post', null)
			if($.jf_changeddg($('#dg1'))) $.jf_savedgdata($('#dg1'), '/al/AL0202G1S0', 'post', null)
			//else $.tracomalmsg('정보', '저장할 데이터가 없습니다.'); 
		}
	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
  
	$('#btn6').bind('click', function(){
		$.jf_exceldownload($('#dg0'), '/al/AL0202G0_exlDownload?param='+ $('#sch_sb0').searchbox('getValue'));
	});

	$('#btn7').bind('click', function(){
			$.tracomcfmsg('확인', '엑셀 업로드시 차량관리 데이터가 재 갱신됩니다. 엑셀 업로드를 하시겠습니까?', 'excelupload');
	});

	$("#excelinputfile").on("change", function(e){
		var form = $("#excelfrm")[0];
		var formData = new FormData(form); 
		$("#excelupload_p0").window('close');
		$.jf_excelupload($('#dg1'), formData, '/al/AL0202G1_exlUpload');
	}); 
});