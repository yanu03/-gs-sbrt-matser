/** 
작성자 : 양현우
작성일 : 2023-04-17
수정자 : 양현우
수정일 : 2023-04-17
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1_hidden" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1_hidden').datagrid({
		url:'/AL/AL0202G1R0',	//json 조회 url
		method: 'post',
		queryParams: JSON.stringify({dma_search : {ALLOC_ID : ""}}),						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
		width:1000,
		height:0,
		columns:[[
			{field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left'},
			{field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ALLOC_NM',title:'배차명',width:100,halign:'center',align:'left',hidden:true},
			{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'right'},
			{field:'OPER_SN',title:'운행순번',width:100,halign:'center',align:'right'},
			{field:'ROUT_ST_TM',title:'노선시작시간',width:100,halign:'center',align:'center'},
			{field:'ROUT_ED_TM',title:'노선종료시간',width:100,halign:'center',align:'center'},
			{field:'REST_TM',title:'휴게시간',width:100,halign:'center',align:'center'},
			{field:'DAY_DIV',title:'요일구분',width:150,halign:'center',align:'left',hidden:true},
			{field:'DAY_DIV_NM',title:'요일구분',width:100,halign:'center',align:'center'},
			{field:'WAY_DIV',title:'상하행구분',width:100,halign:'center',align:'left',hidden:true},
			{field:'WAY_DIV_NM',title:'상하행구분',width:100,halign:'center',align:'center'},
			// {field:'NODE_TYPE_NM',title:'유형',width:130,align:'left',halign:'center',formatter:function(value,row){return row.NODE_TYPE_NM;},
			// editor:{type:'combobox',options:{valueField:'DL_CD',textField:'DL_CD_NM',method:'post',
			// url:'/common/selectCommonDtlList',queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "NODE_TYPE"}}),required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
			// ,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
			{field:'REMARK',title:'비고',width:260,halign:'center',align:'left',editor:{type:'textbox', options:{validType:['length[0,200]']}}}
				]],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				dlt_OPER_ALLOC_PL_ROUT_INFO = data;

				//파라미터 주려 했으나 uf라 내부에서 옵션 설정함
				// $.uf_ajax('/AL/AL0202G1R0_CNT', 'post');
				$.uf_ajax();
				// $.uf_setgridview();
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