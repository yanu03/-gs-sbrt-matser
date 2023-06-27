$(function(){
	
	$('#updatedg1').append('<div id="updatedg1_layout0"></div>');
	
	$('#updatedg1').window({
	    title:'시작노선검색',
	    width:700,
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
	
	$('#updatedg1_layout0').layout('panel','north').append('<input id="updatedg1_sb0"></input>');
	
	$('#updatedg1_sb0').searchbox({
		width:200,
		height:22,
		prompt:'노선명',
	    searcher:function(value, name){
				let v_params = {TYPE:'ROUT_NM',CONTENT:value};
				$.jf_retrieve($('#updatedg1_dg0'), v_params);
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
        {field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'center', hidden:true},
        {field:'ST_ROUT_ID',title:'노선ID',width:100,halign:'center',align:'center'},
        {field:'ST_ROUT_NM',title:'노선명',width:200,halign:'center',align:'left'},
		{field:'WAY_DIV',title:'상하행',width:100,align:'center',halign:'center',hidden:'true'},
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
		let v_params = {ALLOC_ID:a_values.ALLOC_ID, ALLOC_NO:a_values.ALLOC_NO};	//data params
		$('#updatedg1_sb0').searchbox('setValue', a_values.ROUT_NM);
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
		
		//시간 겹칠때 같은 노선 OR 같은 차량, 같은 운전자면 return false
		if(!$.uf_timeRangeValid(v_values.ROUT_ST_TM)) {
			if($.jf_dupcheck($('#dg1'), 'ST_ROUT_ID', v_values.ST_ROUT_ID)){
				$.tracomalmsg('정보', '시간이 겹치는 노선입니다.', null);
				return false;
			}
		}
				
		let v_obj = js_mdstrct[v_idx].datagrid;
		$('#'+v_obj).datagrid('updateRow',{index:$.jf_curdgindex($('#dg1')), row:v_values})
		$('#updatedg1').window('close');  // close a window
		$.jf_beginedit($('#'+v_obj), $.jf_curdgindex($('#dg1'))); //valid 처리 위함
		
	}
	
});
