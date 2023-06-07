/** 
프로그램명: 정류소 구간뵬 평균속도 통계
작성자 : 박원용
작성일 : 2023-05-25
**/
$(function(){

	$('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0" value="">');
  $('#sch_panel0').append('<input id="sch_lb1" name="sch_lb0" value="">');
  $('#sch_panel0').append('<input id="sch_lb2" name="sch_lb0" value="">');
  $('#sch_panel0').append('<input id="sch_lb3" name="sch_lb0" value="">');
  $('#sch_panel0').append('<input id="sch_lb4" name="sch_lb0" value="">');
	
  $('#sch_lb0').combobox({
    width: 200,
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
      $.uf_changenode(newValue);
    }
	});

  $('#sch_lb1').combobox({
    width: 320,
    height: 24,
    editable: false,
    url: '/st/ST0201SHI1',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"ROUT_ID" : "RT00000003"}}),
    valueField: 'NODE_ID',
    textField: 'NODE_NM',
		label: '시작정류장',
	    // value: '%',
		panelHeight: 200,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      //$(this).combobox('setValue', '293055002');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

  $('#sch_lb2').combobox({
    width: 320,
    height: 24,
    editable: false,
    url: '/st/ST0201SHI1',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"ROUT_ID" : "RT00000003"}}),
    valueField: 'NODE_ID',
    textField: 'NODE_NM',
		label: '종료정류장',
	    // value: '%',
		panelHeight:200,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      //$(this).combobox('setValue', '293053009');
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

  $('#sch_lb4').combobox({
    width: 200,
    height: 24,
    editable: false,
    url: '/common/selectCommonDtlList',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "DAY_DIV"}}),
    valueField: 'DL_CD',
    textField: 'DL_CD_NM',
		label: '주말구분',
	    // value: '%',
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