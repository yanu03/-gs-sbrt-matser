
/** 
프로그램명: 정류소 구간뵬 평균속도 통계
작성자 : 박원용
작성일 : 2023-05-25
**/
$(function(){
  $('#sch_panel0').append('<input id="sch_lb0" name="sch_lb0" value="">');

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
    panelHeight:'230',
    loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    loadFilter: function(a_data){
      let rtn_value;
      rtn_value = $.uf_addvalue(a_data);
      return rtn_value;
    },
    onBeforeLoad: function(param){},
    onLoadSuccess: function(){
      $(this).combobox('setValue', '');
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
      $.jf_retrieve($('#dg0'));
    }
  });

});