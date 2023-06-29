$(function(){
	
	$('#updatedg3').append('<div id="updatedg3_layout0"></div>');
	
	$('#updatedg3').window({
	    title:'운전자 검색',
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
	
	$('#updatedg3_layout0').layout({
		fit:true
	});
	
	$('#updatedg3_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	$('#updatedg3_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#updatedg3_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#updatedg3_layout0').layout('panel','north').append('<input id="updatedg3_sb0"></input>');
	
	$('#updatedg3_sb0').searchbox({
		width:200,
		height:22,
		prompt:'운전자명',
	    searcher:function(value, name){
				let v_params = {TYPE:'DRV_NM',CONTENT:value};
				$.jf_retrieve($('#updatedg3_dg0'), v_params);
	    }
	});
		
	$('#updatedg3_layout0').layout('panel','south').append('<a id="updatedg3_btn0" href="#">선택</a><a id="updatedg3_btn1" href="#">닫기</a>');

	$('#updatedg3_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#updatedg3_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#updatedg3_btn0').bind('click', function(){
		let v_row = $('#updatedg3_dg0').datagrid('getSelected');
		$.mf_updatedg3mdclose(v_row);
  });
  
	$('#updatedg3_btn1').bind('click', function(){
		$('#updatedg3').window('close');  // close a window
  });
  
  $('#updatedg3_layout0').layout('panel','center').append('<table id="updatedg3_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  
  	$('#updatedg3_dg0').datagrid({
    url:'/al/AL0105G2R0',				//json 조회 url
    method: 'post',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
      {field:'DRV_ID',title:'운전자ID',width:110,align:'center',halign:'center'},
      {field:'DRV_NM',title:'운전자명',width:110,align:'center',halign:'center'},
      {field:'PHONE',title:'전화번호',width:130,align:'center',halign:'center'},
	  {field:'COMP_NM',title:'운수사',width:130,align:'left',halign:'center'},
    				]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){},
		onLoadSuccess: function(data){
			$.jf_setfocus($('#updatedg3_dg0'), -1);
			$.jf_setfooter($('#updatedg3_dg0'));
			$('#updatedg3_sb0').searchbox('textbox').focus();
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_updatedg3mdclose(row);
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
	$.mf_updatedg3mdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#updatedg3');
		$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		let v_params = {ALLOC_ID:a_values.ALLOC_ID};	//data params
		$('#updatedg3_sb0').searchbox('setValue', a_values.ROUT_NM);
		$.jf_retrieve($('#updatedg3_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_updatedg3mdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("updatedg3");
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
		
		if(!$.uf_dupValid($('#updatedg3_dg0'), 'DRV_ID')){
			$.tracomalmsg('정보', '현재 입력된 운전자입니다.', null);
			return false;
		}
		
		if(!$.uf_fieldTimeRangeValid($.jf_curdgfieldvalue($('#dg1'), 'ROUT_ST_TM'), $('#updatedg3_dg0'), 'DRV_ID')) {
			$.tracomalmsg('정보', '시간이 겹치는 운전자입니다.', null);
			return false;
		}		
		
		let v_obj = js_mdstrct[v_idx].datagrid;
		$('#'+v_obj).datagrid('updateRow',{index:$.jf_curdgindex($('#dg1')), row:v_values})
		$('#updatedg3').window('close');  // close a window
		$.jf_beginedit($('#'+v_obj), $.jf_curdgindex($('#dg1'))); //valid 처리 위함
		
	}
	
});
