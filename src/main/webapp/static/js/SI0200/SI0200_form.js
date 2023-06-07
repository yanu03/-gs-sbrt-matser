/**
 * 프로그램명 : 차량관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.12
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
	
	$('#fm_panel0').append('<table>');
	//design
	$('#fm_panel0').append('<input id="VHC_ID" name="VHC_ID">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="VHC_NO" name="VHC_NO">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="COMP_ID" name="COMP_ID">');
	$('#fm_panel0').append('<input id="COMP_NM" name="COMP_NM">&nbsp;');
    $('#fm_panel0').append('<a id="sch_rout_btn" href="#"></a>&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="AREA" name="AREA">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="CHAS_NO" name="CHAS_NO">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="MAKER" name="MAKER">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="RELS_DT" name="RELS_DT"><p>');
    $('#fm_panel0').append('<input id="MODEL_NM" name="MODEL_NM">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="ROUT_TYPE" name="ROUT_TYPE">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="VHC_TYPE" name="VHC_TYPE">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="VHC_KIND" name="VHC_KIND">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="VHC_FUEL" name="VHC_FUEL">&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="PSG_CNT" name="PSG_CNT">&nbsp;&nbsp;');
    $('#fm_panel0').append('사용여부&nbsp;&nbsp;<input id="USE_YN_Y" name="USE_YN">');
    $('#fm_panel0').append('<input id="USE_YN_N" name="USE_YN"><p>');
    $('#fm_panel0').append('<input id="REMARK" name="REMARK">&nbsp;&nbsp;');
	
	$('#fm_panel0').append('</table>');
    
    $('#sch_rout_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});


	$('#VHC_ID').textbox({
        width: 200,
        height: 25,
        type:'text',	//or password
        required: true,
        maxlength: 10,
        //validType:'length[0,10]',
        readonly: true,
        value:'',
        label:'차량 ID',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
	$('#VHC_NO').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        //validType:'length[0,30]',
        readonly: false,
        value:'',
        label:'차량번호',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
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
        readonly: false,
        value:'',
        label:'운수사명',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});


    // hidden으로 넣어서 팝업창에서 value 받아주기
    $('#COMP_ID').textbox({
        width: 0,
        height: 0,
        type:'hidden',
        // required: true,
        // maxlength: 30,
        // //validType:'length[0,30]',
        // readonly: true,
        // value:'',
        // label:'운수사명',
        // labelWidth: 80,
		// labelPosition: 'before',
		// labelAlign: 'left',
        // onChange: function(newValue,oldValue){
        //     if(!jv_rowclick) return false;
        // }
	});

    $('#AREA').combobox({
        width: 180,
		height: 24,
		editable: false,
		url: 'js/SI0200/JSON folder/area_data.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
		value: '',				//dg0과 일치 시키면 편하다
        label:'권역',
        labelWidth: 40,
		labelPosition: 'before',
		labelAlign: 'left',
        panelMaxHeight : 400,
		//panelHeight:'auto',
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

    $('#sch_rout_btn').bind('click', function(){
        /** 버튼 클릭시 운수사를 선택할 수 있는 팝업 화면 open 
         * (팝업 window의 layout은 north와 center로 나눈다. north는 검색. cneter는 그리드)
         *  팝업이 열린 후 
         *  운수사를 검색할 수 있는 검색창과 조회버튼이 north에 위치해 있고
         *  운수사를 선택할 수 있는 그리드는 center에 둔다. 그리드의 row를 클릭 후 확인 버튼을 누르면
         *  해당 운수사 ID, 운수사명을 form안으로 넣어준다 
         */ 
        $.tracomalmsg('정보','주석을 읽어주세요<br><br><br>location : public/js/SI0200/SI0200_form.js<br><br> btn id : sch_rout_btn');
    });

    $('#CHAS_NO').textbox({
        width: 260,
        height: 25,
        type:'text',
        required: false,
        maxlength: 17,
        //validType:'length[0,30]',
        readonly: false,
        value:'',
        label:'차대번호',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });

    $('#MAKER').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: 'js/SI0200/JSON folder/maker_data.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
        value: '',
        label:'제조사',
        labelWidth: 60,
		labelPosition: 'before',
		labelAlign: 'left',
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
        editable: true ,
        //type:'datebox',	//or password
        required: false,
        maxlength: 10,
        //validType:'length[8,10]',
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        label: '출고일자',
        labelWidth: 65,
        labelAlign: 'left',
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
        //validType:'length[0,13]',
        readonly: false,
        value:'',
        label:'모델명',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#ROUT_TYPE').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: 'js/SI0200/JSON folder/rout_type_data.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
        value: '',
        label:'노선유형',
        labelWidth: 70,
		labelPosition: 'before',
		labelAlign: 'left',
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
    $('#VHC_TYPE').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: 'js/SI0200/JSON folder/vhc_type_data.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
        value: '',
        label:'차량유형',
        labelWidth: 70,
		labelPosition: 'before',
		labelAlign: 'left',
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
    $('#VHC_KIND').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: 'js/SI0200/JSON folder/vhc_kind_data.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
        value: '',
        label:'차량종류',
        labelWidth: 70,
		labelPosition: 'before',
		labelAlign: 'left',
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
    $('#VHC_FUEL').combobox({
        width: 200,
        height: 25,
        type:'text',
        editable: false,
		url: 'js/SI0200/JSON folder/VHC_FUEL_data.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
        value: '',
        label:'차량연료',
        labelWidth: 70,
		labelPosition: 'before',
		labelAlign: 'left',
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
    $('#PSG_CNT').numberspinner({
        width: 200,
        height: 25,
        required: false,
        readonly: false,
        value:'',
        min: 0, 
        max: 99,
        label:'승차인원',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
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
        width: 500,
        height: 80,
        type:'text',
        required: false,
        maxlength: 200,
        //validType:'length[0,200]',
        readonly: false,
        value:'',
        label:'비고',
        multiline : true,
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
        });
});