$(function(){
	
	$('#selbustop').append('<div id="selbustop_layout0"></div>');
	
	$('#selbustop').window({
    title:'정류장검색',
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
	
	$('#selbustop_layout0').layout({
		fit:true
	});
	
	let v_northLayout = '<div class="easyui-layout" data-options="fit:true">'
	v_northLayout += '<div data-options="region:\'center\', border:false">';
	v_northLayout += 	'<div id="modal0_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:\'로딩중...\'"></div>'
	v_northLayout += '</div>' //end center
	v_northLayout += '<div data-options="region:\'east\', border:false, minWidth:100, maxWidth:100">';
	v_northLayout += 	'<div id="modal0btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:\'로딩중...\'"></div>';
	v_northLayout += '</div>' //end east
	v_northLayout += '</div>' //end easyui-layout	
	
	$('#selbustop_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
		maxHeight:35,
		minHeight:35,
		content:v_northLayout
	});
	$('#selbustop_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#selbustop_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#modal0_panel0').append('<input id="selbustop_sb0"></input>');
	
	$('#selbustop_sb0').searchbox({
		width:200,
		height:22,
		prompt:'정류장 ID/명 검색',
    	searcher:function(a_value, a_name){
			//let v_params = {CONTENT:a_value, STTN_ECPT_ID:''};
			//$.jf_retrieve($('#selbustop_dg0'), v_params);
			
			let a_fields = ['STTN_ID', 'STTN_NM'];
			$.jf_findtext($('#selbustop_dg0'), a_fields, a_value);
			$(this).textbox('textbox').focus();
 	   }
	});
		
	$('#modal0btn_panel0').append('<a id="selbustop_btn3" href="#">조회</a>');
	
	$('#selbustop_btn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	
	$('#selbustop_btn3').bind('click', function(){
		//let v_params = {TYPE:'VHC_NO',CONTENT:a_value};
		//$.jf_retrieve($('#selbustop_dg0'), v_params);
		let v_params = {CONTENT:$('#selbustop_sb0').searchbox('getValue')};
		$.jf_retrieve($('#selbustop_dg0'), v_params);
 	});			
		
	$('#selbustop_layout0').layout('panel','south').append('<a id="selbustop_btn0" href="#">선택</a><a id="selbustop_btn1" href="#">닫기</a>');

	$('#selbustop_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#selbustop_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#selbustop_btn0').bind('click', function(){
		let v_row = $('#selbustop_dg0').datagrid('getSelected');
		$.mf_selbustopmdclose(v_row);
  });
  
	$('#selbustop_btn1').bind('click', function(){
		$('#selbustop').window('close');  // close a window
  });

  $('#selbustop_layout0').layout('panel','center').append('<table id="selbustop_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  
  	$('#selbustop_dg0').datagrid({
    url:'/si/SI0402P2R0',				//json 조회 url
    method: 'post',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'NODE_ID',title:'노드ID',width:120,align:'center',halign:'center',hidden:true},
        {field:'NODE_NM',title:'노드명',width:140,align:'center',halign:'center',hidden:true},
        {field:'STTN_ID',title:'정류장ID',width:120,align:'center',halign:'center'},
        {field:'STTN_NM',title:'정류장명',width:300,align:'left',halign:'center'},
        {field:'STTN_NO',title:'정류장번호',width:100,align:'center',halign:'center'},
        {field:'GPS_X',title:'',width:120,align:'right',halign:'center',hidden:true},
        {field:'GPS_Y',title:'',width:120,align:'right',halign:'center',hidden:true},
        {field:'AREA',title:'',width:60,align:'center',halign:'center',hidden:true},
        {field:'BAY_TYPE',title:'',width:60,align:'center',halign:'center',hidden:true},
        {field:'CENTER_YN',title:'',width:60,align:'center',halign:'center',hidden:true},
        {field:'STTN_FCLT_TYPE',title:'',width:60,align:'center',halign:'center',hidden:true},
        {field:'VHC_DOOR_DIR_TYPE',title:'',width:60,align:'center',halign:'center',hidden:true},
        {field:'WAY_DIV',title:'',width:60,align:'center',halign:'center',hidden:true}
    				]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){ },
		onLoadSuccess: function(data){
			$.jf_setfocus($('#selbustop_dg0'), -1);
			$.jf_setfooter($('#selbustop_dg0'));
			$('#selbustop_sb0').searchbox('textbox').focus();
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_selbustopmdclose(row);
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
	$.mf_selbustopmdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#selbustop');
			$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		let v_params = {CONTENT:a_values.STTN_NM, STTN_ECPT_ID:''};	//data params
			$('#selbustop_sb0').searchbox('setValue', a_values.STTN_NM);
			$.jf_retrieve($('#selbustop_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_selbustopmdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("selbustop");
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

		if(v_type == 'g'){
			let v_obj = js_mdstrct[v_idx].datagrid;
			//노드순번에 맞게 넣어야 해서 해당 부분만 공통 modal에서 수정하였습니다.
			if(!$.jf_dupcheck($('#'+v_obj), 'NODE_ID', v_values.NODE_ID)) $.jf_addsttn($('#dg1'), a_row, $.jf_curdgfieldvalue($('#dg0'), 'ROUT_ID'), curPoint);
			else $.tracomalmsg('정보', '데이터가 중복되어 입력할 수 없습니다.', null);
			$('#selbustop').window('close');  // close a window
		}

		else if(v_type == 'f'){
			let v_form = js_mdstrct[v_idx].form;
			$('#'+v_form).form('load', v_values);
			$('#selbustop').window('close');  // close a window
			if($('#'+v_rtnobj).textbox('textbox') != "undefined")
				$('#'+v_rtnobj).textbox('textbox').focus();
			if($('#'+v_rtnobj).searchbox('textbox') != "undefined")
				$('#'+v_rtnobj).searchbox('textbox').focus();
			if($('#'+v_rtnobj).combobox('textbox') != "undefined")
				$('#'+v_rtnobj).combobox('textbox').focus();
		}
	}
	
});
