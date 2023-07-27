/** 
작성자 : 양현우
작성일 : 2023-04-06
수정자 : 양현우
수정일 : 2023-04-06
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

	let htmlString = '<table>';

	//design
	htmlString += '<tr>';
	htmlString += '<th><label>교차로ID </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>교차로명 </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>교차로종류 </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>신호제어기 유형 </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>경도(X) </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>위도(Y) </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>주요교차로 여부 </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>보행자감지 여부 </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>사용 여부 </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '<tr>';
	htmlString += '<th><label>비고 </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';

	htmlString += '</table>';

	$('#fm_panel0').html(htmlString);

	// $('#fm_panel0').append('<table>');
	//design
	$('tr:nth-child(1) td:nth-child(2)').append('<input id="CRS_ID" class="tracom-textbox" name="CRS_ID">');
	$('tr:nth-child(1) td:nth-child(4)').append('<input id="CRS_NM" class="tracom-textbox" name="CRS_NM">');
	$('tr:nth-child(1) td:nth-child(6)').append('<input id="CRS_KIND" class="tracom-combobox" name="CRS_KIND">');
	$('tr:nth-child(2) td:nth-child(2)').append('<input id="SIG_CTR_TYPE" class="tracom-combobox" name="SIG_CTR_TYPE">');
	$('tr:nth-child(2) td:nth-child(4)').append('<input id="GPS_Y" class="tracom-numberbox" name="GPS_Y">');
	$('tr:nth-child(2) td:nth-child(6)').append('<input id="GPS_X" class="tracom-numberbox" name="GPS_X">');
	$('tr:nth-child(3) td:nth-child(2)').append('<input id="MAIN_CRS_YN_Y" class="tracom-radiobutton" name="MAIN_CRS_YN">');
	$('tr:nth-child(3) td:nth-child(2)').append('<input id="MAIN_CRS_YN_N" class="tracom-radiobutton" name="MAIN_CRS_YN">');
	$('tr:nth-child(3) td:nth-child(4)').append('<input id="PDSTRN_DET_YN_Y" class="tracom-radiobutton" name="PDSTRN_DET_YN">');
	$('tr:nth-child(3) td:nth-child(4)').append('<input id="PDSTRN_DET_YN_N" class="tracom-radiobutton" name="PDSTRN_DET_YN">');
	$('tr:nth-child(3) td:nth-child(6)').append('<input id="USE_YN_Y" class="tracom-radiobutton" name="USE_YN">');
	$('tr:nth-child(3) td:nth-child(6)').append('<input id="USE_YN_N" class="tracom-radiobutton" name="USE_YN">');
	$('tr:nth-child(4) td:nth-child(2)').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');

	// $('#fm_panel0').append('</table>');

	$('#CRS_ID').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',	//or password
		required: true,
		readonly: true,
		value: '',
		// label: '교차로ID : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#CRS_NM').textbox({
		width: 250,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		// label: '교차로명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#CRS_KIND').combobox({
		width: 250,
		labelWidth: 100,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "CRS_KIND"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '교차로종류 : ',
		panelMaxHeight: 230,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#SIG_CTR_TYPE').combobox({
		width: 300,
		labelWidth: 150,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "SIG_CTR_TYPE"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		// label: '신호제어기유형 : ',
		panelMaxHeight: 70,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
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

	$('#MAIN_CRS_YN_Y').radiobutton({
		value: 'Y',
		label: '예',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#MAIN_CRS_YN_N').radiobutton({
		value: 'N',
		label: '아니오',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});
	
	$('#PDSTRN_DET_YN_Y').radiobutton({
		value: 'Y',
		label: '예',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#PDSTRN_DET_YN_N').radiobutton({
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
			if(checked == true){
				$.jf_checkforeigntable($.jf_curdgrow($('#dg0')),"SI0503", function(a_type){
						if(a_type == "Y"){
								$('#USE_YN_Y').radiobutton('check');
						}
				});
			}
		}
	});

	$('#REMARK').textbox({
		width: 350,
		height: 50,
		type: 'text',
		maxlength: 200,
		readonly: false,
		// value: '',
		// label: '비고 :',
		multiline:true,
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

});
