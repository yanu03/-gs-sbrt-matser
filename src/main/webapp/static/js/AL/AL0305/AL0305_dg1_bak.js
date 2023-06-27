/** 
작성자 : 양현우
작성일 : 2023-04-06
수정자 : 양현우
수정일 : 2023-06-27
**/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
    var f_date = $.tracomfromdate('m');
    var l_date = $.tracomtodate('d');
	$('#dg1').datagrid({
    url:'/al/AL0305G0R0',	//json 조회 url
    method: 'POST',
    queryParams: {},						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
	columns:[[
		{field:'OPER_DT',title:'운행일',width:100,halign:'center',align:'center',rowspan:2},
		{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',rowspan:2},
		{field:'WAY_DIV',title:'상하행',width:100,halign:'center',align:'center',rowspan:2,hidden:true},
		{field:'WAY_DIV_NM',title:'상하행',width:100,halign:'center',align:'center',rowspan:2},
		{field:'',title:'오전',width:225,halign:'center',align:'center', colspan:8},
		{field:'',title:'오후',width:225,halign:'center',align:'center',colspan:5},
	],
	[
		{field:'ALLOC_ID',title:'배차ID',width:150,halign:'center',align:'center', hidden:true},
		{field:'ROUT_GRP',title:'노선그룹',width:150,halign:'center',align:'center', hidden:true},
		{field:'VHC_NO',title:'차량번호',width:150,halign:'center',align:'center', hidden:true},
		{field:'VHC_ID',title:'차량번호',width:130,align:'center',halign:'center',formatter:function(value,row){return row.VHC_NO;},
		editor:{type:'combobox',options:{valueField:'VHC_ID',textField:'VHC_NO',method:'post',
		url:'/vhc/selectVhcList',queryParams: JSON.stringify({"dma_search" : {"content" : ""}}),required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
		,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
		{field:'COMP_NM',title:'운수사',width:200,halign:'center',align:'left'},
		{field:'DRV_NM',title:'운전자명',width:150,halign:'center',align:'center', hidden:true},
		{field:'DRV_ID',title:'운전자명',width:130,align:'center',halign:'center',formatter:function(value,row){return row.DRV_NM;},
		editor:{type:'combobox',options:{valueField:'DRV_ID',textField:'DRV_NM',method:'post',
		url:'/drv/selectAllocDrvList',queryParams: JSON.stringify({"dma_search" : {"TYPE" : "ALL", "CONTENT" : ""}}),required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
		,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
		{field:'SEC_VHC_NO',title:'차량번호',width:150,halign:'center',align:'center', hidden:true},
		{field:'SEC_VHC_ID',title:'차량번호',width:130,align:'center',halign:'center',formatter:function(value,row){return row.SEC_VHC_NO;},
		editor:{type:'combobox',options:{valueField:'VHC_ID',textField:'VHC_NO',method:'post',
		url:'/vhc/selectVhcList',queryParams: JSON.stringify({"dma_search" : {"content" : ""}}),required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
		,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
		{field:'SEC_COMP_NM',title:'운수사',width:200,halign:'center',align:'left'},
		{field:'SEC_DRV_NM',title:'운전자명',width:100,halign:'center',align:'center',hidden:true},
		{field:'SEC_DRV_ID',title:'운전자명',width:130,align:'center',halign:'center',formatter:function(value,row){return row.SEC_DRV_NM;},
		editor:{type:'combobox',options:{valueField:'DRV_ID',textField:'DRV_NM',method:'post',
		url:'/drv/selectAllocDrvList',queryParams: JSON.stringify({"dma_search" : {"content" : ""}}),required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
		,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
		{field:'SEC_TRAN_TM',title:'교대시각',width:100,halign:'center',align:'center',editor:{type:'textbox'}},
	]
],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg0'), -1);
			$.jf_setfooter($('#dg0'));
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
			return $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g');
		},
		onSelect: function(index,row){
			$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));	//grid edit일때 사용
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(a_index,a_row,a_changes){
			a_row.VHC_NO = $.jf_currowtext($('#dg1'), a_index, 'VHC_ID');
			a_row.SEC_VHC_NO = $.jf_currowtext($('#dg1'), a_index, 'SEC_VHC_ID');
			a_row.DRV_NM = $.jf_currowtext($('#dg1'), a_index, 'DRV_ID');
			a_row.SEC_DRV_NM = $.jf_currowtext($('#dg1'), a_index, 'SEC_DRV_ID');
		},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});