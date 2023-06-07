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
	    	if(!$.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
	    	
					let a_vals;
					switch(target.id){
						case "status_p":	//radio sample
						case "status_q":
								if($(target).radiobutton('options').checked){
									a_vals = $.jf_singledatatojson('status', $(target).radiobutton('options').value);
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
	    	$.jf_synctogrid($('#dg0'), a_vals);
	    	return true;
	    }
	});
	
	$('#fm_panel0').append('<table>');
	//design
	
	$('#fm_panel0').append('<input id="VHC_ID" name="VHC_ID"><p>');
	$('#fm_panel0').append('<input id="VHC_NO" name="VHC_NO"><p>');
	
	$('#fm_panel0').append('</table>');
	            
	$('#VHC_ID').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: true,
    validType:'length[0,20]',
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	$('#VHC_NO').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: true,
    validType:'length[0,20]',
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
});