/** 
작성자 : 양현우
작성일 : 2023-05-08
수정자 : 양현우
수정일 : 2023-05-08
**/
$(function () {

	$('#ef0').form({
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
				case "DAY_DIV":
					a_arrfield = new Array("DAY_DIV", "DAY_DIV_NM");
					a_arrvalue = new Array($('#DAY_DIV').textbox('getValue'), $('#DAY_DIV').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "WAY_DIV":
					a_arrfield = new Array("WAY_DIV", "WAY_DIV_NM");
					a_arrvalue = new Array($('#WAY_DIV').textbox('getValue'), $('#WAY_DIV').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "ROUT_GRP":
					a_arrfield = new Array("ROUT_GRP", "ROUT_GRP_NM");
					a_arrvalue = new Array($('#ROUT_GRP').textbox('getValue'), $('#ROUT_GRP').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				default:
					if (!$(target).textbox('isValid')) { $(target).textbox('clear'); break; }
					a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
					break;
			}
			$.jf_synctogrid($('#dg0'), a_vals);
			return true;
		}
	});





	$('#fm_panel0').append('<table>');
	//design
	$('#fm_panel0').append('<input id="ALLOC_ID" class="tracom-textbox" name="ALLOC_ID">&nbsp;');
	$('#fm_panel0').append('<input id="ALLOC_NM" class="tracom-textbox" name="ALLOC_NM">&nbsp;');
	$('#fm_panel0').append('<input id="ROUT_GRP" class="tracom-combobox" name="ROUT_GRP">&nbsp;');
	$('#fm_panel0').append('<input id="DAY_DIV" class="tracom-combobox" name="DAY_DIV">&nbsp;');
	$('#fm_panel0').append('<input id="WAY_DIV" class="tracom-combobox" name="WAY_DIV">&nbsp;');
	$('#fm_panel0').append('<input id="OPER_CNT" class="tracom-numberbox" name="OPER_CNT">&nbsp;');
	$('#fm_panel0').append('<input id="ALLOC_CNT" class="tracom-numberbox" name="ALLOC_CNT">&nbsp;');
	$('#fm_panel0').append('<input id="FST_TM" class="tracom-textbox" name="FST_TM">&nbsp;');
	$('#fm_panel0').append('<input id="LST_TM" class="tracom-textbox" name="LST_TM">&nbsp;');
	$('#fm_panel0').append('<input id="AM_PEAK_ST_TM" class="tracom-textbox" name="AM_PEAK_ST_TM">&nbsp;');
	$('#fm_panel0').append('<input id="AM_PEAK_ED_TM" class="tracom-textbox" name="AM_PEAK_ED_TM">&nbsp;');
	$('#fm_panel0').append('<input id="PM_PEAK_ST_TM" class="tracom-textbox" name="PM_PEAK_ST_TM">&nbsp;');
	$('#fm_panel0').append('<input id="PM_PEAK_ED_TM" class="tracom-textbox" name="PM_PEAK_ED_TM">&nbsp;');
	$('#fm_panel0').append('<input id="AM_PEAK" class="tracom-textbox" name="AM_PEAK">&nbsp;');
	$('#fm_panel0').append('<input id="PM_PEAK" class="tracom-textbox" name="PM_PEAK">&nbsp;');
	$('#fm_panel0').append('<input id="NONE_PEAK" class="tracom-textbox" name="NONE_PEAK">&nbsp;');
	$('#fm_panel0').append('<input id="REMARK" class="tracom-textbox" name="REMARK"><p>');

	$('#fm_panel0').append('</table>');

	$('#ALLOC_ID').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',	//or password
		required: true,
		readonly: true,
		value: '',
		label: '배차ID : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ALLOC_NM').textbox({
		width: 200,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		label: '배차명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ROUT_GRP').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_GRP"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '노선그룹 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	var js_onChange = false;    //사람이 아닌 기계가 발생시킨 onChange

	$('#DAY_DIV').combobox({
		width: 200,
		height: 24,
		panelHeight:80,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_DIV"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '요일구분 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
		onChange: function(newValue, oldValue) {
			if(js_onChange) return false;
			// v_row = {ALLOC_ID : js_allocId, DAY_DIV : newValue, WAY_DIV : js_wayDiv};
			// $.jf_childretrieve($('#dg1'), v_row);
			if($.jf_datalength($('#dg1')) > 0 && jv_rowclick){
				$.tracomalmsg('정보', '하위 데이터를 모두 삭제해야 합니다.', null);
				js_onChange = true;
				$(this).combobox('setValue', oldValue);
				js_onChange = false;
			}
		}
	});

	$('#WAY_DIV').combobox({
		width: 200,
		height: 24,
		panelHeight:170,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "WAY_DIV"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '상하행 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
		loadFilter: function(data) {
			var allItem = {};
			allItem['DL_CD'] = ''; // 사용할 수 있는 고유한 값
			allItem['DL_CD_NM'] = '모두'; // 표시되는 텍스트

			// 새 항목을 데이터 배열의 처음에 추가
			data.unshift(allItem);
			return data;
		},
		onChange: function(newValue, oldValue) {
			if(js_onChange) return false;
			// v_row = {ALLOC_ID : js_allocId, DAY_DIV : js_dayDiv, WAY_DIV : newValue};
			// $.jf_childretrieve($('#dg1'), v_row);
			if($.jf_datalength($('#dg1')) > 0 && jv_rowclick){
				$.tracomalmsg('정보', '하위 데이터를 모두 삭제해야 합니다.', null);
				js_onChange = true;
				$(this).combobox('setValue', oldValue);
				js_onChange = false;
			}
		}
	});

	$('#OPER_CNT').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 99999,
		labelWidth: 100, 
		precision: 0,
		readonly: false,
		value: '',
		label: '운행횟수 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ALLOC_CNT').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 99999,
		labelWidth: 100, 
		precision: 0,
		readonly: false,
		value: '',
		label: '배차횟수 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#FST_TM').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '첫차시간(시분) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#LST_TM').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '막차시간(시분) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#AM_PEAK_ST_TM').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '오전첨두시작시간 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#AM_PEAK_ED_TM').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '오전첨두종료시간 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#PM_PEAK_ST_TM').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '오전첨두시작시간 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#PM_PEAK_ED_TM').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '오전첨두종료시간 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#AM_PEAK').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '오후첨두시배차간격 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#PM_PEAK').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '오후첨두시배차간격 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#NONE_PEAK').textbox({
		width: 250,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		label: '비첨두시배차간격 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#REMARK').textbox({
		width: 500,
		height: 50,
		type: 'text',
		maxlength: 200,
		readonly: false,
		value: '',
		label: '비고 :',
		multiline:true,
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

});