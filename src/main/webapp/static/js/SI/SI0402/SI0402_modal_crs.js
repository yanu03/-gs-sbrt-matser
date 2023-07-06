$(function(){
	
	$('#selcrosec').append('<div id="selcrosec_layout0"></div>');
	
	$('#selcrosec').window({
    title:'교차로검색',
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
	
	$('#selcrosec_layout0').layout({
		fit:true
	});
	
	let v_northLayout = '<div class="easyui-layout" data-options="fit:true">'
	v_northLayout += '<div data-options="region:\'center\', border:false">';
	v_northLayout += 	'<div id="modal1_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:\'로딩중...\'"></div>'
	v_northLayout += '</div>' //end center
	v_northLayout += '<div data-options="region:\'east\', border:false, minWidth:80, maxWidth:80">';
	v_northLayout += 	'<div id="modal1btn_panel0" class="easyui-panel" data-options="fit:true,cache:true,loadingMessage:\'로딩중...\'"></div>';
	v_northLayout += '</div>' //end east
	v_northLayout += '</div>' //end easyui-layout	
	
	$('#selcrosec_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
		maxHeight:35,
		minHeight:35,
		content:v_northLayout
	});
	$('#selcrosec_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#selcrosec_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#modal1_panel0').append('<input id="selcrosec_sb0"></input>');
	
	$('#selcrosec_sb0').searchbox({
		width:200,
		height:22,
		prompt:'교차로 ID/명 검색',
    	searcher:function(a_value, a_name){
			//let v_params = {CONTENT:value, CRS_ECPT_ID:''};
			//$.jf_retrieve($('#selcrosec_dg0'), v_params);
			
			let a_fields = ['CRS_ID', 'CRS_NM'];
			$.jf_findtext($('#selcrosec_dg0'), a_fields, a_value);
			$(this).textbox('textbox').focus();			
    }
	});
	$('#modal1btn_panel0').append('<a id="selcrosec_btn3" href="#">조회</a>');
	
	$('#selcrosec_btn3').linkbutton({
	    height: 24,
	    iconCls: 'icon-search'
	});
	
	$('#selcrosec_btn3').bind('click', function(){
		//let v_params = {TYPE:'VHC_NO',CONTENT:a_value};
		//$.jf_retrieve($('#selcrosec_dg0'), v_params);
		jv_rtclick = true;
		
		let v_params = {CONTENT:$('#selcrosec_sb0').searchbox('getValue')};
		$.jf_retrieve($('#selcrosec_dg0'), v_params);
 	});			
		
		
	$('#selcrosec_layout0').layout('panel','south').append('<a id="selcrosec_btn0" href="#">선택</a><a id="selcrosec_btn1" href="#">닫기</a>');

	$('#selcrosec_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#selcrosec_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#selcrosec_btn0').bind('click', function(){
		let v_row = $('#selcrosec_dg0').datagrid('getSelected');
		$.mf_selcrosecmdclose(v_row);
  });
  
	$('#selcrosec_btn1').bind('click', function(){
		$('#selcrosec').window('close');  // close a window
  });

/*
        CRS_ID=CR00000001
        CRS_NM=신한은행세종지점
        CRS_KIND=CK001
        CRS_KIND_NM='단일'
        GPS_X=127.25973
        GPS_Y=36.484005

*/

  
  $('#selcrosec_layout0').layout('panel','center').append('<table id="selcrosec_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  
  	$('#selcrosec_dg0').datagrid({
    url:'/si/SI0402P3R0',				//json 조회 url
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
        {field:'CRS_ID',title:'교차로ID',width:120,align:'center',halign:'center'},
        {field:'CRS_NM',title:'교차로명',width:300,align:'left',halign:'center'},
        {field:'CRS_KIND',title:'교차로종류',width:80,align:'center',halign:'center',hidden:true},
        {field:'CRS_KIND_NM',title:'교차로종류',width:100,align:'center',halign:'center'},
        {field:'GPS_X',title:'',width:120,align:'right',halign:'center',hidden:true},
        {field:'GPS_Y',title:'',width:120,align:'right',halign:'center',hidden:true}
    				]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){ },
		onLoadSuccess: function(data){
			$.jf_setfocus($('#selcrosec_dg0'), -1);
			$.jf_setfooter($('#selcrosec_dg0'));
			$('#selcrosec_sb0').searchbox('textbox').focus();
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_selcrosecmdclose(row);
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
	$.mf_selcrosecmdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#selcrosec');
			$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		let v_params = {CONTENT:a_values.CRS_NM, CRS_ECPT_ID:''};	//data params
			$('#selcrosec_sb0').searchbox('setValue', a_values.CRS_NM);
			$.jf_retrieve($('#selcrosec_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_selcrosecmdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("selcrosec");
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
		/*$.each(arr, function(index, value){
    	console.log(index + " : " + value);
		})*/
		if(v_type == 'g'){
			let v_obj = js_mdstrct[v_idx].datagrid;
			if(!$.jf_dupcheck($('#'+v_obj), 'NODE_ID', v_values.NODE_ID)) $.jf_append($('#'+v_obj), v_values);
			else $.tracomalmsg('정보', '데이터가 중복되어 입력할 수 없습니다.', null);
			$('#selcomp').window('close');  // close a window		
		}

		else if(v_type == 'f'){
			let v_form = js_mdstrct[v_idx].form;
			$('#'+v_form).form('load', v_values);
			$('#selcrosec').window('close');  // close a window
			if($('#'+v_rtnobj).textbox('textbox') != "undefined")
				$('#'+v_rtnobj).textbox('textbox').focus();
			if($('#'+v_rtnobj).searchbox('textbox') != "undefined")
				$('#'+v_rtnobj).searchbox('textbox').focus();
			if($('#'+v_rtnobj).combobox('textbox') != "undefined")
				$('#'+v_rtnobj).combobox('textbox').focus();
		}

			//combo와 combobox가 같이 이용 될 수도. 추후에 변경필요시 변경
	}
	
});
