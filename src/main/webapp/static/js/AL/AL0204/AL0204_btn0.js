/** 
작성자 : 양현우
작성일 : 2023-04-25
수정자 : 양현우
수정일 : 2023-04-25
**/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<a id="btn0" href="#">조회</a>&nbsp;');
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
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_retrieve($('#dg1'));
		}
	});
	$('#btn3').bind('click', function(){
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg1'), 'all');
		}
	});
	$('#btn4').bind('click', function(){
		 if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))
		 {
			$.jf_savedgdata($('#dg1'), '/al/AL0204G1S0', 'post', null)
			//$.uf_bgudajax();

		 }
	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg1'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
  $('#btn7').bind('click', function(){
		$.jf_exceldownload($('#dg0'), '/al/AL0204G0_exlDownload?param='+ $('#sch_sb0').searchbox('getValue'));
	});

	$('#btn8').bind('click', function(){
			$.tracomcfmsg('확인', '엑셀 업로드시 차량관리 데이터가 재 갱신됩니다. 엑셀 업로드를 하시겠습니까?', 'excelupload');
	});

	$("#excelinputfile").on("change", function(e){
			var form = $("#excelfrm")[0];
			var formData = new FormData(form); 
			$("#excelupload_p0").window('close');
			$.jf_excelupload($('#dg0'), formData, '/al/AL0204G0_exlUpload');
	}); 
});