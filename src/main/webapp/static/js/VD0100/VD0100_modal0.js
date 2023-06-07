$(function(){
	
	$('#sel_dvc_coords').append('<div id="sel_dvc_coords_layout0"></div>');
	
	$('#sel_dvc_coords').window({
    title:'시설물 위치 좌표 설정',
    width:1400,
    height:300,
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
	
	$('#sel_dvc_coords_layout0').layout({
		fit:true
	});
	$('#sel_dvc_coords_layout0').layout('add',{
      region: 'center',
      border:true,
      split: true
	});
  $('#sel_dvc_coords_layout0').layout('add',{
    region: 'south',
    border:true,
    split: true,
    maxHeight:50,
    minHeight:50
});

	$('#sel_dvc_coords_layout0').layout('panel','south').append('<a id="sel_dvc_coords_btn0" href="#">확인</a><a id="sel_dvc_coords_btn1" href="#">닫기</a>');

	$('#sel_dvc_coords_btn0').linkbutton({
      height: 24,
      iconCls: 'icon-ok'
  });
	
	$('#sel_dvc_coords_btn1').linkbutton({
      height: 24,
      iconCls: 'icon-no',
      disabled: false
	});
	
	$('#sel_dvc_coords_btn0').bind('click', function(){
    // 페이지 사용자 변수
		$.mf_sel_dvc_coordsmdclose(uv_modaldvcloc);
  });
  
	$('#sel_dvc_coords_btn1').bind('click', function(){
		$('#sel_dvc_coords').window('close');  // close a window
  });
  
  $('#sel_dvc_coords_layout0').layout('panel','center').append('<div id="center"style="width:100%;height:100%"></div>');

	/*modal page 함수*/	
	$.mf_sel_dvc_coordsmdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#sel_dvc_coords');
		$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		v_win.window('open');  // open a window
	}

	$.mf_sel_dvc_coordsmdclose = function(a_value){
		let v_idx = $.jf_fndmdstrct("sel_dvc_coords");
		
		let v_rtnobj = js_mdstrct[v_idx].rtnobj;
		let a_obj = js_mdstrct[v_idx].obj;

		// Object.entries(a_row).forEach(([rowkey, rowvalue]) => {
		// 	Object.entries(v_values).forEach(([rtnkey, rtnvalue]) => {
		// 		if(rowkey == rtnkey) { 
		// 			v_values[rtnkey] = rowvalue;
		// 			}
		// 	});
		// });
    $('#DVC_COORDS').textbox('setValue', a_value);

    $('#sel_dvc_coords').window('close');  // close a window
    if($('#'+v_rtnobj).textbox('textbox') != "undefined")
      $('#'+v_rtnobj).textbox('textbox').focus();
    if($('#'+v_rtnobj).searchbox('textbox') != "undefined")
      $('#'+v_rtnobj).searchbox('textbox').focus();
    if($('#'+v_rtnobj).combobox('textbox') != "undefined")
      $('#'+v_rtnobj).combobox('textbox').focus();
	}
	
  $('#sel_dvc_coords_layout0').on('click', function(e){

    $.uf_mvimg($('#sel_dvc_coords_layout0'),$('#dg1').datagrid('getSelected').DVC_ID, e);
  });

});
