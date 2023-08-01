/** 
작성자 : 양현우
작성일 : 2023-05-11
수정자 : 양현우
수정일 : 2023-05-1!
**/
$(function(){
	var authority = $.jf_getcurauthority();
	//권한에 따라서 btn0-4까지 만들어 준다
	if(authority.SCH_AH=="Y"){
		$('#btn_panel0').append('<a id="btn1" href="#">조회</a>&nbsp;');
	}
	if(authority.SAV_AH=="Y"){
		$('#btn_panel0').append('<a id="btn5" href="#">닫기</a>');
	}
	$('#btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	$('#btn5').linkbutton({
	    height: 24,
	    iconCls: 'icon-clear'
	});
	
	//btn 기능 binding
	$('#btn1').bind('click', function(){
		if($('#sch_lb0').combobox('getValue') == ''){
			let v_routIds = [];
			for(var i=0; i<$('#sch_lb0').combobox('getData').length; i++) {
				v_routIds.push($('#sch_lb0').combobox('getData')[i].ROUT_ID);
			}
			let v_param = JSON.stringify({dma_search : {ROUT_IDS : v_routIds}});
			let v_sttnParam = JSON.stringify({dma_search : {ROUT_IDS : v_routIds, NODE_TYPE : 'NT002'}});
			$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_param, 'bg0');
			$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_sttnParam, 'bg1');
		}
		
		else {
			let v_param = JSON.stringify({dma_search : {ROUT_ID :  $('#sch_lb0').combobox('getValue')}});
			let v_sttnParam = JSON.stringify({dma_search : {ROUT_ID :  $('#sch_lb0').combobox('getValue'), NODE_TYPE : 'NT002'}});
			$.jf_bgajax('/rout/selectNodeListByRout', 'POST', v_param, 'bg0');
			$.jf_bgajax('/rout/selectNodeListByRout', 'POST', v_sttnParam, 'bg1');
		}		
		$.jf_retrieve($('#dg0'));
	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
  
});