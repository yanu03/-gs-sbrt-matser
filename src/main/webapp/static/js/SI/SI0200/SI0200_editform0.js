/**
 * 프로그램명 : 차량관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.12
 * 
 * 수정자 : 박원용
 * 수정일 : 2023.04.17
 * 
 * 수정자 : 박원용
 * 수정일 : 2023.07.13
 */
$(function(){
	$('#ef0').form({
        onSubmit: function(param){},
        success:function(data){},
        onProgress: function(percent){},
        onBeforeLoad: function(param){},
        onLoadSuccess: function(data){},
        onLoadError: function(){},
        onChange: function(target){
            if(!jv_rowclick) return false;
            //if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;

            let a_vals;
            let a_arrfield;
            let a_arrvalue;
            switch(target.id){
                case "USE_YN_Y":	//radio sample
                case "USE_YN_N":
                    if($(target).radiobutton('options').checked){
                        a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
                    } 
                    break;
                case "AREA":	//listbox sample
                    a_arrfield = new Array("AREA", "AREA_NM");
                    a_arrvalue = new Array($('#AREA').textbox('getValue'), $('#AREA').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "MAKER":	//listbox sample
                    a_arrfield = new Array("MAKER", "MAKER_NM");
                    a_arrvalue = new Array($('#MAKER').textbox('getValue'), $('#MAKER').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "ROUT_TYPE":	//listbox sample
                    a_arrfield = new Array("ROUT_TYPE", "ROUT_TYPE_NM");
                    a_arrvalue = new Array($('#ROUT_TYPE').textbox('getValue'), $('#ROUT_TYPE').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "VHC_TYPE":	//listbox sample
                    a_arrfield = new Array("VHC_TYPE", "VHC_TYPE_NM");
                    a_arrvalue = new Array($('#VHC_TYPE').textbox('getValue'), $('#VHC_TYPE').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "VHC_KIND":	//listbox sample
                    a_arrfield = new Array("VHC_KIND", "VHC_KIND_NM");
                    a_arrvalue = new Array($('#VHC_KIND').textbox('getValue'), $('#VHC_KIND').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "VHC_FUEL":	//listbox sample
                    a_arrfield = new Array("VHC_FUEL", "VHC_FUEL_NM");
                    a_arrvalue = new Array($('#VHC_FUEL').textbox('getValue'), $('#VHC_FUEL').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                default:
                    if(!$(target).textbox('isValid')){$(target).textbox('clear'); break;}
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
    htmlString += '<th><label>차량ID </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>차량번호 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>운수사명 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>권역 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>차대번호 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>제조사 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>출고일자 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>모델명 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>노선유형</label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>차량유형 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>차량종류 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>차량연료</label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>승차인원</label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>사용여부 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>비고  </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '</table>';

    $('#fm_panel0').html(htmlString);

	// $('#fm_panel0').append('<table>');
	//design
	$('tr:nth-child(1) td:nth-child(2)').append('<input id="VHC_ID" class="tracom-textbox" name="VHC_ID">');
    $('tr:nth-child(1) td:nth-child(4)').append('<input id="VHC_NO" class="tracom-textbox" name="VHC_NO">');
	$('tr:nth-child(1) td:nth-child(6)').append('<input id="COMP_NM" class="tracom-textbox" name="COMP_NM">');
    $('tr:nth-child(1) td:nth-child(6)').append('<a id="sch_comp_btn" href="#"></a>');
    $('tr:nth-child(1) td:nth-child(6)').append('<input id="COMP_ID" class="tracom-textbox" name="COMP_ID">');// hidden

    $('tr:nth-child(2) td:nth-child(2)').append('<input id="AREA" class="tracom-combobox" name="AREA">');
    $('tr:nth-child(2) td:nth-child(4)').append('<input id="CHAS_NO" class="tracom-textbox" name="CHAS_NO">');
    $('tr:nth-child(2) td:nth-child(6)').append('<input id="MAKER" class="tracom-combobox" name="MAKER">');

    $('tr:nth-child(3) td:nth-child(2)').append('<input id="RELS_DT" class="tracom-textbox" name="RELS_DT">');
    $('tr:nth-child(3) td:nth-child(4)').append('<input id="MODEL_NM" class="tracom-textbox" name="MODEL_NM">');
    $('tr:nth-child(3) td:nth-child(6)').append('<input id="ROUT_TYPE" class="tracom-combobox" name="ROUT_TYPE">');

    $('tr:nth-child(4) td:nth-child(2)').append('<input id="VHC_TYPE" class="tracom-combobox" name="VHC_TYPE">');
    $('tr:nth-child(4) td:nth-child(4)').append('<input id="VHC_KIND" class="tracom-combobox" name="VHC_KIND">');
    $('tr:nth-child(4) td:nth-child(6)').append('<input id="VHC_FUEL" class="tracom-combobox" name="VHC_FUEL">');

    $('tr:nth-child(5) td:nth-child(2)').append('<input id="PSG_CNT" class="tracom-numberspinner" name="PSG_CNT">');
    $('tr:nth-child(5) td:nth-child(4)').append('<input id="USE_YN_Y" class="tracom-radiobutton" name="USE_YN">');
    $('tr:nth-child(5) td:nth-child(4)').append('<input id="USE_YN_N" class="tracom-radiobutton" name="USE_YN">');
    $('tr:nth-child(5) td:nth-child(6)').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');
	
	// $('#fm_panel0').append('</table>');
    
	$('#VHC_ID').textbox({
        width: 200,
        height: 25,
        type:'text',	//or password
        required: true,
        maxlength: 10,
        readonly: true,
        value:'',
        // label:'차량 ID',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
	$('#VHC_NO').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: true,
        maxlength: 9,
        readonly: false,
        value:'',
        // label:'차량번호',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
    // hidden으로 넣어서 팝업창에서 value 받아주기
    $('#COMP_ID').textbox({
        width: 0,
        height: 0,
        maxlength: 10,
        type:'hidden',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
    $('#COMP_NM').textbox({
        width: 250,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        readonly: true,
        value:'',
        // label:'운수사명',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        },
	}); 
    $('#sch_comp_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
    $('#sch_comp_btn').bind('click', function(){
        let v_values = {VHC_ID:$('#VHC_ID').textbox('getValue'),COMP_ID:"", COMP_NM:$('#COMP_NM').textbox('getValue'), AREA:""};
        $.mf_selcompmdopen(null,$('#ef0'), v_values, $('#CHAS_NO'), 'f');
    });

    $('#AREA').combobox({
        width: 180,
		height: 24,
		editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "AREA"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
		value: '',				//dg0과 일치 시키면 편하다
        // label:'권역',
        // labelWidth: 40,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 400,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
		onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#AREA').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
		}
    });

    $('#CHAS_NO').textbox({
        width: 260,
        height: 25,
        type:'text',
        required: false,
        maxlength: 17,
        readonly: false,
        value:'',
        // label:'차대번호',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });

    $('#MAKER').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "MAKER"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'제조사',
        // labelWidth: 60,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 100,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#MAKER').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
			//자동 조회시 여기서 코딩
            if(!jv_rowclick) return false;
		}
    });
    $('#RELS_DT').datebox({
        width: 200,
        height: 25,
        editable: false,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        // label: '출고일자',
        // labelWidth: 65,
        // labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#MODEL_NM').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: false,
        maxlength: 30,
        readonly: false,
        value:'',
        // label:'모델명',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#ROUT_TYPE').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_TYPE"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'노선유형',
        // labelWidth: 70,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 200,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onBeforeLoad: function(param){$(this).combo('readonly', true);
        },
		onLoadSuccess: function(){$(this).combo('readonly', false);
        },
		onLoadError: function(){$('#MAKER').combo('readonly', true);return false;
		},
		onChange: function(newValue,oldValue){if(!jv_rowclick) return false;
		}
    });
    $('#VHC_TYPE').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "VHC_TYPE"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'차량유형',
        // labelWidth: 70,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 140,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#VHC_TYPE').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
			//자동 조회시 여기서 코딩
            if(!jv_rowclick) return false;
		}
    });
    $('#VHC_KIND').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "VHC_KIND"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'차량종류',
        // labelWidth: 70,
		// labelPosition: 'before',
		labelAlign: 'left',
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onBeforeLoad: function(param){$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){$(this).combo('readonly', false);
		},
		onLoadError: function(){$('#MAKER').combo('readonly', true); return false;
		},
		onChange: function(newValue,oldValue){if(!jv_rowclick) return false;
		}
    });
    $('#VHC_FUEL').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "VHC_FUEL"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'차량연료',
        // labelWidth: 70,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 160,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onBeforeLoad: function(param){$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){$(this).combo('readonly', false);
		},
		onLoadError: function(){$('#MAKER').combo('readonly', true);return false;
		},
		onChange: function(newValue,oldValue){if(!jv_rowclick) return false;
		}
    });
    $('#PSG_CNT').numberspinner({
        width: 200,
        height: 25,
        required: false,
        readonly: false,
        value:'',
        min: 0, 
        max: 999,
        // label:'승차인원',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#USE_YN_Y').radiobutton({
		value: 'Y',
		label: '예',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
        checked: false,
		onChange: function (checked) {
			if (!jv_rowclick) return false;
		}
	});

    $('#USE_YN_N').radiobutton({
		value: 'N',
		label: '아니오',
		labelWidth: 100,
		labelPosition: 'after',
		labelAlign: 'left',
        checked: false,
		onChange: function (checked) {
			if (!jv_rowclick) return false;
      if(checked == true){
          $.jf_checkforeigntable($.jf_curdgrow($('#dg0')),"SI0200", function(a_type){
						if(a_type == "Y"){
								$('#USE_YN_Y').radiobutton('check');
						}
				});
          
      }
            
		}
	});

	$('#REMARK').textbox({
        width: 500,
        height: 80,
        type:'text',
        required: false,
        maxlength: 200,
        //validType:'length[0,200]',
        readonly: false,
        value:'',
        // label:'비고',
        multiline : true,
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
        });
});
