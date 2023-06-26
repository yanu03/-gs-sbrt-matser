/** 
작성자 : 양현우
작성일 : 2023-04-17
수정자 : 양현우
수정일 : 2023-04-17
참고 : 이 js를 포함한 프로그램은 동적으로 데이터그리드를 그립니다. 관련 코드는 html에 있습니다.
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$.extend($.fn.validatebox.defaults.rules, {
		//시간 유효성 체크
	    timeValid: {
	        validator: function(value, param){return $.uf_timeValid(value, param);},
	        message: '잘못된 노드 시간입니다.'
	    },
		//시간 범위 유효성 체크
	    timeRangeValid: {
	        validator: function(value, param){return $.uf_timeRangeValid(value, param);},
	        message: '노드 시간이 겹칩니다.'
	    }
	});	
	
	$('#dg1').datagrid({
		url:'/al/AL0203G1R0',	//json 조회 url
		method: 'POST',
		queryParams: JSON.stringify({dma_search : {ALLOC_ID : ""}}),						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		// rownumbers: true,
		showFooter: true,
		columns:[[
			{field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'center',hidden:true},
			{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'right',
				styler: function(value,row,index){return 'text-align:right;vertical-align:top;';}
			},
			{field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'right',hidden:true},
			{field:'ROUT_NM',title:'노선명',width:200,halign:'center',align:'left'},
			{field:'NODE_ID',title:'노드ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'NODE_TYPE',title:'노드종류',width:100,halign:'center',align:'left',hidden:true},
			{field:'NODE_TYPE_NM',title:'노드종류',width:100,halign:'center',align:'left'},
			{field:'NODE_NM',title:'노드명',width:300,halign:'center',align:'left'},
			{field:'ARRV_TM',title:'도착시간',width:100,halign:'center',align:'center',
			editor:{type:'textbox', options:{required:true, maxlength: 8, validType: {timeValid:['ARRV_TM'], timeRangeValid: ['ARRV_TM']}}}},
			{field:'DPRT_TM',title:'출발시간',width:100,halign:'center',align:'center',
			editor:{type:'textbox', options:{required:true, maxlength: 8, validType: {timeValid:['DPRT_TM'], timeRangeValid: ['DPRT_TM']}}}},
		]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			 },
			 //event 정의
			 onLoadSuccess: function(data){
				$.jf_mergedg($('#dg1'), 'ALLOC_NO');
			 	$.jf_setfocus($('#dg1'), -1);
			 	$.jf_setfooter($('#dg1'));
			 },
			 onBeforeLoad: function(param){
				if(Object.keys(param).length < 1) return false;
			 },
			 onClickRow: function(index,row){},
			 onDblClickRow: function(index,row){
			 	if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
			 		$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			 		$.jf_beginedit($('#dg1'), index);
			 	}
			 },
			 onBeforeSelect: function(index,row){
				let a_rtn = false;
				if($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g')){
					$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
					a_rtn = true;
				}
				return a_rtn;
			 },
			 onSelect: function(index,row){
			 	$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			 },
			 onBeforeEdit: function(index,row){},
			 onBeginEdit: function(index,row){},
			 onEndEdit: function(index,row,changes){

			 },
			 onAfterEdit: function(index,row,changes){},
			 onCancelEdit:function(index,row){}
	});

});