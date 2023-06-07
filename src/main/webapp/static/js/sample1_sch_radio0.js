$(function(){

	$('#sch_panel0').append('<input id="sch_rb0"" name="fruit">');
	$('#sch_panel0').append('<input id="sch_rb1"" name="fruit">');
	$('#sch_panel0').append('<input id="sch_rb2"" name="fruit">');
	$('#sch_panel0').append('<input id="sch_rb3"" name="fruit">');

	$('#sch_rb0').radiobutton({
	    label: ':가',
	    labelWidth:100,
	    labelPosition:'after',
	    labelAlign:'left',
	    value: '가',
	    checked: true,
	    onChange: function(checked){
	    	//checked : true, false
	    }
	});
	$('#sch_rb1').radiobutton({
	    label: '나:',
	    labelWidth:100,
	    labelPosition:'after',
	    labelAlign:'left',
	    value: '나',
	    checked: false,
	    onChange: function(checked){
	    	//checked : true, false
	    }
	});
	$('#sch_rb2').radiobutton({
	    label: '다:',
	    labelWidth:100,
	    labelPosition:'after',
	    labelAlign:'left',
	    value: '다',
	    checked: false,
	    onChange: function(checked){
	    	//checked : true, false
	    }
	});
	$('#sch_rb3').radiobutton({
	    label: '라:',
	    labelWidth:100,
	    labelPosition:'after',
	    labelAlign:'left',
	    value: '다',
	    checked: false,
	    onChange: function(checked){
	    	//checked : true, false
	    }
	});
	
	//$('#sch_rb0').radiobutton('check');

});