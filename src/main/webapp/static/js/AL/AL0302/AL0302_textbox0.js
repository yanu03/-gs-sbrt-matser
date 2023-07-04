/** 
작성자 : 양현우
작성일 : 2023-04-28
수정자 : 양현우
수정일 : 2023-04-28
**/
$(function(){
	//from date to date
	$('#subsch_panel1').append('<input id="sch_tb" type="text"> ');
	
	$('#sch_tb').numberbox({
		width: 250,
		maxlength: 30,
		height: 25,
		type: 'text',
		required: false,
		readonly: false,
		value: '',
		min: 0,
		max: 200,
		label: '정류소 정차시간(초) : ',
		labelWidth: 150,
		onChange: function (newValue, oldValue) {
			if (!jv_rowclick) return false;
		}
	});

});