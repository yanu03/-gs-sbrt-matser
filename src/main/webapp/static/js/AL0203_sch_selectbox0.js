/** 
작성자 : 양현우
작성일 : 2023-04-26
수정자 : 양현우
수정일 : 2023-04-26
**/
$(function(){

	$('#sch_panel1').append('<input id="sch_lb0" name="sch_lb0" value="">');
	
	$('#sch_lb0').combobox({
	   	width: 200,
	   	height: 24,
	   	editable: false,
	    url: '/common/selectCommonDtlList',
	    method: 'post',
	    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "WAY_DIV"}}),
	    valueField: 'DL_CD',
	    textField: 'DL_CD_NM',
		label: '상하행 : ',
	    // value: '%',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
	    onBeforeLoad: function(param){},
	    onLoadSuccess: function(){
	    	$(this).combobox('setValue', 'WD001');
	    },
	    onLoadError: function(){return false;},
	    onChange: function(newValue,oldValue){
	    	// $.uf_bgajax();
	    }
	});

});