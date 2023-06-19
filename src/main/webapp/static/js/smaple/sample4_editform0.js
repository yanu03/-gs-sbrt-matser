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
						case "USE_Y":	//radio sample
						case "USE_N":
								if($(target).radiobutton('options').checked){
									a_vals = $.jf_singledatatojson('USE_YN', $(target).radiobutton('options').value);
								} 
							break;
						case "chk_div_code":	//listbox sample
							let a_arrfield =  new Array("chk_div_code", "chk_div_code_name");
							let a_arrvalue =  new Array($('#chk_div_code').textbox('getValue'), $('#chk_div_code').textbox('getText'));
							a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
							break;
						default:
								if(!$(target).textbox('isValid')){$(target).textbox('clear'); break;}
								a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
							break;
					}
                    console.log(a_vals);
	    	$.jf_synctogrid($('#dg0'), a_vals);
	    	return true;
	    }
	});
	
	$('#fm_panel0').append('<table>');
	//design
	
	$('#fm_panel0').append('<input id="CP_ID" name="CP_ID"><p>');
	$('#fm_panel0').append('<input id="CP_NM" name="CP_NM"><p>');
    $('#fm_panel0').append('<input id="AREA" name="AREA"><p>');
	$('#fm_panel0').append('<input id="AGENT_NM" name="AGENT_NM"></p>');
    $('#fm_panel0').append('<input id="CRN" name="CRN"><p>');
    $('#fm_panel0').append('<input id="ADD" name="ADD"><p>');
	$('#fm_panel0').append('<input id="REMARK" name="REMARK"><p>');
	
	$('#fm_panel0').append('</table>');
	            
	$('#CP_ID').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: true,
    maxlength: 20,
    readonly: true,
    value:'',
    label: '운수사 ID : ',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	$('#CP_NM').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: true,
    maxlength: 20,
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
	});

    $('#AREA').combobox({
    width: 200,
    height: 25,
    url: 'sample4_combobox_data.json',
    method: 'get',
    queryParams: {},
    valueField: 'id',
    textField: 'name',
    value: '',	
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    },
    onBeforeLoad: function(param){
		$(this).combo('readonly', true);
	},
    onLoadSuccess: function(){
	    $(this).combo('readonly', false);
	},
    });

    $('#AGENT_NM').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: true,
    maxlength: 20,
    validType:'length[0,20]',
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#CRN').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: false,
    maxlength: 20,
    validType:'length[0,20]',
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
	
    $('#ADD').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: true,
    maxlength: 20,
    validType:'length[0,20]',
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#REMARK').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: false,
    maxlength: 100,
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
});