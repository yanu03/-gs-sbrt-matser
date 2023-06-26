$(function(){
	
	$('#updatedg1').append('<div id="updatedg1_layout0"></div>');
	
	$('#updatedg1').window({
	    title:'운행계획 세부 관리',
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
	
	$('#updatedg1_layout0').layout('panel','center').append('<form id="modal_ef0" method="post"><div id="fm_panel0" class="easyui-panel" data-options="fit:true,cache:true"></div></form>');
	$('#updatedg1_layout0').layout('panel','south').append('<a id="updatedg1_btn0" href="#">확인</a><a id="updatedg1_btn1" href="#">닫기</a>');

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
		let v_row = $('#dg1').datagrid('getSelected');
		$.mf_updatedg1mdclose(v_row);
  });
  
	$('#updatedg1_btn1').bind('click', function(){
		$('#updatedg1').window('close');  // close a window
  });
  
 // $('#updatedg1_layout0').layout('panel','center').append('<table id="updatedg1_dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
  

	$('#modal_ef0').form({
		onSubmit: function (param) {
		},
		success: function (data) {
		},
		onProgress: function (percent) {
		},
		onBeforeLoad: function (param) {
		},
		onLoadSuccess: function (data) {
		},
		onLoadError: function () {
		},
		onChange: function (target) {
			if (!jv_rowclick) return false;
			// if (!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;

			let a_vals;
			let a_arrfield;
			let a_arrvalue;
			switch (target.id) {
				default:
					if (!$(target).textbox('isValid')) { $(target).textbox('clear'); break; }
					a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
					break;
			}
			//$.jf_synctogrid($('#dg1'), a_vals);
			return true;
		}
	});
	
	$('#fm_panel0').append('<table>');
	$('#fm_panel0').append('<input id="ALLOC_NO" class="tracom-textbox" name="ALLOC_NO">&nbsp;');
	$('#fm_panel0').append('<input id="ROUT_NM" class="tracom-textbox" name="ROUT_NM">&nbsp;');
	$('#fm_panel0').append('<input id="NODE_TYPE_NM" class="tracom-textbox" name="NODE_TYPE_NM">&nbsp;');
	$('#fm_panel0').append('<input id="NODE_NM" class="tracom-textbox" name="NODE_NM">&nbsp;');
	$('#fm_panel0').append('<input id="ARRV_TM" class="tracom-textbox" name="ARRV_TM">&nbsp;');
	$('#fm_panel0').append('<input id="DPRT_TM" class="tracom-textbox" name="DPRT_TM">&nbsp;');
	$('#fm_panel0').append('</table>');	

	$('#ALLOC_NO').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',
		required: true,
		readonly: true,
		value: '',
		label: '배차번호 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#ROUT_NM').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',
		required: true,
		readonly: true,
		value: '',
		label: '노선명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#NODE_TYPE_NM').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',
		required: true,
		readonly: true,
		value: '',
		label: '노드종류: ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});	
	
	$('#NODE_NM').textbox({
		width: 300,
		maxlength: 10,
		height: 25,
		type: 'text',
		required: true,
		readonly: true,
		value: '',
		label: '노드명: ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#ARRV_TM').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		label: '도착시간 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		},
		validType: {timeValid:['ARRV_TM'], timeRangeValid: ['ARRV_TM']}
	});
			
	$('#DPRT_TM').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		label: '출발시간 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		},
		validType: {timeValid:['DPRT_TM'], timeRangeValid: ['DPRT_TM']}
	});		

	/*modal page 함수*/	
	$.mf_updatedg1mdopen = function(a_obj, a_form, a_values, a_rtnobj, a_type){
		let v_win = $('#updatedg1');
		$.jf_modmdstrct(v_win, a_obj, a_form, a_values, a_rtnobj, a_type);
		//let v_params = {CONTENT:a_values.COMP_NM};	//data params
		let v_params = {CONTENT:a_values.ROUT_NM};	//data params
		//$('#updatedg1_sb0').searchbox('setValue', a_values.ROUT_NM);
		//$.jf_retrieve($('#updatedg1_dg0'), v_params)
		v_win.window('open');  // open a window
	}
	
	$.mf_updatedg1mdclose = function(a_row){
		let v_idx = $.jf_fndmdstrct("updatedg1");
		//let v_values = js_mdstrct[v_idx].values;
		let v_rtnobj = js_mdstrct[v_idx].rtnobj;
		let v_type = js_mdstrct[v_idx].type;
		
		/*Object.entries(a_row).forEach(([rowkey, rowvalue]) => {
			Object.entries(v_values).forEach(([rtnkey, rtnvalue]) => {
				if(rowkey == rtnkey) { 
					v_values[rtnkey] = rowvalue;
					}
			});
		});*/
		
		let v_values = {
			ARRV_TM : $('#ARRV_TM').textbox('getText'),
			DPRT_TM : $('#DPRT_TM').textbox('getText')
		}
		let v_obj = js_mdstrct[v_idx].datagrid;
		$('#'+v_obj).datagrid('updateRow',{index:$.jf_curdgindex($('#dg1')), row:v_values})
		$('#updatedg1').window('close');  // close a window
	}
	
});
