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
			// if (!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;

			let a_vals;
			let a_arrfield;
			let a_arrvalue;
			switch (target.id) {
				case "USE_YN_Y":
				case "USE_YN_N":
					if ($(target).radiobutton('options').checked) {
						a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
					}	
					break;						
				case "ROUT_GRP":
					a_arrfield = new Array("ROUT_GRP", "ROUT_GRP_NM");
					a_arrvalue = new Array($('#ROUT_GRP').textbox('getValue'), $('#ROUT_GRP').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "ROUT_TYPE":
					a_arrfield = new Array("ROUT_TYPE", "ROUT_TYPE_NM");
					a_arrvalue = new Array($('#ROUT_TYPE').textbox('getValue'), $('#ROUT_TYPE').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "ROUT_DIV":
					a_arrfield = new Array("ROUT_DIV", "ROUT_DIV_NM");
					a_arrvalue = new Array($('#ROUT_DIV').textbox('getValue'), $('#ROUT_DIV').textbox('getText'));
					a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);
					break;
				case "AREA":
					a_arrfield = new Array("AREA", "AREA_NM");
					a_arrvalue = new Array($('#AREA').textbox('getValue'), $('#AREA').textbox('getText'));
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
	htmlString += '<th><label>노선ID </label></th>';
	htmlString += '<td></td>'; //숫자 주도록해서 append
	htmlString += '<th><label>노선명 </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>노선그룹 </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';
	
	htmlString += '<tr>';
	/*htmlString += '<td><input id="ROUT_GRP" class="tracom-combobox" name="ROUT_GRP"></td>';*/
	htmlString += '<th><label>노선유형  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>노선구분  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>권역  </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';
	
	htmlString += '<tr>';
	htmlString += '<th><label>기점  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>종점  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>회차정류소  </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';
	
	htmlString += '<tr>';
	htmlString += '<th><label>상하행  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>운행횟수  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>배차횟수  </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';
	
	htmlString += '<tr>';
	htmlString += '<th><label>첫차시간(시분)  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>막차시간(시분)  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>운행간격(분)  </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';
	
	htmlString += '<tr>';
	htmlString += '<th><label>사용여부  </label></th>';
	htmlString += '<td></td>';
	htmlString += '<th><label>비고  </label></th>';
	htmlString += '<td></td>';
	//htmlString += '<th><label>미사용  </label></th>';
	//htmlString += '<td></td>';
	htmlString += '</tr>';
	
	/*htmlString += '<tr>';
	htmlString += '<th><label>비고  </label></th>';
	htmlString += '<td></td>';
	htmlString += '</tr>';*/
	
	htmlString += '</table>';
	
	$('#fm_panel0').html(htmlString);
	

	//layout 수정건 07/04 양현우
	//$('#fm_panel0').append('<table>');
	//design
	$('#fm_panel0 table tr:nth-child(1) td:nth-child(2)').append('<input id="ROUT_ID" class="tracom-textbox" name="ROUT_ID">'); //폼이 2개 이상이거나 중복이 우려될 경우
	// $('#fm_panel0').append('<input id="REP_ROUT_ID" name="REP_ROUT_ID">;');
	// $('#fm_panel0').append('<input id="REP_ROUT_NM" name="REP_ROUT_NM">;');
	$('tr:nth-child(1) td:nth-child(4)').append('<td><input id="ROUT_NM" class="tracom-textbox" name="ROUT_NM"></td>;');
	$('tr:nth-child(1) td:nth-child(6)').append('<input id="ROUT_GRP" class="tracom-combobox" name="ROUT_GRP">');
	$('tr:nth-child(2) td:nth-child(2)').append('<input id="ROUT_TYPE" class="tracom-combobox" name="ROUT_TYPE">');
	$('tr:nth-child(2) td:nth-child(4)').append('<input id="ROUT_DIV" class="tracom-combobox" name="ROUT_DIV">');
	$('tr:nth-child(2) td:nth-child(6)').append('<input id="AREA" class="tracom-combobox" name="AREA">');
	// $('#fm_panel0').append('<input id="ST_STTN_ID" name="ST_STTN_ID">;');
	$('tr:nth-child(3) td:nth-child(2)').append('<input id="ST_STTN_ID" class="tracom-textbox" name="ST_STTN_ID">');
	$('tr:nth-child(3) td:nth-child(2)').append('<input id="ST_STTN_NM" class="tracom-textbox" name="ST_STTN_NM">');
	$('tr:nth-child(3) td:nth-child(2)').append('<a id="sch_stSttn_btn" href="#"></a>');
	// $('#fm_panel0').append('<input id="ST_STTN_ENM" name="ST_STTN_ENM">;');
	// $('#fm_panel0').append('<input id="ED_STTN_ID" name="ED_STTN_ID">;');
	$('tr:nth-child(3) td:nth-child(4)').append('<input id="ED_STTN_ID" class="tracom-textbox" name="ED_STTN_ID">');
	$('tr:nth-child(3) td:nth-child(4)').append('<input id="ED_STTN_NM" class="tracom-textbox" name="ED_STTN_NM">');
	$('tr:nth-child(3) td:nth-child(4)').append('<a id="sch_edSttn_btn" href="#"></a>');
	// $('#fm_panel0').append('<input id="ED_STTN_ENM" name="ED_STTN_ENM">;');
	// $('#fm_panel0').append('<input id="RET_STTN_ID" name="RET_STTN_ID">;');
	$('tr:nth-child(3) td:nth-child(6)').append('<input id="RET_STTN_ID" class="tracom-textbox" name="RET_STTN_ID">');
	$('tr:nth-child(3) td:nth-child(6)').append('<input id="RET_STTN_NM" class="tracom-textbox" name="RET_STTN_NM">');
	$('tr:nth-child(3) td:nth-child(6)').append('<a id="sch_retSttn_btn" href="#"></a>');
	// $('#fm_panel0').append('<input id="RET_STTN_ENM" name="RET_STTN_ENM">;');
	$('tr:nth-child(4) td:nth-child(2)').append('<input id="OPER_CNT" class="tracom-numberbox" name="OPER_CNT">');
	$('tr:nth-child(4) td:nth-child(4)').append('<input id="ALLOC_CNT" class="tracom-numberbox" name="ALLOC_CNT">');
	$('tr:nth-child(4) td:nth-child(6)').append('<input id="FST_TM" class="tracom-textbox" name="FST_TM">');
	$('tr:nth-child(5) td:nth-child(2)').append('<input id="LST_TM" class="tracom-textbox" name="LST_TM">');
	$('tr:nth-child(5) td:nth-child(4)').append('<input id="NONE_PEAK" class="tracom-textbox" name="NONE_PEAK">');
	$('tr:nth-child(5) td:nth-child(6)').append('<input id="WAY_DIV" class="tracom-combobox" name="WAY_DIV">');
	$('tr:nth-child(6) td:nth-child(2)').append('<input id="USE_YN_Y" class="tracom-radiobutton" name="USE_YN">예');
	$('tr:nth-child(6) td:nth-child(2)').append('<input id="USE_YN_N" class="tracom-radiobutton" name="USE_YN">아니오');
	$('tr:nth-child(6) td:nth-child(4)').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');


	$('#ROUT_ID').textbox({
		width: 200,
		maxlength: 10,
		height: 25,
		type: 'text',	//or password
		required: true,
		readonly: true,
		value: '',
		//label: '노선ID : ', // layout 수정건 07/04 양현우
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
		//label: '노선그룹 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#ROUT_NM').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: true,
		readonly: false,
		value: '',
		//label: '노선명 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#ROUT_TYPE').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_TYPE"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		//label: '노선유형 : ',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#ROUT_DIV').combobox({
		width: 200,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_DIV"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		//label: '노선구분 : ',
		panelMaxHeight: 100,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

	$('#AREA').combobox({
		width: 230,
		height: 24,
		editable: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "AREA"}}),
		valueField: 'DL_CD',
		textField: 'DL_CD_NM',
		//label: '권역 : ',
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
		//label: '상하행 : ',
		panelMaxHeight: 170,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});
	
    $('#ST_STTN_ID').textbox({
        width: 0,
        height: 0,
        maxlength: 10,
        type:'hidden',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});	

	$('#ST_STTN_NM').textbox({
		width: 200,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		//label: '기점 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
    $('#sch_stSttn_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
    $('#sch_stSttn_btn').bind('click', function(){
        let v_values = {STTN_ID:null, STTN_NM:$('#ST_STTN_NM').textbox('getValue')};
        $.mf_selbustopmdopen(null,$('#ef0'), v_values, $('#ST_STTN_NM'), 'f');
    });

    $('#ED_STTN_ID').textbox({
        width: 0,
        height: 0,
        maxlength: 10,
        type:'hidden',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
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
		//label: '종점 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
    $('#sch_edSttn_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
    $('#sch_edSttn_btn').bind('click', function(){
        let v_values = {STTN_ID:null, STTN_NM:$('#ED_STTN_NM').textbox('getValue')};
        $.mf_selbustopmdopen(null,$('#ef0'), v_values, $('#ED_STTN_NM'), 'f');
    });	
	
    $('#RET_STTN_ID').textbox({
        width: 0,
        height: 0,
        maxlength: 10,
        type:'hidden',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});		

	$('#RET_STTN_NM').textbox({
		width: 200,
		maxlength: 30,
		labelWidth: 100,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		//label: '회차정류소 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});
	
    $('#sch_retSttn_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
	
    $('#sch_retSttn_btn').bind('click', function(){
        let v_values = {STTN_ID:null, STTN_NM:$('#RET_STTN_NM').textbox('getValue')};
        $.mf_selbustopmdopen(null,$('#ef0'), v_values, $('#RET_STTN_NM'), 'f');
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
		//label: '운행횟수 : ',
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
		//label: '배차횟수 : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#FST_TM').textbox({
		width: 200,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		//label: '첫차시간(시분) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#LST_TM').textbox({
		width: 200,
		labelWidth: 150,
		maxlength: 5,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		//label: '막차시간(시분) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#NONE_PEAK').textbox({
		width: 200,
		labelWidth: 100,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		//label: '운행간격(분) : ',
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

	$('#USE_YN_Y').radiobutton({
		value: 'Y',
		//label: '사용',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		checked: true,
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

	$('#USE_YN_N').radiobutton({
		value: 'N',
		//label: '미사용',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
		onChange: function (checked) {
			if (!jv_rowclick) return false;
			if(checked == true){
				if(!$.jf_checkforeigntable($.jf_curdgrow($('#dg0')),"SI0401", function(){})) {
					$('#USE_YN_Y').radiobutton('check');
				}
			}
		}
	});

	$('#REMARK').textbox({
		width: 500,
		height: 50,
		type: 'text',
		maxlength: 200,
		readonly: false,
		value: '',
		//label: '비고 :',
		multiline:true,
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

});