/** 
프로그램명: 정류소 구간뵬 평균속도 통계
작성자 : 박원용
작성일 : 2023-05-25
**/
$(function(){

	$('#sch_panel1').append('<input id="sch_lb2" name="sch_lb1" value="">');
  $('#sch_panel1').append('<input id="sch_lb3" name="sch_lb1" value="">');
	
  $('#sch_lb2').combobox({
    width: 200,
    height: 24,
    editable: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "SELECT_DIV"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '조회구분',
	    // value: '%',
		panelHeight:'auto',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      $(this).combobox('setValue', 'TIME');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

  $('#sch_lb3').combobox({
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
      $(this).combobox('setValue', 'DY001');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
  });

});