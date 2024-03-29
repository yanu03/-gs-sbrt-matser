﻿/** 
작성자 : 양현우
작성일 : 2023-04-28
수정자 : 양현우
수정일 : 2023-06-26
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
		url:'/al/AL0302G1R0',	//json 조회 url
		method: 'post',
		// queryParams: JSON.stringify({dma_search : {ALLOC_ID : ""}}),						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		// rownumbers: true,
		showFooter: true,
		multiSort: true,
		remoteSort: false,
		columns:[[
			//{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',editor:{type:'numberbox',options:{required:true,min:0,max:100}}},
			{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center'},
			{field:'ROUT_ST_TM',title:'출발시간',width:120,halign:'center',align:'center'},
			{field:'SN',title:'순번',width:100,halign:'center',align:'center',hidden:true},
			
			{field:'ST_ROUT_ID',title:'시작노선ID',width:100,halign:'center',align:'center',hidden:true},
			{field:'ST_ROUT_NM',title:'운행노선명',width:200,halign:'center',align:'left',editor:{type:'textbox',options:{required:true}}},
			{field:'VHC_ID',title:'차량ID',width:100,halign:'center',align:'center',hidden:true},
			{field:'VHC_NO',title:'차량번호',width:200,halign:'center',align:'left',editor:{type:'textbox',options:{required:true}}},
			{field:'DRV_ID',title:'운전자ID',width:100,halign:'center',align:'center',hidden:true},
			{field:'DRV_NM',title:'운전자명',width:150,halign:'center',align:'center',editor:{type:'textbox',options:{required:true}}},
			{field:'ROUT_GRP',title:'노선그룹',width:100,halign:'center',align:'center',hidden:true},
			{field:'WAY_DIV',title:'상하행',width:100,halign:'center',align:'center',hidden:true},
			{field:'blank',title:'',width:730,halign:'center',align:'left'},
			{field:'ST_NODE_ID',title:'시작노드ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ST_OPER_SN',title:'시작운행순번',width:100,halign:'center',align:'left',hidden:true},
			{field:'ED_ROUT_ID',title:'종료노선ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ED_ROUT_NM',title:'종료노선명',width:100,halign:'center',align:'left',hidden:true},
			{field:'ED_NODE_ID',title:'종료노드ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ED_OPER_SN',title:'종료노드순번',width:100,halign:'center',align:'left',hidden:true},
				]
			],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				$.jf_setfocus($('#dg1'), $.jf_fnddgstrct($('#dg1')));
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
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));	//grid edit일때 사용
				//child grid가 조회만 있는 경우, sort할때 아래 코드가 없으면 오류가 남
				//$.jf_moddgstrct($('#dg1'), index);
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){
		       /* if (!row.isNew) {
		            var ed = $(this).datagrid('getEditor', {
		                index: index,
		                field: 'ALLOC_NO'
		            });
		            $(ed.target).textbox('readonly', true);  // make the editor readonly
		        }	*/			
				
				//cell edit onclick 이벤트
		        let stroutnmEditor = $(this).datagrid('getEditor', {
		            index: index,
		            field: 'ST_ROUT_NM'
		        });

				let vhcnoEditor = $(this).datagrid('getEditor', {
		            index: index,
		            field: 'VHC_NO'
		        });

				let drvnmEditor = $(this).datagrid('getEditor', {
		            index: index,
		            field: 'DRV_NM'
		        });
		
		        $(stroutnmEditor.target).textbox('textbox').bind('click', function(e) {
					//let v_allocNoEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ALLOC_NO'});
					//let v_allocNo = $(v_allocNoEditor.target).textbox('getText');
					let v_vhcId = $.jf_curdgfieldvalue($('#dg1'), 'VHC_ID');
					let v_drvId = $.jf_curdgfieldvalue($('#dg1'), 'DRV_ID');
					if(!$.jf_isempty(v_vhcId) || !$.jf_isempty(v_drvId)) {
						$.tracomcfmsg('확인', '차량, 운전자가 초기화 됩니다. 계속 진행 하시겠습니까?', 'routchange');
						return false;
					}
					
					let v_allocNo = $.jf_curdgfieldvalue($('#dg1'), 'ALLOC_NO');
					/*if(v_allocNo == ""){
						$.tracomalmsg('정보', '배차번호를 먼저 입력해야 합니다.', null);
						return false;
					}*/
					if($.jf_curdgfieldvalue($('#dg1'), 'isNew')){
						v_allocNo = null;
					}
					let v_routNmEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'ST_ROUT_NM'});
					let v_routNm = $(v_routNmEditor.target).textbox('getText');
					let v_allocId = $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID');
					let v_values = {ALLOC_ID:v_allocId, ALLOC_NO:v_allocNo , ST_ROUT_ID: null, ST_ROUT_NM : v_routNm, ST_OPER_SN : null, ROUT_ST_TM : null
									,ROUT_GRP:null, WAY_DIV:null};
					$.mf_updatedg1mdopen($('#dg1'), null, v_values, $('#dg1'), 'c');
		        });
				
		        $(vhcnoEditor.target).textbox('textbox').bind('click', function(e) {
					if($.jf_isempty($.jf_curdgfieldvalue($('#dg1'),'ST_ROUT_ID'))) {
						$.tracomalmsg('정보', '운행노선을 먼저 설정해야 합니다.', null);
						return false;
					}			
					let v_vhcNoEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'VHC_NO'});
					let v_vhcNo = $(v_vhcNoEditor.target).textbox('getText');
					
					let v_allocId = $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID');
					let v_values = {ALLOC_ID:v_allocId, VHC_ID: null, VHC_NO : v_vhcNo};
					$.mf_updatedg2mdopen($('#dg1'), null, v_values, $('#dg1'), 'c');
		        });
				
		        $(drvnmEditor.target).textbox('textbox').bind('click', function(e) {
					if($.jf_isempty($.jf_curdgfieldvalue($('#dg1'),'ST_ROUT_ID'))) {
						$.tracomalmsg('정보', '운행노선을 먼저 설정해야 합니다.', null);
						return false;
					}
					let v_drvNmEditor = $('#dg1').datagrid('getEditor', {index:$.jf_curdgindex($('#dg1')), field:'DRV_NM'});
					let v_drvNm = $(v_drvNmEditor.target).textbox('getText');
					
					let v_allocId = $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID');
					let v_values = {ALLOC_ID:v_allocId, DRV_ID: null, DRV_NM : v_drvNm};
					$.mf_updatedg3mdopen($('#dg1'), null, v_values, $('#dg1'), 'c');
		        });				
				
			},
			onEndEdit: function(a_index,a_row,a_changes){
			},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){},
			onClickCell: function(a_index,a_field,a_value){},
			onDblClickCell : function(a_index, a_field, a_value) {}
	});

});