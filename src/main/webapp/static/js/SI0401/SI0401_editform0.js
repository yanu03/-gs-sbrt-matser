/** 
작성자 : 양현우
작성일 : 2023-04-07
수정자 : 양현우
수정일 : 2023-04-07
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
			if (!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;

			let a_vals;
			let a_arrfield;
			let a_arrvalue;
			switch (target.id) {
				case "MAIN_CRS_YN_Y":	//radio sample
				case "MAIN_CRS_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('MAIN_CRS_YN', $(target).radiobutton('options').value);
					}
					break;
				case "PDSTRN_DET_YN_Y":
				case "PDSTRN_DET_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('PDSTRN_DET_YN', $(target).radiobutton('options').value);
					}
					break;
				case "USE_YN_Y":
				case "USE_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
					}	
					break;						
				case "CRS_KIND":
					a_arrfield = new Array("CRS_KIND", "CRS_KIND_NM");
					a_arrvalue = new Array($('#CRS_KIND').textbox('getValue'), $('#CRS_KIND').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "SIG_CTR_TYPE":
					a_arrfield = new Array("SIG_CTR_TYPE", "SIG_CTR_TYPE_NM");
					a_arrvalue = new Array($('#SIG_CTR_TYPE').textbox('getValue'), $('#SIG_CTR_TYPE').textbox('getText'));
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
	$('#fm_panel0').append('<input id="ROUT_ID" name="ROUT_ID">&nbsp;');
	// $('#fm_panel0').append('<input id="REP_ROUT_ID" name="REP_ROUT_ID">&nbsp;');
	$('#fm_panel0').append('<input id="REP_ROUT_NM" name="REP_ROUT_NM">&nbsp;');
	$('#fm_panel0').append('<input id="ROUT_NM" name="ROUT_NM">&nbsp;');
	$('#fm_panel0').append('<input id="ROUT_TYPE" name="ROUT_TYPE">&nbsp;');
	$('#fm_panel0').append('<input id="ROUT_DIV" name="ROUT_DIV">&nbsp;');
	// $('#fm_panel0').append('<input id="ST_STTN_ID" name="ST_STTN_ID">&nbsp;');
	$('#fm_panel0').append('<input id="ST_STTN_NM" name="ST_STTN_NM">&nbsp;');
	// $('#fm_panel0').append('<input id="ST_STTN_ENM" name="ST_STTN_ENM">&nbsp;');
	// $('#fm_panel0').append('<input id="ED_STTN_ID" name="ED_STTN_ID">&nbsp;');
	$('#fm_panel0').append('<input id="ED_STTN_NM" name="ED_STTN_NM"><p>');
	// $('#fm_panel0').append('<input id="ED_STTN_ENM" name="ED_STTN_ENM">&nbsp;');
	// $('#fm_panel0').append('<input id="RET_STTN_ID" name="RET_STTN_ID">&nbsp;');
	$('#fm_panel0').append('<input id="RET_STTN_NM" name="RET_STTN_NM">&nbsp;');
	// $('#fm_panel0').append('<input id="RET_STTN_ENM" name="RET_STTN_ENM">&nbsp;');
	$('#fm_panel0').append('<input id="OPER_CNT" name="OPER_CNT">&nbsp;');
	$('#fm_panel0').append('<input id="ALLOC_CNT" name="ALLOC_CNT">&nbsp;');
	$('#fm_panel0').append('<input id="FST_TM" name="FST_TM">&nbsp;');
	$('#fm_panel0').append('<input id="LST_TM" name="LST_TM">&nbsp;');
	$('#fm_panel0').append('<input id="NONE_PEAK" name="NONE_PEAK">&nbsp;');
	$('#fm_panel0').append('<input id="WAY_DIV" name="WAY_DIV"><p>');
	$('#fm_panel0').append('<input id="USE_YN_Y" name="USE_YN">&nbsp;');
	$('#fm_panel0').append('<input id="USE_YN_N" name="USE_YN"><p>');
	$('#fm_panel0').append('<input id="REMARK" name="REMARK"><p>');

	$('#fm_panel0').append('</table>');

	$('#ROUT_ID').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',	//or password
		required: true,
		readonly: true,
		value: '',
		label: '노선ID : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#REP_ROUT_NM').combobox({
		width: 200,
		height: 24,
		editable: true,
		//url: 'SI0503_commonDtlCRS_KIND.json', 미완성
		method: 'get',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '그룹노선 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#ROUT_NM').textbox({
		width: 200,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		label: '노선명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ROUT_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		//url: 'SI0503_commonDtlSIG_CTR_TYPE.json', 미완성
		method: 'post',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '노선유형 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#ROUT_DIV').combobox({
		width: 200,
		height: 24,
		editable: true,
		//url: 'SI0503_commonDtlSIG_CTR_TYPE.json', 미완성
		method: 'post',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '노선구분 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#AREA').combobox({
		width: 200,
		height: 24,
		editable: true,
		//url: 'SI0503_commonDtlSIG_CTR_TYPE.json', 미완성
		method: 'post',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '권역 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#WAY_DIV').combobox({
		width: 200,
		height: 24,
		editable: true,
		//url: 'SI0503_commonDtlSIG_CTR_TYPE.json', 미완성
		method: 'post',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '상하행 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#ST_STTN_NM').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '기점 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ED_STTN_NM').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '종점 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#RET_STTN_NM').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '회차정류소 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
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
		width: 200,
		maxlength: 30,
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
		width: 200,
		maxlength: 30,
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

	$('#NONE_PEAK').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		label: '운행간격(분) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#USE_YN_Y').radiobutton({
		value: 'Y',
		label: '사용',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#USE_YN_N').radiobutton({
		value: 'N',
		label: '미사용',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
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