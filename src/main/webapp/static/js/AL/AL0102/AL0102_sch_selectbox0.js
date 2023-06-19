/*
작성자 : 박원용
작성일 : 2023.04.06
*/
$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0">');
	
	$('#sch_lb0').combobox({
		width: 120,
		height: 24,
		editable: false,
		url: 'js/AL0102/JSON file/AL0102_selectbox_data0.json',
		method: 'get',
		queryParams: {},
		valueField: 'id',
		textField: 'text',
		value: 'ALL',				//dg0과 일치 시키면 편하다
		panelHeight:'auto',
		onBeforeLoad: function(param){
			$(this).combo('readonly', true);
		},
		onLoadSuccess: function(){
			$(this).combo('readonly', false);
		},
		onLoadError: function(){
			$('#sch_lb0').combo('readonly', true);
			return false;
		},
		onChange: function(newValue,oldValue){
			//자동 조회시 여기서 코딩
		}
	});

});