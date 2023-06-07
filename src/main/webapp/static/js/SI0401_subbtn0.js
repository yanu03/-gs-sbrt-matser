$(function(){
	
	$('#subbtn_panel0').append('<a id="subbtn1" href="#">추가</a>');
	$('#subbtn_panel0').append('<a id="subbtn2" href="#">삭제</a>');
	$('#subbtn_panel0').append('<a id="subbtn3" href="#">취소</a>');
	
	// $('#subbtn0').linkbutton({
	//     height: 24,
	//     iconCls: 'icon-search'
	// });
	$('#subbtn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-add',
	    disabled: false
	});
	$('#subbtn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove',
	   	plain: false
	});	
	$('#subbtn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-cancel',
	});
	
	//btn 기능 binding
	$('#subbtn0').bind('click', function(){
		//새로고침
		if($.jf_changeddg($('#dg1'), null)) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'subsave1');
		}else{
			$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), $.jf_curdgrow($('#dg0'))));
		}				
	});
	$('#subbtn1').bind('click', function(){
		//추가
		// if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')) $.jf_append($('#dg1'), $.pf_defaultparams($('#dg1')));
		// let v_values = {VHC_ID:null, VHC_NO:$('#VHC_NO').textbox('getValue')};
		let v_values = {COMP_ID:null, COMP_NM:null, ROUT_ID: $('#dg0').datagrid('getSelected').ROUT_ID, REMARK:null};
		$.mf_selcompmdopen($('#dg1'), $('#ef0'), v_values, $('#COMP_NM'), 'g');
	});
	$('#subbtn2').bind('click', function(){
		$.jf_delete($('#dg1'));
	});
	$('#subbtn3').bind('click', function(){
		if($.jf_changeddg($('#dg1'))) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_resetdg($('#dg1'));
		}
	});
	
   
});