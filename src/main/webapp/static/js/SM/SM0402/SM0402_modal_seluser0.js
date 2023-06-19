$(function(){
	
	$('#seluser').append('<div id="seluser_layout0"></div>');
	
	$('#seluser').window({
    title:'사용자 검색',
    width:300,
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
	
	$('#seluser_layout0').layout({
		fit:true
	});
	
	$('#seluser_layout0').layout('add',{
	    region: 'north',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	$('#seluser_layout0').layout('add',{
	    region: 'center',
	    border:true,
	    split: true
	});
	
	$('#seluser_layout0').layout('add',{
	    region: 'south',
	    border:true,
	    split: true,
			maxHeight:50,
			minHeight:50
	});
	
	$('#seluser_layout0').layout('panel','north').append('<input id="seluser_sb0"></input>');
	
	$('#seluser_sb0').searchbox({
		width:200,
		height:22,
		prompt:'사용자 ID 사용자 명 검색',
    searcher:function(value, name){
			let v_params = {CONTENT:value};
			$.jf_retrieve($('#seluser_dg0'), v_params);
    }
	});
		
	$('#seluser_layout0').layout('panel','south').append('<a id="seluser_btn0" href="#">선택</a><a id="seluser_btn1" href="#">닫기</a>');

	$('#seluser_btn0').linkbutton({
	    height: 24,
	    iconCls: 'icon-ok'
	});
	
	$('#seluser_btn1').linkbutton({
	    height: 24,
	    iconCls: 'icon-no',
	    disabled: false
	});
	
	$('#seluser_btn0').bind('click', function(){
		let v_row = $('#seluser_dg0').datagrid('getSelected');
		$.mf_selusermdclose(v_row);
  });
  
	$('#seluser_btn1').bind('click', function(){
		$('#seluser').window('close');  // close a window
  });
  
  $('#seluser_layout0').layout('panel','center').append('<table id="seluser_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  

  	$('#seluser_dg0').datagrid({
    // url:'/authority/selectAuthorityMemberList',				//json 조회 url
    url:'/member/searchMemberBasic',				//json 조회 url
    method: 'post',
    // queryParams: JSON.stringify({dma_search:{AUTH_CD:""}}),						//json 조회 params
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : "",USE_YN: "All"}}),	//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'USER_ID',title:'사용자ID',width:120,align:'center',halign:'center'},
        {field:'USER_NM',title:'사용자명',width:140,align:'center',halign:'center'},
            ]],
		frozenColumns:[[
						]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		onLoadError: function(){},
		onLoadSuccess: function(data){
			$.jf_setfocus($('#seluser_dg0'), -1);
			$.jf_setfooter($('#seluser_dg0'));
			$('#seluser_sb0').searchbox('textbox').focus();
		},
		onBeforeLoad: function(param){ 
			if(Object.keys(param).length < 1) return false;
			else return true; 
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			$.mf_selusermdclose(row);
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
	$.mf_selusermdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#seluser');
		$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
    // console.log(a_values);
		let v_params = {AUTH_CD:a_values.USER_NM};	//data params
			$('#seluser_sb0').searchbox('setValue', a_values.USER_NM);
			$.jf_retrieve($('#seluser_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_selusermdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("seluser");
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
      let v_selected = $('#dg0').datagrid('getSelected');
      v_values.AUTH_CD = v_selected.AUTH_CD
      
			if(!$.jf_dupcheck($('#'+v_obj), 'USER_ID', v_values.USER_ID)) $.jf_append($('#'+v_obj), v_values);
			else $.tracomalmsg('정보', '데이터가 중복되어 입력할 수 없습니다.', null);
			$('#seluser').window('close');  // close a window
		}

		//폼일때
		else if(v_type == 'f'){
			let v_form = js_mdstrct[v_idx].form;
			$('#'+v_form).form('load', v_values);
			$('#seluser').window('close');  // close a window
			if($('#'+v_rtnobj).textbox('textbox') != "undefined")
				$('#'+v_rtnobj).textbox('textbox').focus();
			if($('#'+v_rtnobj).searchbox('textbox') != "undefined")
				$('#'+v_rtnobj).searchbox('textbox').focus();
			if($('#'+v_rtnobj).combobox('textbox') != "undefined")
				$('#'+v_rtnobj).combobox('textbox').focus();
				//combo와 combobox가 같이 이용 될 수도. 추후에 변경필요시 변경

		}
	}
	
});
