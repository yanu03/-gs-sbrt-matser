﻿$(function(){
	//from date to date
	$('#sch_panel0').append('<input id="sch_fdd" type="text"> - ');
	$('#sch_panel0').append('<input id="sch_tdd" type="text">');
	
	$('#sch_fdd').datebox({
    width: 110,
    height: 24,
    currentText: '오늘',
    required: false ,
    editable: false ,
    value: $.tracomfromdate('m'),
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){
		},
		onChange: function(newValue, oldValue){
			let todate = $('#sch_tdd').datebox('getValue');
			if(todate.length < 1) return false;
			if(newValue > todate){ $('#sch_fdd').datebox('setValue', todate); }
			return true;
		}
	});
	
	$('#sch_tdd').datebox({
    width: 110,
    height: 24,
    currentText: '오늘',
    required: false ,
  	editable: false ,
    value: $.tracomtodate('m'),	//초기값
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){
		},
		onChange: function(newValue, oldValue){
			let fromdate = $('#sch_fdd').datebox('getValue');
			if(fromdate.length < 1) return false;
			if(newValue < fromdate){ $('#sch_tdd').datebox('setValue', fromdate); }
			return true;
		}
	});

});