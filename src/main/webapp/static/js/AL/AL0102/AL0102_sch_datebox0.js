/*
프로그램명 : 휴일관리datebox

작성자 : 박원용
작성일 : 2023.04.06
*/

$(function(){
	//from date to date
	$('#sch_panel0').append('<input id="sch_year" type="text">');
	
	$('#sch_year').datebox({
    width: 110,
    height: 24,
    currentText: '',
    required: false ,
    editable: true ,
    value: $.tracomfromdate('d'),
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
	onSelect: function(date){
	},
	onChange: function(newValue, oldValue){
	return true;
	}
	});
});