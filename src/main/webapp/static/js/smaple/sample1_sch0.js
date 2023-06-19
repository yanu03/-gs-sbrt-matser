$(function(){
	$('#sch_panel0').append('<input id="sch_tb0" type="text">');	//textbox
	//$('#sch_panel0').append('<input id="sch_mb0" type="text">');	//mask textbox
	//$('#sch_panel0').append('<input id="sch_cc0" name="">');			//combo box
	//$('#sch_panel0').append('<input id="sch_nb0" type="text">');	//number box
	//$('#sch_panel0').append('<input id="sch_dd0" type="text">');	//date box
	//radio box
	//check box
	
	//from date to date
	//$('#sch_panel0').append('<input id="sch_fdd" type="text">');
	//$('#sch_panel0').append('<input id="sch_tdd" type="text">');
	
	
	$('#sch_tb0').textbox({
    buttonText:'검색',
    iconCls:'',
    iconAlign:'left',
  	onChange: function(newValue,oldValue){
				alert(newValue+':'+oldValue);
		},
  	onClickButton: function(){
				alert('click')
		}
	});

});