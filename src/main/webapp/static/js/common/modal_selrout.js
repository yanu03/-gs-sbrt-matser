$(function(){
	
	$('#selrout').append('<div id="selrout_layout0"></div>');
	
	$('#selrout').window({
	    title:'노선검색',
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
	
	$('#selrout_layout0').layout({
		fit:true
	});
	
	$('#selrout_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	$('#selrout_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#selrout_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#selrout_layout0').layout('panel','north').append('<input id="selrout_sb0"></input>');
	
	$('#selrout_sb0').searchbox({
		width:200,
		height:22,
		prompt:'노선명',
	    searcher:function(value, name){
				let v_params = {TYPE:'ROUT_NM',CONTENT:value};
				$.jf_retrieve($('#selrout_dg0'), v_params);
	    }
	});
		
	$('#selrout_layout0').layout('panel','south').append('<a id="selrout_btn0" href="#">선택</a><a id="selrout_btn1" href="#">닫기</a>');

	$('#selrout_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#selrout_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#selrout_btn0').bind('click', function(){
		let v_row = $('#selrout_dg0').datagrid('getSelected');
		$.mf_selroutmdclose(v_row);
  });
  
	$('#selrout_btn1').bind('click', function(){
		$('#selrout').window('close');  // close a window
  });
  
  $('#selrout_layout0').layout('panel','center').append('<table id="selrout_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  
  	$('#selrout_dg0').datagrid({
    url:'/si/SI0401G0R0',				//json 조회 url
    method: 'post',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'center'},
        {field:'ROUT_NM',title:'노선명',width:150,halign:'center',align:'left'},
		{field:'WAY_DIV',title:'상하행',width:100,align:'center',halign:'center',hidden:'true'},
		{field:'WAY_DIV_NM',title:'상하행',width:100,align:'center',halign:'center'},
        {field:'REMARK',title:'비고',width:300,halign:'center',align:'left'},
    				]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){},
		onLoadSuccess: function(data){
			$.jf_setfocus($('#selrout_dg0'), -1);
			$.jf_setfooter($('#selrout_dg0'));
			$('#selrout_sb0').searchbox('textbox').focus();
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_selroutmdclose(row);
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
	$.mf_selroutmdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#selrout');
		$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		//let v_params = {CONTENT:a_values.COMP_NM};	//data params
		let v_params = {CONTENT:a_values.ROUT_NM};	//data params
		$('#selrout_sb0').searchbox('setValue', a_values.ROUT_NM);
		$.jf_retrieve($('#selrout_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_selroutmdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("selrout");
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

		//그리드일때
		if(v_type == 'g'){
			let v_obj = js_mdstrct[v_idx].datagrid;
			if(!$.jf_dupcheck($('#'+v_obj), 'ROUT_ID', v_values.ROUT_ID)) $.jf_append($('#'+v_obj), v_values);
			else $.tracomalmsg('정보', '데이터가 중복되어 입력할 수 없습니다.', null);
			$('#selrout').window('close');  // close a window
		}

		//폼일때
		else if(v_type == 'f'){
			let v_form = js_mdstrct[v_idx].form;
			$('#'+v_form).form('load', v_values);
			$('#selrout').window('close');  // close a window
			if($('#'+v_rtnobj).textbox('textbox') != "undefined")
				$('#'+v_rtnobj).textbox('textbox').focus();
			if($('#'+v_rtnobj).searchbox('textbox') != "undefined")
				$('#'+v_rtnobj).searchbox('textbox').focus();
			if($('#'+v_rtnobj).combobox('textbox') != "undefined")
				$('#'+v_rtnobj).combobox('textbox').focus();
				//combo와 combobox가 같이 이용 될 수도. 추후에 변경필요시 변경
		}
		
		//셀 클릭일때
		else if(v_type == 'c'){
			let v_obj = js_mdstrct[v_idx].datagrid;
			$('#'+v_obj).datagrid('updateRow',{index:$.jf_curdgindex($('#dg1')), row:v_values})
			$('#selrout').window('close');  // close a window
			$.jf_beginedit($('#'+v_obj), $.jf_curdgindex($('#dg1'))); //valid 처리 위함
		}
		
	}
	
});
