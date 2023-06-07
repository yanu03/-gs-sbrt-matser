/**
 * 프로그램명 : 운전자 관리 form
 * 작성자 : 박원용
 * 작성일 : 2023.04.19
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
                let a_vals;
                let a_arrfield;
                let a_arrvalue
                switch(target.id){
                    case "EPLY_YN":	//listbox sample
                        a_arrfield =  new Array("EPLY_YN", "EPLY_YN_NM");
                        a_arrvalue =  new Array($('#EPLY_YN').textbox('getValue'), $('#EPLY_YN').textbox('getText'));
                        a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                        break;
                    case "BUS_DIV":	//listbox sample
                        a_arrfield =  new Array("BUS_DIV", "BUS_DIV_NM");
                        a_arrvalue =  new Array($('#BUS_DIV').textbox('getValue'), $('#BUS_DIV').textbox('getText'));
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
    $('#fm_panel0').append('<input id="DRV_ID" class="tracom-textbox" name="DRV_ID">');
    $('#fm_panel0').append('<input id="DRV_NM" class="tracom-textbox" name="DRV_NM">');
    $('#fm_panel0').append('<input id="COMP_ID" class="tracom-textbox" name="COMP_ID">&nbsp;');
	$('#fm_panel0').append('<input id="COMP_NM" class="tracom-textbox" name="COMP_NM">&nbsp;');
    $('#fm_panel0').append('<a id="sch_comp_btn" href="#"></a>&nbsp;&nbsp;');
    $('#fm_panel0').append('<input id="BUS_DIV" class="tracom-textbox" name="BUS_DIV">');
    $('#fm_panel0').append('<input id="EPLY_DATE1" class="tracom-textbox" name="EPLY_DATE1">');
    $('#fm_panel0').append('<input id="CERTI_DT" class="tracom-textbox" name="CERTI_DT">');
    $('#fm_panel0').append('<input id="EPLY_YN" class="tracom-combobox" name="EPLY_YN">');
    $('#fm_panel0').append('<input id="RETIRE_DT" class="tracom-textbox" name="RETIRE_DT"><p>');
    
    $('#fm_panel0').append('<input id="ATTACH_ID" class="tracom-textbox" name="ATTACH_ID">');
    $('#fm_panel0').append('<a id="file_btn" href="#"></a><p>');
    // 나중에 사진 파일 받아올 수 있을때 분리해둔 공간에 img 넣어주기 
    // id는 추후 작업할 때 넣기
    $('#fm_panel0').append('<div id="" style="margin:0 0 0 0;border:0.1px solid black;width:300px;height:200px;float:left;">이미지</div>');
    $('#fm_panel0').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');
	
	$('#fm_panel0').append('</table>');
    
	$('#DRV_ID').textbox({
        width: 200,
        height: 25,
        type:'text',	//or password
        required: true,
        maxlength: 10,
        //validType:'length[0,10]',
        readonly: true,
        value:'',
        label:'운전자 ID',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
	$('#DRV_NM').textbox({
        width: 200,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        //validType:'length[0,30]',
        readonly: false,
        value:'',
        label:'운전자 명',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
    $('#COMP_ID').textbox({
        width: 0,
        height: 0,
        type:"hidden",
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#COMP_NM').textbox({
        width: 220,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        readonly: true,
        value:'',
        label:'운수사',
        labelWidth: 60,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#sch_comp_btn').linkbutton({
        height: 24,
        iconCls: 'icon-search'
	});
    $('#sch_comp_btn').bind('click', function(){
        let v_values = {VHC_ID:"",COMP_ID:$('#COMP_NM').textbox('getValue'), COMP_NM:$('#COMP_NM').textbox('getValue'), AREA:""};
        $.mf_selcompmdopen($('#ef0'), v_values, $('#BUS_DIV'));
    });

    $('#BUS_DIV').combobox({
        width: 200,
		height: 24,
		editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "BUS_DIV"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
		value: '',				//dg0과 일치 시키면 편하다
        label:'운행버스구분',
        labelWidth: 100,
		labelPosition: 'before',
		labelAlign: 'left',
        panelMaxHeight : 130,
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
            //$.uf_sckbusdiv(newValue);
		}
    });

    $('#EPLY_DATE1').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        label: '입사일',
        labelWidth: 65,
        labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    
    $('#CERTI_DT').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        label: '자격취득일',
        labelWidth: 80,
        labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
    });
    $('#EPLY_YN').combobox({
        width: 180,
		height: 24,
		editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "EPLY_YN"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
		value: '',				//dg0과 일치 시키면 편하다
        label:'재직여부',
        labelWidth: 80,
		labelPosition: 'before',
		labelAlign: 'left',
        panelMaxHeight : 130,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
		onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#EPLY_YN').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
            $.uf_chkeply();
            if(!jv_rowclick) return false;
            $.uf_chkretiredate();
		}
    });

    $('#RETIRE_DT').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: false,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value: '',
        label: '퇴직일',
        labelWidth: 65,
        labelAlign: 'left',
        onChange: function(a_newValue,oldValue){
            if(!jv_rowclick) return false;   
            return $.uf_chkretiredt(a_newValue);
            
        }
    });

    $('#ATTACH_ID').textbox({
        width: 350,
        height: 25,
        type:'text',
        required: false,
        maxlength: 10,
        readonly: false,
        value:'',
        label:'파일선택',
        labelWidth: 100,
		labelPosition: 'before',
		labelAlign: 'left',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
            $.uf_chkphoto(newValue);
        }
    });
    $('#file_btn').linkbutton({
        height: 24,
        iconCls: 'icon-save'
	});
    $('#file_btn').bind('click', function(){
        // 사진 파일 선택 버튼
        $.tracomalmsg('정보','파일 업로드는 작업중입니다.');
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
        labelWidth:35,
        labelPosition:'before',
        labelAlign:'left',
        multiline : true,
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
        });
});