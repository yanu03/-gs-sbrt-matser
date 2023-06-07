/** 
프로그램명 : 신호현시정보 이력
작성자 : 박원용
작성일 : 2023-05-31
**/
$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb1" value="">');
  $('#sch_panel0').append('<input id="sch_lb1" name="sch_lb1" value="">');
	
  $('#sch_lb0').combobox({
    width: 200,
    height: 24,
    editable: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "CTR_STS"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '제어기상태',
	    // value: '%',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      //$(this).combobox('setValue', 'TIME');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

  $('#sch_lb1').combobox({
    width: 200,
    height: 24,
    editable: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_DIV"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '주말구분',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      //$(this).combobox('setValue', 'DY001');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
  });

});