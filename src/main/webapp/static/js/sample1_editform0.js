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
	    	//validate?? Ȯ???Ѵ?.
	    	if(!$.jf_validatedata($('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return false;
	    	
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
	
	$('#fm_panel0').append('<input id="itemid" name="itemid"><p>');
	$('#fm_panel0').append('<input id="productid" name="productid"><p>');
	$('#fm_panel0').append('<input id="listprice" name="listprice"><p>');
	$('#fm_panel0').append('<input id="unitcost" name="unitcost"><p>');
	$('#fm_panel0').append('<input id="attr1" name="attr1"><p>');
	$('#fm_panel0').append('<input id="status_p" name="status">&nbsp;');
	$('#fm_panel0').append('<input id="status_q" name="status"><p>');
	
	
	$('#fm_panel0').append('</table>');
	            
	$('#itemid').textbox({
    width: 200,
    height: 25,
    type:'text',	//or password
    required: true,
    readonly: true,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	$('#productid').textbox({
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
	
	$('#listprice').numberbox({
    width: 200,
    height: 25,
    min: -99999.99,	//?ڸ??? Ȥ?? type?? ?°? ó?? ?ϼ???
    max: 99999.99,	//?ڸ??? Ȥ?? type?? ?°? ó?? ?ϼ???
    precision: 2,
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	$('#unitcost').numberbox({
    width: 200,
    height: 25,
    min: -99999.99,	//?ڸ??? Ȥ?? type?? ?°? ó?? ?ϼ???
    max: 99999.99,	//?ڸ??? Ȥ?? type?? ?°? ó?? ?ϼ???
    precision: 2,
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	$('#attr1').textbox({
    width: 200,
    height: 25,
    type:'text',
    required: true,
    validType: 'length[0,10]',
    readonly: false,
    value:'',
    onChange: function(newValue,oldValue){
    	if(!jv_rowclick) return false;
    }
	});
	
	//radio sample
	$('#status_p').radiobutton({
		value: 'P',
		label: 'P',
    labelWidth:100,
    labelPosition:'after',
    labelAlign:'left',
    onChange: function(checked){
    	if(!jv_rowclick) return false;
    }
	});
	$('#status_q').radiobutton({
		value: 'Q',
		label: 'Q',		
    labelWidth:100,
    labelPosition:'after',
    labelAlign:'left',
    onChange: function(checked){
    	if(!jv_rowclick) return false;
    }
	});
	
});