/**
 * 프로그램명 : 차내장치 정보 관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.13
 */
$(function(){
	
	$('#ef0').form({
        onSubmit: function(param){
        },
        success:function(data){
        },
        onProgress: function(percent){
        },
        onBeforeLoad: function(param){
        },
        onLoadSuccess: function(data){
        },
        onLoadError: function(){
        },
        onChange: function(target){
            if(!jv_rowclick) return false;
            //if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
            let a_arrfield;
            let a_arrvalue;
            let a_vals;
            switch(target.id){
                case "USE_YN_Y":	//radio sample
                case "USE_YN_N":
                    if($(target).radiobutton('options').checked){
                        a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
                    } 
                    break;
                case "MAKER":	//listbox sample
                    a_arrfield = new Array("MAKER", "MAKER_NM");
                    a_arrvalue = new Array($('#MAKER').textbox('getValue'), $('#MAKER').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "DVC_KIND":	//listbox sample
                    a_arrfield = new Array("DVC_KIND", "DVC_KIND_NM");
                    a_arrvalue = new Array($('#DVC_KIND').textbox('getValue'), $('#DVC_KIND').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "INST_LOC":	//listbox sample
                    a_arrfield = new Array("INST_LOC", "INST_LOC_NM");
                    a_arrvalue = new Array($('#INST_LOC').textbox('getValue'), $('#INST_LOC').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "DVC_KIND":	//listbox sample
                    a_arrfield = new Array("DVC_KIND", "DVC_KIND_NM");
                    a_arrvalue = new Array($('#DVC_KIND').textbox('getValue'), $('#DVC_KIND').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;    
                case "TRNS_TYPE":	//listbox sample
                    a_arrfield = new Array("TRNS_TYPE", "TRNS_TYPE_NM");
                    a_arrvalue = new Array($('#TRNS_TYPE').textbox('getValue'), $('#TRNS_TYPE').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                default:
                    if(!$(target).textbox('isValid')){$(target).textbox('clear'); break;}
                    a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
                    break;
            }
            
            $.jf_synctogrid($('#dg1'), a_vals);
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
    htmlString += '<th><label>장치ID </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';
	
    htmlString += '<tr>';
    htmlString += '<th><label>제조사 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>장치종류 </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>설치위치 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>통신유형 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>관리ID </label></th>';
    htmlString += '<td></td>';
    htmlString += '<th><label>위치좌표 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '<tr>';
    htmlString += '<th><label>사용여부 </label></th>';
    htmlString += '<td></td>'; //숫자 주도록해서 append
    htmlString += '<th><label>비고 </label></th>';
    htmlString += '<td></td>';
    htmlString += '</tr>';

    htmlString += '</table>';

    $('#fm_panel0').html(htmlString);

	// $('#fm_panel0').append('<table>');
	//design
    $('#fm_panel0 table tr:nth-child(1) td:nth-child(2)').append('<input id="VHC_ID" class="tracom-textbox" name="VHC_ID">');
    //$('#fm_panel0').append('<a id="sch_VHC_btn" href="#"></a>');
    $('tr:nth-child(1) td:nth-child(4)').append('<input id="VHC_NO" class="tracom-textbox" name="VHC_NO">');
    $('tr:nth-child(1) td:nth-child(6)').append('<input id="DVC_ID" class="tracom-textbox" name="DVC_ID">');
    $('tr:nth-child(2) td:nth-child(2)').append('<input id="MAKER" class="tracom-combobox" name="MAKER">');
    $('tr:nth-child(2) td:nth-child(4)').append('<input id="DVC_KIND" class="tracom-combobox" name="DVC_KIND">');
    $('tr:nth-child(2) td:nth-child(6)').append('<input id="INST_LOC" class="tracom-combobox" name="INST_LOC">');
    $('tr:nth-child(3) td:nth-child(2)').append('<input id="TRNS_TYPE" class="tracom-combobox" name="TRNS_TYPE">');
    $('tr:nth-child(3) td:nth-child(4)').append('<input id="MNG_ID" class="tracom-textbox" name="MNG_ID">');
    $('tr:nth-child(3) td:nth-child(6)').append('<input id="DVC_COORDS" class="tracom-textbox" name="DVC_COORDS">');
    $('tr:nth-child(3) td:nth-child(6)').append('<a id="DVC_COORDS_btn" href="#">좌표</a>');
    $('tr:nth-child(4) td:nth-child(2)').append('<input id="USE_YN_Y" class="tracom-radiobutton" name="USE_YN">');
    $('tr:nth-child(4) td:nth-child(2)').append('<input id="USE_YN_N" class="tracom-radiobutton" name="USE_YN">');
    $('tr:nth-child(4) td:nth-child(4)').append('<input id="REMARK"  class="tracom-textbox"name="REMARK">');
	
	// $('#fm_panel0').append('</table>');

	$('#VHC_ID').textbox({
        width: 200,
        height: 25,
        type:'text',	
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

    $('#sch_VHC_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
    $('#sch_VHC_btn').bind('click', function(){
        // 차량 ID 검색 팝업이 필요함
    });

	$('#VHC_NO').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: true,
        maxlength: 10,
        //validType:'length[0,30]',
        readonly: true,
        value:'',
        // label:'차량번호',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});

    $('#DVC_ID').textbox({
        width: 200,
        height: 25,
        type:'text',	//or password
        required: true,
        maxlength: 10,
        //validType:'length[0,10]',
        readonly: true,
        value:'',
        // label:'장치 ID',
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
        panelMaxHeight: 100,
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

    $('#DVC_KIND').combobox({
        width: 300,
		height: 24,
		editable: false,
        required: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DVC_KIND"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
		value: '',				//dg0과 일치 시키면 편하다
        // label:'장치종류',
        // labelWidth: 70,
		// labelPosition: 'before',
		// labelAlign: 'left',
        panelMaxHeight : 400,
		//panelHeight:'auto',
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
		onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#DVC_KIND').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
		}
    });

    
    $('#INST_LOC').combobox({
        width: 250,
        height: 25,
        type:'text',
        editable: false,
        required: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "INST_LOC"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'설치위치',
        // labelWidth: 70,
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
			$('#INST_LOC').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
			//자동 조회시 여기서 코딩
            if(!jv_rowclick) return false;
		}
    });
    
    $('#TRNS_TYPE').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
        required: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "TRNS_TYPE"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        value: '',
        // label:'통신유형',
        // labelWidth: 70,
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
			$('#INST_LOC').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
			//자동 조회시 여기서 코딩
            if(!jv_rowclick) return false;
		}
	});
    $('#MNG_ID').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: true,
        maxlength: 10,
        //validType:'length[0,30]',
        readonly: false,
        value:'',
        // label:'관리 ID',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
            $.uf_chkmngid(newValue, $('#MNG_ID'));
        }
	});

    $('#DVC_COORDS').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: false,
        maxlength: 6,
        readonly: true,
        value:'',
        // label:'위치좌표',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
    $('#DVC_COORDS_btn').linkbutton({
        height: 24,
        iconCls: ''
	});
    $('#DVC_COORDS_btn').bind('click', function(){
        // 좌표 버튼을 누르면 차량 이미지를 팝업으로 나옴(?) 해당 장치를 어디에 설치 돼있는지 
        // 해당 위치를 클릭후 좌표값을 input에 넣어줌
        let v_value = {DVC_KIND : $('#DVC_KIND').textbox('getValue'), DVC_COORDS : $('#DVC_COORDS').textbox('getValue')};
        $.uf_makeimg($('#dg1'), $('#dg1').datagrid('getSelected') , $('#center'));
        $.mf_sel_dvc_coordsmdopen(null, $('#ef0'), v_value, $('#REMARK'), 'f');
    });

    $('#USE_YN_Y').radiobutton({
        label: '예',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'Y',
        checked: false,
        onChange: function(checked){
            if(!jv_rowclick) return false;
        }
    });

    $('#USE_YN_N').radiobutton({
        label: '아니오',
        labelWidth:50,
        labelPosition:'after',
        labelAlign:'left',
        value: 'N',
        checked: false,
        onChange: function(checked){
            //checked : true, false
            if(!jv_rowclick) return false;
        }
	});

	$('#REMARK').textbox({
        width: 350,
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
