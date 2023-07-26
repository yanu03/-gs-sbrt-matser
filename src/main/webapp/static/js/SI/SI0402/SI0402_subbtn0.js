$(function(){
	
	var authority = $.jf_getcurauthority();

	if(authority.SCH_AH=="Y"){
		$('#subbtn_panel0').append('<a id="subbtn6" href="#">새로고침</a>');
	}
	if(authority.SAV_AH=="Y"){
		$('#subbtn_panel0').append('<a id="subbtn0" href="#">상</a>');
		$('#subbtn_panel0').append('<a id="subbtn1" href="#">하</a>');
		$('#subbtn_panel0').append('<a id="subbtn2" href="#">삭제</a>');
	}
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
	$('#subbtn6').linkbutton({
	    height: 24,
	    iconCls: 'icon-reload'
	});	
	
	//btn 기능 binding
	$('#subbtn0').bind('click', function(){
		//상
		let v_index = $.jf_curdgindex($('#dg1'));
		//그리드 전체 변경
		/*if (v_index > 0) {
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
		};*/
		//현재 row와 위 row만 변경
		if (v_index > 0) {
			let v_data = $('#dg1').datagrid('getData');
			let v_aboveRow = JSON.parse(JSON.stringify(v_data.rows[v_index - 1])); //위 row
			let v_belowRow = JSON.parse(JSON.stringify(v_data.rows[v_index])); //선택된 row(아래 row)
			
			let v_aboveRowNodeSN = v_aboveRow['NODE_SN'];
			let v_belowRowNodeSN = v_belowRow['NODE_SN'];
			
			v_aboveRow['NODE_SN'] = v_belowRowNodeSN;
			v_belowRow['NODE_SN'] = v_aboveRowNodeSN;
			
			$('#dg1').datagrid('updateRow',{index:v_index,row:v_aboveRow});			
			$('#dg1').datagrid('updateRow',{index:v_index-1,row:v_belowRow});			
			$('#dg1').datagrid('selectRow', v_index - 1);
			$.jf_deleteline();
			$.jf_drawline($('#dg1').datagrid('getData')['rows']);
		};
	})
	
	$('#subbtn1').bind('click', function(){
		//하
		// $.jf_downdgdata($('#dg1'), 'NODE_SN');
		
		var v_index = $.jf_curdgindex($('#dg1'));
		var v_data = $('#dg1').datagrid('getData');
		//그리드 전체 변경
		/*if (v_index < v_data.rows.length - 1) {
			var v_temp = v_data.rows[v_index + 1];
			v_data.rows[v_index + 1] = v_data.rows[v_index];
			v_data.rows[v_index] = v_temp;
			$('#dg1').datagrid('loadData', v_data);
			$('#dg1').datagrid('selectRow', v_index + 1);
			for(let i=0; i<v_data.rows.length; i++) {
				v_vals = $.jf_singledatatojson('NODE_SN', i+1);
				$('#dg1').datagrid('updateRow',{index:i,row:v_vals});
			}
		}*/
		
		//현재 row와 아래 row만 변경
		if (v_index < v_data.rows.length - 1) {
			let v_data = $('#dg1').datagrid('getData');
			
			let v_aboveRow = JSON.parse(JSON.stringify(v_data.rows[v_index])); //위 row
			let v_belowRow = JSON.parse(JSON.stringify(v_data.rows[v_index+1])); //선택된 row(아래 row)			
			
			let v_aboveRowNodeSN = v_aboveRow['NODE_SN'];
			let v_belowRowNodeSN = v_belowRow['NODE_SN'];
			
			
			v_aboveRow['NODE_SN'] = v_belowRowNodeSN;
			v_belowRow['NODE_SN'] = v_aboveRowNodeSN;
			
			/*for (let key in v_aboveRow) {
				if (key != 'LINK_ID' && key != 'NODE_SN') {
					let temp = v_aboveRow[key];
					v_aboveRow[key] = v_belowRow[key];
					v_belowRow[key] = temp;
				}
			}		*/	

			$('#dg1').datagrid('updateRow',{index:v_index,row:v_belowRow});			
			$('#dg1').datagrid('updateRow',{index:v_index+1,row:v_aboveRow});			
			$('#dg1').datagrid('selectRow', v_index + 1);
			$.jf_deleteline();
			$.jf_drawline($('#dg1').datagrid('getData')['rows']);
		}
	});
	$('#subbtn2').bind('click', function(){
		$.jf_checkforeigntable($.jf_curdgrow($('#dg1')),"SI0402", function(){
				$.jf_delete($('#dg1'));
				$.jf_drawroute($('#dg1').datagrid('getData')['rows']);
			}
		);	
	});
	$('#subbtn6').bind('click', function(){
		if($.jf_changeddg($('#dg1'), null)) {
			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', $.jf_curdgindex($('#dg1')));
		}else{
			$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), $.jf_curdgrow($('#dg0'))));
		}				
  	});	
   
});