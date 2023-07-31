$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0" value="">');
	
	$('#sch_lb0').combobox({
	   	width: 200,
		labelWidth: 80,
	   	height: 24,
	   	editable: false,
	    url: '/rout/selectRoutListByRoutGrp',
	    method: 'post',
	    //queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_DIV"}}),
	    //queryParams: JSON.stringify({"dma_search" : {"content" : ""}}),
		queryParams: {},
	    valueField: 'ROUT_ID',
	    textField: 'ROUT_NM',
		panelHeight:'auto',
		label:'노선 :',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
		loadFilter: function(data) {
			var allItem = {};
			allItem['ROUT_ID'] = ''; // 사용할 수 있는 고유한 값
			allItem['ROUT_NM'] = '모두'; // 표시되는 텍스트

			// 새 항목을 데이터 배열의 처음에 추가
			data.unshift(allItem);
			return data;
		},
	    onBeforeLoad: function(param){if(Object.keys(param).length < 1) return false;},
	    onLoadSuccess: function(){
			let v_routIds = [];
			for(var i=0; i<$('#sch_lb0').combobox('getData').length; i++) {
				v_routIds.push($('#sch_lb0').combobox('getData')[i].ROUT_ID);
			}
			let v_param = JSON.stringify({dma_search : {ROUT_IDS : v_routIds}});
			let v_sttnParam = JSON.stringify({dma_search : {ROUT_IDS : v_routIds, NODE_TYPE : 'NT002'}});
			let v_crsParam = JSON.stringify({dma_search : {ROUT_IDS : v_routIds, NODE_TYPE : 'NT001'}});
			$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_param, 'bg0');
			$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_sttnParam, 'bg1');
			$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_crsParam, 'bg2');	//CRS_MST GPS_X, GPS_Y	
			js_sigList = $.jf_ajaxtovar('/mo/MO0101P0R0', 'POST', null); //신호 마커 리스트	
			//$(this).combobox('setValue', 'RT00000048');
			//$(this).combobox('setValue', 'RT00000048');
	    },
	    onLoadError: function(){
	    	return false;
	    },
	    onChange: function(a_newValue, a_oldValue){
			/*if(a_newValue == ''){
				//let v_param = JSON.stringify({dma_search : {ROUT_IDS :  $('#sch_lb0').combobox('getValue')}});
				let v_param = JSON.stringify({dma_search : {ROUT_IDS :  ['RT00000003', 'RT00000004', 'RT00000047', 'RT00000048', 'RT00000049', 'RT00000050', 'RT00000084', 'RT00000085' ]}});
				let v_sttnParam = JSON.stringify({dma_search : {ROUT_IDS :  ['RT00000003', 'RT00000004', 'RT00000047', 'RT00000048', 'RT00000049', 'RT00000050', 'RT00000084', 'RT00000085' ], NODE_TYPE : 'NT002'}});
				let v_crsParam = JSON.stringify({dma_search : {ROUT_IDS :  ['RT00000003', 'RT00000004', 'RT00000047', 'RT00000048', 'RT00000049', 'RT00000050', 'RT00000084', 'RT00000085' ], NODE_TYPE : 'NT001'}});
				$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_param, 'bg0');
				$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_sttnParam, 'bg1');
				$.jf_bgajax('/rout/selectNodeListByRouts', 'POST', v_crsParam, 'bg2');				
			}
			
			else {
				let v_param = JSON.stringify({dma_search : {ROUT_ID :  $('#sch_lb0').combobox('getValue')}});
				let v_sttnParam = JSON.stringify({dma_search : {ROUT_ID :  $('#sch_lb0').combobox('getValue'), NODE_TYPE : 'NT002'}});
				let v_crsParam = JSON.stringify({dma_search : {ROUT_ID :  $('#sch_lb0').combobox('getValue'), NODE_TYPE : 'NT001'}});
				$.jf_bgajax('/rout/selectNodeListByRout', 'POST', v_param, 'bg0');
				$.jf_bgajax('/rout/selectNodeListByRout', 'POST', v_sttnParam, 'bg1');
				$.jf_bgajax('/rout/selectNodeListByRout', 'POST', v_crsParam, 'bg2');
				js_sigList = $.jf_ajaxtovar('/mo/MO0101P0R0', 'POST', null);
			}*/
	    }
	});
});