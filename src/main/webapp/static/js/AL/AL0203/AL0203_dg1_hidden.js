/** 
작성자 : 양현우
작성일 : 2023-04-17
수정자 : 양현우
수정일 : 2023-04-17
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1_hidden" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1_hidden').datagrid({
		url:'/al/AL0203G1R0',	//json 조회 url
		method: 'post',
		queryParams: JSON.stringify({dma_search : {ALLOC_ID : ""}}),						//json 조회 params
		singleSelect: false,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
		width:1000,
		height:0,
		columns:[[
			{field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left'},
			{field:'DAY_DIV',title:'요일구분',width:100,halign:'center',align:'left'},
			{field:'WAY_DIV',title:'상하행구분',width:100,halign:'center',align:'left'},
			{field:'OPER_SN',title:'운행순번',width:100,halign:'center',align:'right'},
			{field:'NODE_ID',title:'노드아이디',width:100,halign:'center',align:'right'},
			{field:'NODE_NM',title:'노드명',width:100,halign:'center',align:'center'},
			{field:'NODE_SN',title:'노드순번',width:100,halign:'center',align:'center'},
			{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center'},
			{field:'COR_ID',title:'코스아이디',width:150,halign:'center',align:'left'},
			{field:'NODE_TYPE',title:'노드유형',width:100,halign:'center',align:'center'},
			{field:'ARRV_TM',title:'도착시간',width:100,halign:'center',align:'left'},
			{field:'DPRT_TM',title:'출발시간',width:100,halign:'center',align:'center'},
			{field:'UPD_DTM',title:'갱신일시',width:100,halign:'center',align:'center'},
			{field:'UPD_ID',title:'갱신아이디',width:100,halign:'center',align:'center'},
			// {field:'REP_ROUT_NM',title:'대표노선명',width:100,halign:'center',align:'center'},
			{field:'WAY_ASC_NM',title:'상행명',width:100,halign:'center',align:'center'},
			{field:'WAY_DESC_NM',title:'하행명',width:100,halign:'center',align:'center'},
			{field:'ACCRU_LEN',title:'누적길이',width:100,halign:'center',align:'center'},
				]],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				// dlt_OPER_ALLOC_PL_NODE_INFO = data;
				// $.uf_ajax();
				$.jf_setfocus($('#dg1_hidden'), -1);
				$.jf_setfooter($('#dg1_hidden'));
			},
			onBeforeLoad: function(param){
			},
			onClickRow: function(index,row){},
			onDblClickRow: function(index,row){
				if($.jf_validatedata($('#dg1_hidden'), null, $.jf_fnddgstrct($('#dg1_hidden')), 'g')){
					$.jf_endedit($('#dg1_hidden'), $.jf_fnddgstrct($('#dg1_hidden')));
					$.jf_beginedit($('#dg1_hidden'), index);
				}
			},
			onBeforeSelect: function(index,row){
				return $.jf_validatedata($('#dg1_hidden'), null, $.jf_fnddgstrct($('#dg1_hidden')), 'g');
			},
			onSelect: function(index,row){
				$.jf_endedit($('#dg1_hidden'), $.jf_fnddgstrct($('#dg1_hidden')));
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(index,row,changes){

			},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){}
	});

});