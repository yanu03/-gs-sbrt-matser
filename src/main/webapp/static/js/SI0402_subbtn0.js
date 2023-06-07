$(function(){
	
	$('#subbtn_panel0').append('<a id="subbtn0" href="#">상</a>');
	$('#subbtn_panel0').append('<a id="subbtn1" href="#">하</a>');
	$('#subbtn_panel0').append('<a id="subbtn2" href="#">삭제</a>');
	
	$('#subbtn0').linkbutton({
	    height: 24,
	    // iconCls: 'icon-search'
	});
	$('#subbtn1').linkbutton({
	    height: 24,
	    // iconCls: 'icon-add',
	    disabled: false
	});
	$('#subbtn2').linkbutton({
	    height: 24,
	    iconCls: 'icon-remove',
	   	plain: false
	});	
	
	//btn 기능 binding
	$('#subbtn0').bind('click', function(){
		//상
		let v_index = $.jf_curdgindex($('#dg1'));
		if (v_index > 0) {
			let v_data = $('#dg1').datagrid('getData');
			let v_temp = v_data.rows[v_index - 1];
			v_data.rows[v_index - 1] = v_data.rows[v_index];
			v_data.rows[v_index] = v_temp;
			$('#dg1').datagrid('loadData', v_data);
			$('#dg1').datagrid('selectRow', v_index - 1);
			for(let i=0; i<v_data.rows.length; i++) {
				v_vals = $.jf_singledatatojson('NODE_SN', i+1);
				$('#dg1').datagrid('updateRow',{index:i,row:v_vals});
			}
		};
	})
	
	$('#subbtn1').bind('click', function(){
		//하
		// $.jf_downdgdata($('#dg1'), 'NODE_SN');
		var v_index = $.jf_curdgindex($('#dg1'));
		var v_data = $('#dg1').datagrid('getData');
		if (v_index < v_data.rows.length - 1) {
			var v_temp = v_data.rows[v_index + 1];
			v_data.rows[v_index + 1] = v_data.rows[v_index];
			v_data.rows[v_index] = v_temp;
			$('#dg1').datagrid('loadData', v_data);
			$('#dg1').datagrid('selectRow', v_index + 1);
			for(let i=0; i<v_data.rows.length; i++) {
				v_vals = $.jf_singledatatojson('NODE_SN', i+1);
				$('#dg1').datagrid('updateRow',{index:i,row:v_vals});
			}
		}
	});
	$('#subbtn2').bind('click', function(){
		$.jf_delete($('#dg1'));
	});
   
});