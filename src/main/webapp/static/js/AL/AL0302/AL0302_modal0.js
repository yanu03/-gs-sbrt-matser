$(function(){
	var jv_cbclick = true;
	var jv_rtclick = false; //'조회'후에 데이터가 2개 이상일경우 focus 넘어가는 것 막기 위함
	
	$('#updatedg1').append('<div id="updatedg1_layout0"></div>');
	
	$('#updatedg1').window({
	    title:'시작노선검색',
	    width:900,
	    height:400,
	    collapsible:false,
	    minimizable:false,
	    maximizable:false,
	    modal:true,
	    closed:true,
	    onBeforeOpen:function(){
	    	return true;
	    },
	    onOpen:function(){ //Fires after windoes is opened.
	    },
	    onBeforeClose:function(){
	    	return true;
	    },
	    onClose:function(){ //Fires after windows is closed.
	    }
	});
	
	$('#updatedg1_layout0').layout({
		fit:true
	});
	
	$('#updatedg1_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
		maxHeight:50,
		minHeight:50
	});
	$('#updatedg1_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#updatedg1_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#updatedg1_layout0').layout('panel','north').append('<input id="updatedg1_cb0" class="tracom-combobox"></input>');
	$('#updatedg1_layout0').layout('panel','north').append('<input id="updatedg1_sb0"></input>');
	
	$('#updatedg1_sb0').searchbox({
		width:200,
		height:22,
		prompt:'노선ID 또는 노선명',
	    searcher:function(a_value, a_name){
		
			//let v_idx = $.jf_fndmdstrct("updatedg1");
			//let v_values = js_mdstrct[v_idx].values;
			//let v_params = {CONTENT:value,ALLOC_ID:v_values.ALLOC_ID ,ALLOC_NO:v_values.ALLOC_NO};
			//let v_params = {CONTENT:a_value,ALLOC_ID:$.jf_getmdvalues("updatedg1").ALLOC_ID, ALLOC_NO:$.jf_getmdvalues("updatedg1").ALLOC_NO};
			//$.jf_retrieve($('#updatedg1_dg0'), v_params);
			let a_fields = ['ST_ROUT_ID', 'ST_ROUT_NM'];
			$.jf_findtext($('#updatedg1_dg0'), a_fields, a_value);
			$(this).textbox('textbox').focus();
	    }
	});
	
	$('#updatedg1_layout0').layout('panel','north').append('<a id="updatedg1_btn3" href="#">조회</a>');
	
	$('#updatedg1_btn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	
	$('#updatedg1_btn3').bind('click', function(){
		//let v_params = {TYPE:'VHC_NO',CONTENT:a_value};
			//$.jf_retrieve($('#updatedg2_dg0'), v_params);
		jv_rtclick = true;
		let v_params = {CONTENT:$('#updatedg1_sb0').searchbox('getValue'),
						ALLOC_ID:$.jf_getmdvalues("updatedg1").ALLOC_ID, ALLOC_NO:$.jf_getmdvalues("updatedg1").ALLOC_NO};
		$.jf_retrieve($('#updatedg1_dg0'), v_params)
 	});	
			
	
	$('#updatedg1_cb0').combobox({
		width: 200,
		height: 24,
		editable: false,
		url: '/al/AL0302SHI0',
		method: 'post',
		//queryParams: JSON.stringify({"dma_search" : {"ALLOC_ID" : $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID')}}),
		valueField: 'ALLOC_NO',
		textField: 'ALLOC_NO_NM',
		label: '배차번호 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
		onBeforeLoad: function(param){
			if(Object.keys(param).length < 1) return false;
		},
		loadFilter: function(data) {
			var allItem = {};
			allItem['ALLOC_NO'] = ''; // 사용할 수 있는 고유한 값
			allItem['ALLOC_NO_NM'] = '전체'; // 표시되는 텍스트

			// 새 항목을 데이터 배열의 처음에 추가
			data.unshift(allItem);
			return data;
		},
		onChange: function(newValue, oldValue) {
			if(jv_cbclick) {
				let v_params = {ALLOC_ID:$.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID'), ALLOC_NO:newValue};	//data params
				$.jf_retrieve($('#updatedg1_dg0'), v_params);
			}
		}
	});
		
	$('#updatedg1_layout0').layout('panel','south').append('<a id="updatedg1_btn0" href="#">선택</a><a id="updatedg1_btn1" href="#">닫기</a>');

	$('#updatedg1_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#updatedg1_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#updatedg1_btn0').bind('click', function(){
		let v_row = $('#updatedg1_dg0').datagrid('getSelected');
		$.mf_updatedg1mdclose(v_row);
  });
  
	$('#updatedg1_btn1').bind('click', function(){
		$('#updatedg1').window('close');  // close a window
  });
  
  $('#updatedg1_layout0').layout('panel','center').append('<table id="updatedg1_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  
  	$('#updatedg1_dg0').datagrid({
    url:'/al/AL0302P0R0',				//json 조회 url
    method: 'post',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
		{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center',hidden:false},
        {field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'center', hidden:true},
        {field:'ST_ROUT_ID',title:'노선ID',width:100,halign:'center',align:'center'},
        {field:'ST_ROUT_NM',title:'노선명',width:200,halign:'center',align:'left'},
		{field:'ROUT_GRP',title:'노선그룹',width:100,align:'center',halign:'center',hidden:true},
		{field:'ROUT_GRP_NM',title:'노선그룹',width:100,align:'center',halign:'center'},
		{field:'WAY_DIV',title:'상하행',width:100,align:'center',halign:'center',hidden:true},
		{field:'WAY_DIV_NM',title:'상하행',width:100,align:'center',halign:'center'},
        {field:'ST_OPER_SN',title:'노선순번',width:50,halign:'center',align:'right',hidden:true},
        {field:'ROUT_ST_TM',title:'출발시간',width:120,halign:'center',align:'center'},
        {field:'ROUT_ED_TM',title:'도착시간',width:120,halign:'center',align:'center'},
    				]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){},
		onLoadSuccess: function(data){
			$.jf_setfocus($('#updatedg1_dg0'), -1);
			$.jf_setfooter($('#updatedg1_dg0'));
			$('#updatedg1_sb0').searchbox('textbox').focus();
			
			//조회후 focus(find)
			if(!jv_rtclick && !$.jf_isempty($('#updatedg1_sb0').searchbox('getValue'))){
				let a_fields = ['ST_ROUT_ID', 'ST_ROUT_NM'];
				$.jf_findtext($('#updatedg1_dg0'), a_fields, $('#updatedg1_sb0').searchbox('getValue'));
			}
			jv_rtclick = false;			
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_updatedg1mdclose(row);
		},
		onBeforeSelect: function(index,row){ return true; },
		onSelect: function(index,row){},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

	/*modal page 함수*/	
	$.mf_updatedg1mdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		
		let v_win = $('#updatedg1');
		$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		//let v_params = {CONTENT:a_values.COMP_NM};	//data params
		
		v_queryParams = JSON.stringify({dma_search : {"ALLOC_ID" : $.jf_curdgfieldvalue($('#dg0'), 'ALLOC_ID')}});
		$('#updatedg1_cb0').combobox({queryParams: v_queryParams});
		let v_params = {ALLOC_ID:a_values.ALLOC_ID, ALLOC_NO:a_values.ALLOC_NO};	//data params
		$('#updatedg1_sb0').searchbox('setValue', a_values.ST_ROUT_NM);
		if(!$.jf_curdgfieldvalue($('#dg1'), 'isNew') && !$.jf_isempty(a_values.ALLOC_NO) ){
			jv_cbclick = false;
			$('#updatedg1_cb0').combobox('setValue', a_values.ALLOC_NO);
			jv_cbclick = true;
			$('#updatedg1_cb0').combobox('disable')
		} else{
			$('#updatedg1_cb0').combobox('enable')
		}
		$.jf_retrieve($('#updatedg1_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_updatedg1mdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("updatedg1");
		let v_values = js_mdstrct[v_idx].values;
		let v_rtnobj = js_mdstrct[v_idx].rtnobj;
		let v_type = js_mdstrct[v_idx].type;
		
		
		Object.entries(a_row).forEach(([rowkey, rowvalue]) => {
			Object.entries(v_values).forEach(([rtnkey, rtnvalue]) => {
				if(rowkey == rtnkey) { 
					v_values[rtnkey] = rowvalue;
					}
			});
		});
		
		//시간 겹칠때 같은 노선이면 return false
		if(!$.uf_routTimeRangeValid(v_values)) {
			$.tracomalmsg('정보', '시간이 겹치는 노선입니다.', null);
			return false;
		}		
				
		let v_obj = js_mdstrct[v_idx].datagrid;
		$('#'+v_obj).datagrid('updateRow',{index:$.jf_curdgindex($('#dg1')), row:v_values})
		$('#updatedg1').window('close');  // close a window
		$.jf_beginedit($('#'+v_obj), $.jf_curdgindex($('#dg1'))); //valid 처리 위함
		
	}
	
});
