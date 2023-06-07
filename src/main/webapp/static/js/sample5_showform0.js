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
	    	// if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
	    	
			// 		let a_vals;
			// 		switch(target.id){
			// 			case "status_p":	//radio sample
			// 			case "status_q":
			// 					if($(target).radiobutton('options').checked){
			// 						a_vals = $.jf_singledatatojson('status', $(target).radiobutton('options').value);
			// 					} 
			// 				break;
			// 			case "chk_div_code":	//listbox sample
			// 				let a_arrfield =  new Array("chk_div_code", "chk_div_code_name");
			// 				let a_arrvalue =  new Array($('#chk_div_code').textbox('getValue'), $('#chk_div_code').textbox('getText'));
			// 				a_vals = $.jf_multidatatojson(a_arrfield, a_arrvalue);	//arr arr ?޾Ƽ? ó?? ?ϴ? ???? ????
			// 				break;
			// 			default:
			// 					if(!$(target).textbox('isValid')){$(target).textbox('clear'); break;}
			// 					a_vals = $.jf_singledatatojson(target.id, $(target).textbox('getValue'));
			// 				break;
			// 		}
	    	// $.jf_synctogrid($('#dg0'), a_vals);
	    	return true;
	    }
	});
	
	$('#fm_panel0').append('<table>');
	//design
	
    // 구분을 위해 대기 input은 tab 한칸을 해놓음

	$('#fm_panel0').append('<input id="BROD" name="BROD">'); 
    $('#fm_panel0').append('<input id="SKY" name="SKY"><p>');
    $('#fm_panel0').append('<input id="TEMP" name="TEMP">');

        $('#fm_panel0').append('<input id="FINE_DUST" name="FINE_DUST"><p>');

    $('#fm_panel0').append('<input id="LOW_TEMP" name="LOW_TEMP">');

        $('#fm_panel0').append('<input id="ULTRAFINE_DUST" name="ULTRAFINE_DUST"><p>');

    $('#fm_panel0').append('<input id="HIGH_TEMP" name="HIGH_TEMP">');

        $('#fm_panel0').append('<input id="SULFUR" name="SULFUR"><p>');

    $('#fm_panel0').append('<input id="HUM" name="HUM">');

        $('#fm_panel0').append('<input id="CARBON" name="CARBON"><p>');

    $('#fm_panel0').append('<input id="POP" name="POP">');

        $('#fm_panel0').append('<input id="OZONE" name="OZONE"><p>');

    $('#fm_panel0').append('<input id="PRECP" name="PRECP">');

	    $('#fm_panel0').append('<input id="NITROGEN" name="NITROGEN"><p>');

	$('#fm_panel0').append('</table>');
	           
    // 기상 btn bind

	$('#UPDTAE').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	$('#BROD').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});

    $('#SKY').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
    
    $('#TEMP').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#LOW_TEMP').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
    
    $('#HIGH_TEMP').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
	

    $('#HUM').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#POP').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#PRECP').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    // 대기 btn bind
    
    $('#FINE_DUST').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#ULTRAFINE_DUST').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
    
    $('#SULFUR').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
    

    $('#CARBON').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#OZONE').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });

    $('#NITROGEN').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: false,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
        if(!jv_rowclick) return false;
    }
    });
});