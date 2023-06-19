$(function(){
	
	$('#selcomp').append('<div id="selcomp_layout0"></div>');
	
	$('#selcomp').window({
    title:'운수사검색',
    width:600,
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
	
	$('#selcomp_layout0').layout({
		fit:true
	});
	
	$('#selcomp_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	$('#selcomp_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#selcomp_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#selcomp_layout0').layout('panel','north').append('<input id="selcomp_sb0"></input>');
	
	$('#selcomp_sb0').searchbox({
		width:200,
		height:22,
		prompt:'운수사 ID/명 검색',
    searcher:function(value, name){
			let v_params = {CONTENT:value};
			$.jf_retrieve($('#selcomp_dg0'), v_params);
    }
	});
		
	$('#selcomp_layout0').layout('panel','south').append('<a id="selcomp_btn0" href="#">선택</a><a id="selcomp_btn1" href="#">닫기</a>');

	$('#selcomp_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#selcomp_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#selcomp_btn0').bind('click', function(){
		let v_row = $('#selcomp_dg0').datagrid('getSelected');
		$.mf_selcompmdclose(v_row);
  });
  
	$('#selcomp_btn1').bind('click', function(){
		$('#selcomp').window('close');  // close a window
  });
  
  $('#selcomp_layout0').layout('panel','center').append('<table id="selcomp_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  
  	$('#selcomp_dg0').datagrid({
    url:'/si/SI0102G0R0',				//json 조회 url
    method: 'post',
    queryParams: JSON.stringify({dma_search:{TYPE:"ALL",CONTENT:""}}),						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'COMP_ID',title:'운수사ID',width:120,align:'center',halign:'center'},
        {field:'COMP_NM',title:'운수사명',width:140,align:'center',halign:'center'},
        {field:'AREA',title:'권역코드',width:140,align:'center',halign:'center'},
				{field:'AREA_NM',title:'권역명',width:140,align:'center',halign:'center'}
    				]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){ },
		onLoadSuccess: function(data){
			$.jf_setfocus($('#selcomp_dg0'), -1);
			$.jf_setfooter($('#selcomp_dg0'));
			$('#selcomp_sb0').searchbox('textbox').focus();
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_selcompmdclose(row);
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
	$.mf_selcompmdopen = function(a_form, a_values, a_rtnobj){
		let v_win = $('#selcomp');
			$.jf_modmdstrct(v_win, a_form, a_values, a_rtnobj);
		let v_params = {CONTENT:a_values.COMP_NM};	//data params
			$('#selcomp_sb0').searchbox('setValue', a_values.COMP_NM);
			$.jf_retrieve($('#selcomp_dg0'), v_params);
		v_win.window('open');  // open a window
	}
	
	$.mf_selcompmdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("selcomp");
		let v_form = js_mdstrct[v_idx].form;
		let v_values = js_mdstrct[v_idx].values;
		let v_obj = js_mdstrct[v_idx].rtnobj;
		
		Object.entries(a_row).forEach(([rowkey, rowvalue]) => {
			Object.entries(v_values).forEach(([rtnkey, rtnvalue]) => {
				if(rowkey == rtnkey) { 
					v_values[rtnkey] = rowvalue;
					}
			});
		});
		$('#'+v_form).form('load', v_values);
		$('#selcomp').window('close');  // close a window
		if($('#'+v_obj).textbox('textbox') != "undefined")
			$('#'+v_obj).textbox('textbox').focus();
		if($('#'+v_obj).searchbox('textbox') != "undefined")
			$('#'+v_obj).searchbox('textbox').focus();
		if($('#'+v_obj).combobox('textbox') != "undefined")
			$('#'+v_obj).combobox('textbox').focus();
			//combo와 combobox가 같이 이용 될 수도. 추후에 변경필요시 변경
	}
	
});
