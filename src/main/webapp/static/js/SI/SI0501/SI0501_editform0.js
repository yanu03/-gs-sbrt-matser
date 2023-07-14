/** 
작성자 : 양현우
작성일 : 2023-04-05
수정자 : 양현우
수정일 : 2023-04-05

수정자 : 박원용
수정일 : 2023.07.14
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

	let htmlString = '<table>';

	//design
	htmlString += '<tr>';
	htmlString += '<th><label>정류소ID </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>정류소명 </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>권역 </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>정류소번호 </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>경도(X) </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>위도(Y) </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>정류소시설유형 </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>버스문방향 </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>상하행</label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>베이유형 </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>베이길이 </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>차선수</label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>첨두시 정차시간(초)  </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>비첨두시 정차시간(초)  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>중앙차로여부</label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>사용여부  </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>비고  </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

  htmlString += '</table>';

  $('#fm_panel0').html(htmlString);

	// $('#fm_panel0').append('<table>');
	//design
	$('tr:nth-child(1) td:nth-child(2)').append('<input id="STTN_ID" class="tracom-textbox" name="STTN_ID">');
	$('tr:nth-child(1) td:nth-child(4)').append('<input id="STTN_NM" class="tracom-textbox" name="STTN_NM">');
	$('tr:nth-child(1) td:nth-child(6)').append('<input id="AREA" class="tracom-combobox" name="AREA">');

	$('tr:nth-child(2) td:nth-child(2)').append('<input id="STTN_NO" class="tracom-textbox" name="STTN_NO">');
	$('tr:nth-child(2) td:nth-child(4)').append('<input id="GPS_Y" class="tracom-numberbox" name="GPS_Y">');
	$('tr:nth-child(2) td:nth-child(6)').append('<input id="GPS_X" class="tracom-numberbox" name="GPS_X">');

	$('tr:nth-child(3) td:nth-child(2)').append('<input id="STTN_FCLT_TYPE" class="tracom-combobox" name="STTN_FCLT_TYPE">');
	$('tr:nth-child(3) td:nth-child(4)').append('<input id="VHC_DOOR_DIR_TYPE" class="tracom-combobox" name="VHC_DOOR_DIR_TYPE">');
	$('tr:nth-child(3) td:nth-child(6)').append('<input id="WAY_DIV" class="tracom-combobox" name="WAY_DIV">');

	$('tr:nth-child(4) td:nth-child(2)').append('<input id="BAY_TYPE" class="tracom-combobox" name="BAY_TYPE">');
	$('tr:nth-child(4) td:nth-child(4)').append('<input id="BAY_LEN" class="tracom-numberbox" name="BAY_LEN">');
	$('tr:nth-child(4) td:nth-child(6)').append('<input id="LINE_CNT" class="tracom-numberbox" name="LINE_CNT">');

	$('tr:nth-child(5) td:nth-child(2)').append('<input id="STOP_TM_PEAK" class="tracom-numberbox" name="STOP_TM_PEAK">');
	$('tr:nth-child(5) td:nth-child(4)').append('<input id="STOP_TM_NONE_PEAK" class="tracom-numberbox" name="STOP_TM_NONE_PEAK">');
	$('tr:nth-child(5) td:nth-child(6)').append('<input id="CENTER_YN_Y" class="tracom-radiobutton" name="CENTER_YN">');
	$('tr:nth-child(5) td:nth-child(6)').append('<input id="CENTER_YN_N" class="tracom-radiobutton" name="CENTER_YN">');

	$('tr:nth-child(6) td:nth-child(2)').append('<input id="USE_YN_Y" class="tracom-radiobutton" name="USE_YN">');
	$('tr:nth-child(6) td:nth-child(2)').append('<input id="USE_YN_N" class="tracom-radiobutton" name="USE_YN">');
	$('tr:nth-child(6) td:nth-child(4)').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');

	// $('#fm_panel0').append('</table>');

	$('#STTN_ID').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',	//or password
		required: true,
		validType: 'length[0,20]',
		readonly: true,
		value: '',
		// label: '정류소ID : ',
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
		// label: '정류소명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#AREA').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "AREA"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '권역 : ',
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
		// label: '정류소번호 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#STTN_FCLT_TYPE').combobox({
		width: 250,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "STTN_FCLT_TYPE"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '정류소시설유형 : ',
		// labelWidth: 120,
		panelMaxHeight: 170,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#VHC_DOOR_DIR_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "VHC_DOOR_DIR_TYPE"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '버스문방향 : ',
		// labelWidth: 100,
		panelMaxHeight: 100,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#WAY_DIV').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "WAY_DIV"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '상하행 : ',
		panelMaxHeight: 170,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});	

	$('#BAY_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "BAY_TYPE"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '베이유형 : ',
		panelMaxHeight: 200,
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
		// label: '베이길이(m) : ',
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
		// label: '차선수 : ',
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
		// label: '첨두시 정차시간(초) : ',
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
		// label: '비첨두시 정차시간(초) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#GPS_X').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 1000,
		precision: 6,
		readonly: false,
		value: '',
		// label: '경도 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#GPS_Y').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 1000,
		precision: 6,
		readonly: false,
		value: '',
		// label: '위도 : ',
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
		width: 350,
		height: 50,
		type: 'text',
		maxlength: 200,
		readonly: false,
		value: '',
		// label: '비고 :',
		multiline:true,
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

});
