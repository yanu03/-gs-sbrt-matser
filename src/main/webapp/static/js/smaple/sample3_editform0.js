/** 
작성자 : 양현우
작성일 : 2023-03-31
수정자 : 양현우
수정일 : 2023-03-31
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
			switch (target.id) {
				case "CNG_YN_Y":	//radio sample
				case "CNG_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('CNG_YN', $(target).radiobutton('options').value);
					}
					break;
				case "ELEC_YN_Y":
				case "ELEC_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('ELEC_YN', $(target).radiobutton('options').value);
					}
					break;					
				case "USE_YN_Y":
				case "USE_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
					}	
					break;						
				case "OWNER_TYPE":	//listbox sample
					let a_arrfield = new Array("OWNER_TYPE", "OWNER_TYPE_NAME");
					let a_arrvalue = new Array($('#OWNER_TYPE').textbox('getValue'), $('#OWNER_TYPE').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
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
	$('#fm_panel0').append('<input id="GRG_ID" name="GRG_ID"><p>');
	$('#fm_panel0').append('<input id="GRG_NM" name="GRG_NM"><p>');
	$('#fm_panel0').append('<input id="GRG_ENM" name="GRG_ENM"><p>');
	$('#fm_panel0').append('<input id="OWNER_TYPE" name="OWNER_TYPE"><p>');
	$('#fm_panel0').append('<input id="ADDR" name="ADDR"><p>');
	$('#fm_panel0').append('<input id="PHONE" name="PHONE"><p>');
	$('#fm_panel0').append('<input id="FAX" name="FAX"><p>');
	$('#fm_panel0').append('<input id="EMAIL" name="EMAIL"><p>');
	$('#fm_panel0').append('<input id="CNG_YN_Y" name="CNG_YN">&nbsp;');
	$('#fm_panel0').append('<input id="CNG_YN_N" name="CNG_YN"><p>');
	$('#fm_panel0').append('<input id="ELEC_YN_Y" name="ELEC_YN">&nbsp;');
	$('#fm_panel0').append('<input id="ELEC_YN_N" name="ELEC_YN"><p>');
	$('#fm_panel0').append('<input id="LEGAL_AREA" name="LEGAL_AREA"><p>');
	$('#fm_panel0').append('<input id="SECURE_AREA" name="SECURE_AREA"><p>');
	$('#fm_panel0').append('<input id="GPS_X" name="GPS_X"><p>');
	$('#fm_panel0').append('<input id="GPS_Y" name="GPS_Y"><p>');
	$('#fm_panel0').append('<input id="USE_YN_Y" name="USE_YN">&nbsp;');
	$('#fm_panel0').append('<input id="USE_YN_N" name="USE_YN"><p>');
	$('#fm_panel0').append('<input id="REMARK" name="REMARK"><p>');

	$('#fm_panel0').append('</table>');

	$('#GRG_ID').textbox({
		width: 200,
		maxlength: 20,
		height: 25,
		type: 'text',	//or password
		required: true,
		validType: 'length[0,20]',
		readonly: true,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#GRG_NM').textbox({
		width: 200,
		maxlength: 20,
		height: 25,
		type: 'text',
		required: true,
		validType: 'length[0,20]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#GRG_ENM').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',
		validType: 'maxlength[20]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#OWNER_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: 'datagrid_combodata4.json',
		method: 'get',
		queryParams: {},
		valueField: 'OWNER_TYPE',
		textField: 'OWNER_TYPE_NAME',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	/*
	$('#ADDR').textbox({
		width: 200,
		height: 25,
		type: 'text',
		validType: 'length[0,50]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
*/
	$('#ADDR').searchbox({
		width: 200,
		height: 24,
		prompt: '주소찾기',
		searcher: $.jf_schbox
		});

	$('#PHONE').textbox({
		width: 200,
		height: 25,
		type: 'text',
		validType: 'length[0,15]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#FAX').textbox({
		width: 200,
		height: 25,
		type: 'text',
		validType: 'length[0,15]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#EMAIL').textbox({
		width: 200,
		height: 25,
		type: 'text',
		validType: 'length[0,50]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#CNG_YN_Y').radiobutton({
		value: 'Y',
		label: '예',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#CNG_YN_N').radiobutton({
		value: 'N',
		label: '아니오',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ELEC_YN_Y').radiobutton({
		value: 'Y',
		label: '예',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ELEC_YN_N').radiobutton({
		value: 'N',
		label: '아니오',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#LEGAL_AREA').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 10000,
		// precision: 2,
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#SECURE_AREA').numberbox({
		width: 200,
		height: 25,
		min: 0,
		max: 10000,
		// precision: 2,
		readonly: false,
		value: '',
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
		width: 200,
		height: 25,
		type: 'text',
		validType: 'length[0,60]',
		readonly: false,
		value: '',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

});