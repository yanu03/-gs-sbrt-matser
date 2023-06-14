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
    url: 'http://localhost:8183/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "CTR_STS"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '제어기상태',
	    // value: '%',
		panelHeight:'150',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    loadFilter: function(a_data){
      let rtn_value;
      rtn_value = $.uf_addvalue(a_data);
      return rtn_value;
    },
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      $(this).combobox('setValue', 'all');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});
	$('#sch_lb1').combobox({
    width: 220,
    height: 24,
    editable: false,
    url: 'http://localhost:8183/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "CTR_MODE"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '신호제어모드',
		labelWidth: 100,
	    // value: '%',
		panelHeight:'120',
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    loadFilter: function(a_data){
      let rtn_value;
      rtn_value = $.uf_addvalue(a_data);
      return rtn_value;
    },
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      $(this).combobox('setValue', 'all');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

});