/*
프로그램명 : 휴일관리 폼

작성자 : 박원용
작성일 : 2023.04.06
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
                switch(target.id){
                    case "status_p":	//radio sample
                    case "status_q":
                            if($(target).radiobutton('options').checked){
                                a_vals = $.jf_singledatatojson('status', $(target).radiobutton('options').value);
                            } 
                        break;
                    case "DAY_TYPE":	//listbox sample
                        let a_day_type_field =  new Array("DAY_TYPE", "DAY_TYPE_NM");
                        let a_day_type_value =  new Array($('#DAY_TYPE').textbox('getValue'), $('#DAY_TYPE').textbox('getText'));
                        a_vals = $.jf_multidatatojson(a_day_type_field, a_day_type_value);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
                        break;
                    case "DAY_OF_WEEK":	//listbox sample
                        let a_day_of_week_field =  new Array("DAY_OF_WEEK", "DAY_OF_WEEK_NM");
                        let a_day_of_week_value =  new Array($('#DAY_OF_WEEK').textbox('getValue'), $('#DAY_OF_WEEK').textbox('getText'));
                        a_vals = $.jf_multidatatojson(a_day_of_week_field, a_day_of_week_value);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
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
	$('#fm_panel0').append('<input id="HOLI_DT" name="HOLI_DT">');
	$('#fm_panel0').append('<input id="DAY_OF_WEEK" name="DAY_OF_WEEK"><p>');
    $('#fm_panel0').append('<input id="HOLI_NM" name="HOLI_NM"><p>');
    $('#fm_panel0').append('<input id="DAY_TYPE" name="DAY_TYPE"><p>');
    $('#fm_panel0').append('<input id="REMARK" name="REMARK"><p>');
	
	$('#fm_panel0').append('</table>');

	$('#HOLI_DT').datebox({
        width: 200,
        height: 25,
        editable: true ,
        //type:'datebox',	//or password
        required: true,
        maxlength: 10,
        //validType:'length[8,10]',
        formatter: $.tracomdateformatter,
        parser: $.tracomdateparser,
        readonly: false,
        value:'',
        label: '날짜 :',
        labelWidth: 54,
        labelAlign: 'right',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});

    $('#DAY_OF_WEEK').combobox({
        width: 200,
		height: 24,
		editable: false,
        required: true,
		url: 'js/AL0102/JSON file/AL0102_dayofweek_data.json',
		method: 'GET',
		queryParams: {},
        label: '요일 :',
        labelWidth: 54,
        labelAlign: 'right',
		valueField: 'DAY_OF_WEEK',
		textField: 'DAY_OF_WEEK_NM',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
	
    $('#HOLI_NM').textbox({
        width: 300,
        height: 25,
        type:'text',
        required: true,
        maxlength: 10,
        //validType:'length[0,20]',
        readonly: false,
        value:'',
        label: '공휴일/이벤트명 :',
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
		url: 'js/AL0102/JSON file/AL0102_daytype_data.json',
		method: 'GET',
		queryParams: {},
        label: '구분 :',
        labelWidth: 54,
        labelAlign: 'right',
		valueField: 'DAY_TYPE',
		textField: 'DAY_TYPE_NM',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
		//loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}
	});

    $('#REMARK').textbox({
        width: 400,
        height: 100,
        type:'text',
        required: false,
        maxlength: 200,
        //validType:'length[0,200]',
        readonly: false,
        multiline : true,
        value:'',
        label: '비고 :',
        labelWidth: 54,
        labelAlign: 'right',
        onChange: function(newValue,oldValue){
            if(!jv_rowclick) return false;
        }
	});
});