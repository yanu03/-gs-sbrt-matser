/** 
프로그램명: 정류소 구간뵬 평균속도 통계
작성자 : 박원용
작성일 : 2023-05-25
**/
$(function(){

	
  $('#sch_panel1').append('<input id="sch_lb1" name="sch_lb" value="">');
  $('#sch_panel1').append('<input id="sch_lb2" name="sch_lb" value="">');
	
  $('#sch_lb1').combobox({
    width: 320,
    height: 24,
    editable: false,
    url: 'http://localhost:8183/st/ST0201SHI1',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"ROUT_ID" : ""}}),
    valueField: 'NODE_ID',
    textField: 'NODE_NM',
		label: '시작정류장',
		panelHeight: 200,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(a_data){
      // debugger;
      if(a_data.length > 0) $(this).combobox('setValue', a_data[0].NODE_ID);
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

  $('#sch_lb2').combobox({
    width: 320,
    height: 24,
    editable: false,
    url: 'http://localhost:8183/st/ST0201SHI1',
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"ROUT_ID" : ""}}),
    valueField: 'NODE_ID',
    textField: 'NODE_NM',
		label: '종료정류장',
		panelHeight:200,
		loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)},
    onBeforeLoad: function(param){},
    onLoadSuccess: function(a_data){
      if(a_data.length > 0){
        $(this).combobox('setValue', a_data[0].NODE_ID);
        let v_selected = $('#dg0').datagrid('getSelected');
        $.pf_childretrieve($('#dg1'),v_selected.ROUT_ID); 
      } 
    },
    onLoadError: function(){return false;},
    onChange: function(newValue,oldValue){
    }
	});

});