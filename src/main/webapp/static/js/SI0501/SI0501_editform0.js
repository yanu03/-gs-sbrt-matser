/** 
작성자 : 양현우
작성일 : 2023-04-05
수정자 : 양현우
수정일 : 2023-04-05
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
				case "CENTER_YN_Y":	//radio sample
				case "CENTER_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('CENTER_YN', $(target).radiobutton('options').value);
					}
					break;
				case "USE_YN_Y":
				case "USE_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
					}	
					break;						
				case "AREA":
					a_arrfield = new Array("AREA", "AREA_NM");
					a_arrvalue = new Array($('#AREA').textbox('getValue'), $('#AREA').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "STTN_FCLT_TYPE":
					a_arrfield = new Array("STTN_FCLT_TYPE", "STTN_FCLT_TYPE_NM");
					a_arrvalue = new Array($('#STTN_FCLT_TYPE').textbox('getValue'), $('#STTN_FCLT_TYPE').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "VHC_DOOR_DIR_TYPE":
					a_arrfield = new Array("VHC_DOOR_DIR_TYPE", "VHC_DOOR_DIR_TYPE_NM");
					a_arrvalue = new Array($('#VHC_DOOR_DIR_TYPE').textbox('getValue'), $('#VHC_DOOR_DIR_TYPE').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "WAY_DIV":
					a_arrfield = new Array("WAY_DIV", "WAY_DIV_NM");
					a_arrvalue = new Array($('#WAY_DIV').textbox('getValue'), $('#WAY_DIV').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "BAY_TYPE":
					a_arrfield = new Array("BAY_TYPE", "BAY_TYPE_NM");
					a_arrvalue = new Array($('#BAY_TYPE').textbox('getValue'), $('#BAY_TYPE').textbox('getText'));
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
	$('#fm_panel0').append('<input id="STTN_ID" name="STTN_ID">&nbsp;');
	$('#fm_panel0').append('<input id="STTN_NM" name="STTN_NM">&nbsp;');
	$('#fm_panel0').append('<input id="AREA" name="AREA">&nbsp;');
	$('#fm_panel0').append('<input id="STTN_NO" name="STTN_NO">&nbsp;');
	$('#fm_panel0').append('<input id="GPS_X" name="GPS_X">&nbsp;');
	$('#fm_panel0').append('<input id="GPS_Y" name="GPS_Y">&nbsp;');
	$('#fm_panel0').append('<input id="STTN_FCLT_TYPE" name="STTN_FCLT_TYPE">&nbsp;');
	$('#fm_panel0').append('<input id="VHC_DOOR_DIR_TYPE" name="VHC_DOOR_DIR_TYPE">&nbsp;');
	$('#fm_panel0').append('<input id="WAY_DIV" name="WAY_DIV">&nbsp;');
	$('#fm_panel0').append('<input id="BAY_TYPE" name="BAY_TYPE">&nbsp;');
	$('#fm_panel0').append('<input id="BAY_LEN" name="BAY_LEN"><p>');
	$('#fm_panel0').append('<input id="LINE_CNT" name="LINE_CNT">&nbsp;');
	$('#fm_panel0').append('<input id="STOP_TM_PEAK" name="STOP_TM_PEAK">&nbsp;');
	$('#fm_panel0').append('<input id="STOP_TM_NONE_PEAK" name="STOP_TM_NONE_PEAK"><p>');
	$('#fm_panel0').append('<input id="CENTER_YN_Y" name="CENTER_YN">&nbsp;');
	$('#fm_panel0').append('<input id="CENTER_YN_N" name="CENTER_YN">&nbsp;');
	$('#fm_panel0').append('<input id="USE_YN_Y" name="USE_YN">&nbsp;');
	$('#fm_panel0').append('<input id="USE_YN_N" name="USE_YN"><p>');
	$('#fm_panel0').append('<input id="REMARK" name="REMARK"><p>');

	$('#fm_panel0').append('</table>');

	$('#STTN_ID').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',	//or password
		required: true,
		validType: 'length[0,20]',
		readonly: true,
		value: '',
		label: '정류소ID : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#STTN_NM').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		label: '정류소명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#AREA').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: 'SI0501_commonDtlArea.json',
		method: 'get',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '권역 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#STTN_NO').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 99999,
		labelWidth: 100, 
		precision: 0,
		readonly: false,
		value: '',
		label: '정류소번호 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#STTN_FCLT_TYPE').combobox({
		width: 250,
		height: 24,
		editable: true,
		url: 'SI0501_commonDtlSTTN_FCLT_TYPE.json',
		method: 'get',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '정류소시설유형 : ',
		labelWidth: 120,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#VHC_DOOR_DIR_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: 'SI0501_commonDtlVHC_DOOR_DIR_TYPE.json',
		method: 'get',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '버스문방향 : ',
		labelWidth: 100,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#WAY_DIV').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: 'SI0501_commonDtlWAY_DIV.json',
		method: 'get',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '상하행 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#BAY_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: 'SI0501_commonDtlBAY_TYPE.json',
		method: 'get',
		queryParams: {},
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		label: '베이유형 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#BAY_LEN').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 99999,
		labelWidth: 100, 
		precision: 0,
		readonly: false,
		value: '',
		label: '베이길이(m) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	
	$('#LINE_CNT').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 9,
		precision: 0,
		readonly: false,
		value: '',
		label: '차선수 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#STOP_TM_PEAK').numberbox({
		width: 300,
		height: 25,
		min: 0,
		max: 999,
		labelWidth: 150, 
		precision: 0,
		readonly: false,
		value: '',
		label: '첨두시 정차시간(초) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#STOP_TM_NONE_PEAK').numberbox({
		width: 300,
		height: 25,
		min: 0,
		max: 999,
		labelWidth: 160, 
		precision: 0,
		readonly: false,
		value: '',
		label: '비첨두시 정차시간(초) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#GPS_X').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 1000,
		precision: 2,
		readonly: false,
		value: '',
		label: '경도 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#GPS_Y').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 1000,
		precision: 2,
		readonly: false,
		value: '',
		label: '위도 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#CENTER_YN_Y').radiobutton({
		value: 'Y',
		label: '예',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#CENTER_YN_N').radiobutton({
		value: 'N',
		label: '아니오',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
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