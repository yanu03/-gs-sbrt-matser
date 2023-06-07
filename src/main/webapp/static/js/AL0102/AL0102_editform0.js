/*
프로그램명 : 휴일관리 폼

작성자 : 박원용
작성일 : 2023.04.06
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
                case "DAY_TYPE":	//listbox sample
                    a_arrfield =  new Array("DAY_TYPE", "DAY_TYPE_NM");
                    a_arrvalue =  new Array($('#DAY_TYPE').textbox('getValue'), $('#DAY_TYPE').textbox('getText'));
                    a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                    break;
                case "DAY_OF_WEEK":	//listbox sample
                    a_arrfield =  new Array("DAY_OF_WEEK", "DAY_OF_WEEK_NM");
                    a_arrvalue =  new Array($('#DAY_OF_WEEK').textbox('getValue'), $('#DAY_OF_WEEK').textbox('getText'));
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
	$('#fm_panel0').append('<input id="HOLI_DT" class="tracom-textbox" name="HOLI_DT">');
	$('#fm_panel0').append('<input id="DAY_OF_WEEK" class="tracom-combobox" name="DAY_OF_WEEK">');
    $('#fm_panel0').append('<input id="HOLI_NM" class="tracom-textbox" name="HOLI_NM">');
    $('#fm_panel0').append('<input id="DAY_TYPE" class="tracom-combobox" name="DAY_TYPE">');
    $('#fm_panel0').append('<input id="REMARK" class="tracom-textbox" name="REMARK">');
	
	$('#fm_panel0').append('</table>');

	$('#HOLI_DT').datebox({
        width: 200,
        height: 25,
        editable: false ,
        required: true,
        maxlength: 10,
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        label: '날짜 :',
        // labelWidth: 54,
        // labelAlign: 'right',
        onChange: function(a_newValue,oldValue){
            // 휴일불러오기를 누를시 요일과 날짜를 맞추려고 넣었습니다.
            $.uf_syncweek("",a_newValue);
            if(!jv_rowclick) return false;
        }
	});

    $('#DAY_OF_WEEK').combobox({
        width: 200,
		height: 24,
		editable: false,
        required: true,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({dma_search : {CO_CD : "DAY_OF_WEEK"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        label: '요일',
        labelWidth: 54,
        labelAlign: 'right',
        panelMaxHeight: 230,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
	
    $('#HOLI_NM').textbox({
        width: 300,
        height: 25,
        type:'text',
        required: true,
        maxlength: 30,
        readonly: false,
        value:'',
        label: '공휴일/이벤트명',
        labelWidth: 130,
        labelAlign: 'right',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});

    $('#DAY_TYPE').combobox({
		width: 200,
		height: 24,
		editable: false,
		url: '/common/selectCommonDtlList',
		method: 'post',
		queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_TYPE"}}),
		valueField: 'DL_CD',
        textField: 'DL_CD_NM',
        label: '구분',
        labelWidth: 54,
        labelAlign: 'right',
        panelMaxHeight: 100,
        loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)
        },
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});

    $('#REMARK').textbox({
        width: 400,
        height: 100,
        type:'text',
        required: false,
        maxlength: 200,
        readonly: false,
        multiline : true,
        value:'',
        label: '비고',
        labelWidth: 54,
        labelAlign: 'right',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
});