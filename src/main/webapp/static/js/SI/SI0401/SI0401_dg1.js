/** 
작성자 : 양현우
작성일 : 2023-04-07
수정자 : 양현우
수정일 : 2023-04-07
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
		url:'/si/SI0401G1R0',	//json 조회 url
		method: 'post',
		queryParams: JSON.stringify({dma_param_ROUTEID : {ROUT_ID : ""}}),						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
		columns:[[
			{field:'COMP_NM',title:'운수사명',width:150,halign:'center',align:'left'},
			{field:'REMARK',title:'비고',width:260,halign:'center',align:'left'}
				]],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				$.jf_setfocus($('#dg1'), -1);
				$.jf_setfooter($('#dg1'));
			},
			onBeforeLoad: function(param){
			},
			onClickRow: function(index,row){},
			onDblClickRow: function(index,row){
			},
			onBeforeSelect: function(index,row){
			},
			onSelect: function(index,row){
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(index,row,changes){},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){}
	});

});