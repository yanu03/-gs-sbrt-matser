/** 
작성자 : 양현우
작성일 : 2023-04-05
수정자 : 양현우
수정일 : 2023-04-05
**/
$(function(){
	
	//권한에 따라서 btn0-4까지 만들어 준다
	$('#btn_panel0').append('<a id="btn0" href="#">조회</a>');
	$('#btn_panel0').append('<a id="btn1" href="#">추가</a>');
	$('#btn_panel0').append('<a id="btn2" href="#">삭제</a>');
	$('#btn_panel0').append('<a id="btn3" href="#">취소</a>');
	$('#btn_panel0').append('<a id="btn4" href="#">저장</a>');
	$('#btn_panel0').append('<a id="btn5" href="#">닫기</a>');
	
	$('#btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	$('#btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-add',
	    disabled: false
	});
	$('#btn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove',
	   	plain: false
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
	
	//btn 기능 binding
	$('#btn0').bind('click', function(){
		//조회
		// if($.jf_changeddg($('#dg0'), 'all')) {
		// 	$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		// }else{
		// 	$.jf_retrieve($('#dg0'), $.pf_combineparams($('#dg0')));	
		// }		

		let param =  {"dlt_BMS_TRANSCOMP_MST" :  [{   
			"COMP_ID": "testid",
			"AREA": "33010",
			"COMP_NM": "테스트데이터입니다",
			"GPS_X": 126.974376,
			"GPS_Y": 37.397025,
			"TM_X": 333824.0303,
			"TM_Y": 222954.4859,
			"DRV_CNT": 30,
			"SVC_ROUT_CNT": 22,
			"LIC_VHC_CNT": 12,
			"SPR_VHC_CNT": 3,
			"ADDR": "경기 안양시 동안구 시민대로 401",
			"REP_NM": "Test",
			"rowStatus" : "C"
			}]
	 }

	 param = JSON.stringify(param);
	$.ajax({
		type: 'post', 
		url:  '/si/SI0102G0S0',  
		data: param,
		dataType: 'json',  
		contentType: 'application/json; charset=utf-8',
		async: null,
		success: function(data) {
			debugger;
		},
		error: function(e) {
			debugger;
		}
	});
	  

		//$.jf_reloadpgm();
	});
	$('#btn1').bind('click', function(){
		if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')){
			$.jf_append($('#dg0'), $.pf_defaultparams($('#dg0')));
		}		
	});
	$('#btn2').bind('click', function(){
		//$.jf_delete($('#dg0'));
		$.jf_rtnchkedrows($('dg0'));
	});
	$('#btn3').bind('click', function(){
		$.jf_resetdg($('#dg0'), 'all');
	});
	$('#btn4').bind('click', function(){


		$.jf_savedgdata($('#dg0'), '/si/SI0101G0S0', 'post');
		// if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f'))
		// {
		// 	//저장해야함
		// }


	});
	$('#btn5').bind('click', function(){
		if($.jf_changeddg($('#dg0'), 'all')) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'save');
		}else{
			$.jf_close();
		}
	});
  
});