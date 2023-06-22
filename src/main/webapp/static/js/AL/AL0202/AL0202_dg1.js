/** 
작성자 : 양현우
작성일 : 2023-06-21
수정자 : 양현우
수정일 : 2023-06-21
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$.extend($.fn.validatebox.defaults.rules, {
		//시간 유효성 체크
	    timeValid: {
	        validator: function(value, param){return $.uf_timeValid(value, param);},
	        message: '잘못된 노선 시간입니다.'
	    },
		//시간 범위 유효성 체크
	    timeRangeValid: {
	        validator: function(value, param){return $.uf_timeRangeValid(value, param);},
	        message: '노선 시간이 겹칩니다.'
	    }

	});
	
	$('#dg1').datagrid({
		// url:'/AL/AL0202G1R0',	//json 조회 url
		url:'/AL/AL0202G1R0',	//URL 변경됨
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
			{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',editor:{type:'numberbox',options:{required:true,min:0,max:100}}},
			{field:'OLD_ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'left',hidden:true},
			{field:'ROUT_NM',title:'노선명',width:130,halign:'center',align:'left',hidden:false},			
			{field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left',hidden:false},			
			/*
			수정전 selectbox처리
			{field:'ROUT_ID',title:'노선명',width:130,align:'left',halign:'center',formatter:function(value,row){return row.ROUT_NM;},
			editor:{type:'combobox',options:{valueField: 'ROUT_ID', textField: 'ROUT_NM',method:'post',
			url: '/rout/selectRoutList'
			// ,queryParams: JSON.stringify({"dma_search" : {"TYPE": "ROUT_GRP","CONTENT" : $('#ROUT_GRP').combobox('getValue') }}) //미완성, CONTENT 순서가 안맞음 노선그룹을 못가져옴
			,queryParams: JSON.stringify({"dma_search" : {"TYPE": "ROUT_GRP","CONTENT" : '' }}) //미완성, CONTENT 순서가 안맞음 노선그룹을 못가져옴
			,required:true,panelHeight:100,panelMinHeight:20,panelMaxHeight:400
			,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
			,onSelect:function(a_record){$.jf_setcombovalue($('#dg1'), $.jf_curdgindex($('#dg1')), 'WAY_DIV', a_record.WAY_DIV);}
			}}},*/
			{field:'OLD_ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',hidden:true},
			{field:'DAY_DIV',title:'요일구분',width:100,halign:'center',align:'center',hidden:true},
			{field:'DAY_DIV_NM',title:'요일구분',width:100,halign:'center',align:'center',hidden:true},
			/*
			수정전 selectbox 처리
			{field:'WAY_DIV',title:'상하행구분',width:100,align:'center',halign:'center',formatter:function(value,row){return row.WAY_DIV_NM;},
			editor:{type:'combobox',options:{valueField:'DL_CD',textField:'DL_CD_NM',method:'post',
			url:'/common/selectCommonDtlList',queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "WAY_DIV"}}),required:false,panelHeight:100,panelMinHeight:20,panelMaxHeight:400
			,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},*/
			{field:'WAY_DIV',title:'상하행구분코드',width:100,halign:'center',align:'center',hidden:false},
			{field:'WAY_DIV_NM',title:'상하행구분',width:100,halign:'center',align:'center',hidden:false},
			{field:'OLD_WAY_DIV',title:'상하행구분',width:100,halign:'center',align:'center',hidden:true},
			//{field:'OPER_SN',title:'운행순번',width:100,halign:'center',align:'center',editor:{type:'numberbox',options:{required:true,min:0,max:100}}},
			{field:'OPER_SN',title:'운행순번',width:100,halign:'center',align:'center',hidden:true},
			{field:'OLD_OPER_SN',title:'운행순번',width:100,halign:'center',align:'center',hidden:true},
			{field:'ROUT_ST_TM',title:'시작시간(시분)',width:120,halign:'center',align:'center',
			editor:{type:'textbox', options:{required:true, maxlength: 5, validType: {timeValid:['ROUT_ST_TM'], timeRangeValid: ['ROUT_ST_TM']}}}},
			{field:'ROUT_ED_TM',title:'종료시간(시분)',width:120,halign:'center',align:'center',
			editor:{type:'textbox', options:{required:true, maxlength: 5, validType: {timeValid:['ROUT_ED_TM'], timeRangeValid: ['ROUT_ED_TM']}}}},

		]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				//$.jf_mergedg($('#dg1'), 'ALLOC_NO');
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
				//return $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g');
			},
			onSelect: function(index,row){
				//$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(a_index,a_row,a_changes){
				//a_row.ROUT_NM = $.jf_currowtext($('#dg1'), a_index, 'ROUT_ID');
				//a_row.WAY_DIV_NM = $.jf_currowtext($('#dg1'), a_index, 'WAY_DIV');
			},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){},
			onDblClickCell: function(a_index, a_field, a_value){
				//edit중이 아닐때
				if($.jf_fnddgstrct($('#dg1')) != -1){
					if(a_field == 'ROUT_NM' && a_index == $.jf_curdgindex($('#dg1'))){
						let v_values = {ROUT_ID:null, ROUT_NM:null, WAY_DIV: null, WAY_DIV_NM: null, REMARK:null};
						$.mf_selroutmdopen($('#dg1'), null, v_values, $('#dg1'), 'c');				
					}
				}
			}
	});

});