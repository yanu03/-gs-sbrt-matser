/** 
프로그램명: 정류소 구간뵬 평균속도 통계
작성자 : 박원용
작성일 : 2023-05-25
**/
$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0" value="">');
  $('#sch_panel0').append('<input id="sch_lb1" name="sch_lb0" value="">');
	
  $('#sch_lb0').combobox({
    width: 180,
    height: 24,
    editable: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_GRP"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '노선 그룹',
	    // value: '%',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      $(this).combobox('setValue', 'RG001');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

	$('#sch_lb1').combobox({
    width: 180,
    height: 24,
    editable: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "WAY_DIV"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '상하행',
	    // value: '%',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      $(this).combobox('setValue', 'WD001');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

});