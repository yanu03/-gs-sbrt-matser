/** 
작성자 : 양현우
작성일 : 2023-04-17
수정자 : 양현우
수정일 : 2023-05-08
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
		// url:'/AL/AL0202G1R0',	//json 조회 url
		url:'/al/AL0201G1R0',	//URL 변경됨
		method: 'post',
		// queryParams: {},						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		// border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		// rownumbers: true,
		showFooter: true,
		columns:[[
			// {field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left'},
			{field:'OLD_ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ROUT_NM',title:'노선명',width:100,halign:'center',align:'left',hidden:true},			
			{field:'ROUT_ID',title:'노선명',width:130,align:'left',halign:'center',formatter:function(value,row){return row.ROUT_NM;},
			editor:{type:'combobox',options:{valueField: 'ROUT_ID', textField: 'ROUT_NM',method:'post',
			url: '/rout/selectRoutList'
			,queryParams: JSON.stringify({"dma_search" : {"TYPE": "ROUT_GRP","CONTENT" : $('#ROUT_GRP').combobox('getValue') }}) //미완성, CONTENT 순서가 안맞음 노선그룹을 못가져옴
			,required:true,panelHeight:100,panelMinHeight:20,panelMaxHeight:400
			,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
			,onSelect:function(a_record){$.jf_setcombovalue($('#dg1'), $.jf_curdgindex($('#dg1')), 'WAY_DIV', a_record.WAY_DIV);}
			}}},
			{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',editor:{type:'numberbox',options:{required:true,min:0,max:100}}},
			{field:'OLD_ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',hidden:true},
			{field:'DAY_DIV',title:'요일구분',width:100,halign:'center',align:'center',hidden:true},
			{field:'DAY_DIV_NM',title:'요일구분',width:100,halign:'center',align:'center',hidden:true},
			{field:'WAY_DIV',title:'상하행구분',width:100,align:'center',halign:'center',formatter:function(value,row){return row.WAY_DIV_NM;},
			editor:{type:'combobox',options:{valueField:'DL_CD',textField:'DL_CD_NM',method:'post',
			url:'/common/selectCommonDtlList',queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "WAY_DIV"}}),required:false,panelHeight:100,panelMinHeight:20,panelMaxHeight:400
			,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
			// {field:'WAY_DIV',title:'상하행구분2',width:100,halign:'center',align:'center'},
			{field:'WAY_DIV_NM',title:'상하행구분',width:100,halign:'center',align:'center',hidden:true},
			{field:'OLD_WAY_DIV',title:'상하행구분',width:100,halign:'center',align:'center',hidden:true},
			{field:'OPER_SN',title:'운행순번',width:100,halign:'center',align:'center',editor:{type:'numberbox',options:{required:true,min:0,max:100}}},
			{field:'OLD_OPER_SN',title:'운행순번',width:100,halign:'center',align:'center',hidden:true},
			{field:'ROUT_ST_TM',title:'노선시작(시분)',width:120,halign:'center',align:'center',editor:{type:'textbox', options:{maxlength: 5}}},
			{field:'ROUT_ED_TM',title:'노선종료(시분)',width:120,halign:'center',align:'center',editor:{type:'textbox', options:{maxlength: 5}}},

		]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
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
				return $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g');
			},
			onSelect: function(index,row){
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(a_index,a_row,a_changes){
				a_row.ROUT_NM = $.jf_currowtext($('#dg1'), a_index, 'ROUT_ID');
				a_row.WAY_DIV_NM = $.jf_currowtext($('#dg1'), a_index, 'WAY_DIV');
			},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){}
	});

});