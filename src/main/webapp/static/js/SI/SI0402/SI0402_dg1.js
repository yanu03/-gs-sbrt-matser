/** 
작성자 : 양현우
작성일 : 2023-04-08
수정자 : 양현우
수정일 : 2023-04-08
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
		url:'/si/SI0402G1R0',	//json 조회 url
		method: 'post',
		queryParams: {},						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
		columns:[[
			{field:'NODE_ID',title:'노드ID',width:150,halign:'center',align:'left'},
			{field:'NODE_NM',title:'노드명',width:200,halign:'center',align:'left',editor:{type:'textbox', options:{required:true,validType:['length[0,20]']}}},
			{field:'WAY_DIV',title:'상하행',width:100,halign:'center',align:'center',hidden:true},
			{field:'NODE_SN',title:'노드순번',width:100,halign:'center',align:'right'},
			{field:'NODE_TYPE_NM',title:'유형',width:150,halign:'center',align:'center', hidden:true},
			{field:'NODE_TYPE',title:'유형',width:130,align:'left',halign:'center',formatter:function(value,row){return row.NODE_TYPE_NM;},
			editor:{type:'combobox',options:{valueField:'DL_CD',textField:'DL_CD_NM',method:'post',
			url:'/common/selectCommonDtlList',queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "NODE_TYPE"}}),required:false,panelHeight:100,panelMinHeight:20,panelMaxHeight:400
			,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
			{field:'GPS_Y',title:'위도',width:100,align:'right',halign:'center',editor:{type:'numberbox',options:{precision:6,min:0,max:1000}}},
			{field:'GPS_X',title:'경도',width:100,align:'right',halign:'center',editor:{type:'numberbox',options:{precision:6,min:0,max:1000}}},
			{field:'REMARK',title:'비고',width:260,halign:'center',align:'left',editor:{type:'textbox', options:{validType:['length[0,200]']}}}
				]],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				if(data.rows.length == 0 ) {
					$.jf_deleteline();
					$.jf_deletemarker();
					$.jf_deleteoverlay();
				}
				else $.jf_drawroute(data.rows);
				// $.jf_deleteline();
				// $.jf_drawline(data.rows);
				// $.jf_deletemarker();
				// for(var i=0; i<data.rows.length; i++) $.jf_addimgmarker(data.rows[i]);
				// $.jf_deleteoverlay();
				// for(var i=0; i<data.rows.length; i++) $.jf_addoverlay(data.rows[i]);
				$.jf_setfocus($('#dg1'), -1);
				$.jf_setfooter($('#dg1'));
			},
			onBeforeLoad: function(param){if(Object.keys(param).length < 1) return false;},
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
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
				$.jf_movemap(row.GPS_X, row.GPS_Y);
				//$.jf_addmarker(row.GPS_X, row.GPS_Y);
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(a_index,a_row,a_changes){
				a_row.NODE_TYPE_NM = $.jf_currowtext($('#dg1'), a_index, 'NODE_TYPE');
			},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){}
	});

});