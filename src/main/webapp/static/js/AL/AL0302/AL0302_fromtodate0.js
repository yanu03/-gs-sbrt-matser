/** 
작성자 : 양현우
작성일 : 2023-04-28
수정자 : 양현우
수정일 : 2023-04-28
**/
$(function(){
	//from date to date
	$('#subsch_panel1').append('배포시작일 : <input id="sch_fdd" type="text"> ');
	$('#subsch_panel1').append('배포종료일 : <input id="sch_tdd" type="text">&nbsp;&nbsp;&nbsp;&nbsp;');
	
	$('#sch_fdd').datebox({
		width: 110,
		height: 24,
		currentText: '',
		required: false ,
		editable: false ,
		value: $.tracomfromdate('d'),
		formatter: $.tracomdateformatter,
		parser: $.tracomdateparser,
			onSelect: function(date){},
			onChange: function(a_newValue, a_oldValue){
				if(!$.uf_validdayftd(a_newValue, a_oldValue)) $(this).datebox('setValue', a_oldValue);
			}
	});
	
	$('#sch_tdd').datebox({
    width: 110,
    height: 24,
    currentText: '',
    required: false ,
	editable: false ,
    value: $.tracomtodate('d'),	//초기값
    formatter: $.tracomdateformatter,
    parser: $.tracomdateparser,
		onSelect: function(date){},
		onChange: function(a_newValue, a_oldValue){
			if(!$.uf_validdayftd(a_newValue, a_oldValue)) $(this).datebox('setValue', a_oldValue);
		}
	});

});