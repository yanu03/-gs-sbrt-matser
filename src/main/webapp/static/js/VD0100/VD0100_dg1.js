/*
프로그램명 : 차내장치 정보 관리 datagrid1
작성자 : 박원용
작성일 : 2023.04.13
*/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg1').datagrid({
    //url:'js/AL0102/JSON file/AL0102_sample0.json',	//json 조회 url
    url:'/vd/VD0100G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    //method: 'GET', // json 데이터 가져올때는 GET 
    queryParams: {},//JSON.stringify({dma_search : {TYPE:"ALL",CONTENT:""}}),	//json 조회 params
    //queryParams: {},
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
      {field:'DVC_KIND_NM',title:'장치종류',width:250,align:'left',halign:'center',sortable:true},
      {field:'DVC_KIND',title:'장치종류',width:80,align:'center',halign:'center',hidden:true},
      {field:'MAKER',title:'제조사',width:120,align:'center',halign:'center',hidden:true},
      {field:'MAKER_NM',title:'제조사',width:120,align:'center',halign:'center',sortable:true},
      {field:'INST_LOC',title:'설치위치',width:120,align:'center',halign:'center',hidden:true},
      {field:'INST_LOC_NM',title:'설치위치',width:150,align:'left',halign:'center'},
      {field:'MNG_ID',title:'관리 ID',width:120,align:'center',halign:'center',sortable:true},
      {field:'DVC_IP',title:'장치 IP',width:120,align:'center',halign:'center',sortable:true},
      {field:'TRNS_TYPE',title:'통신유형',width:120,align:'center',halign:'center',hidden:true},
      {field:'TRNS_TYPE_NM',title:'통신유형',width:120,align:'center',halign:'center',sortable:true},
      {field:'REMARK',title:'비고',width:500,align:'left',halign:'center'}
    ]],
	frozenColumns:[[
      {field:'DVC_ID',title:'장치 ID',width:150,align:'center',halign:'center',sortable:true}
    ]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    onLoadSuccess: function(data){
      $.jf_protectform($('#dg1'), $('#ef0'), true, data.rows.length);
      $.jf_setfocus($('#dg1'), -1);
      $.jf_setfooter($('#dg1'));
    },
    onBeforeLoad: function(param){
      if(Object.keys(param).length < 1) return false;
			else return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){     
      if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f')){
          $.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
          $.jf_beginedit($('#dg1'), a_index);
      }
    },
    onBeforeSelect: function(index,row){
        //grid edit : g, form edit : f
        return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f');
    },
    onSelect: function(a_index,a_row){
        //$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));	//grid edit일때 사용
        $.jf_synctoform($('#dg1'),$('#ef0'), a_index, a_row);	//form edit일떄 사용
    },
    onBeforeEdit: function(a_index,a_row){
    },
    onBeginEdit: function(a_index,a_row){
    },
    onEndEdit: function(index,row,changes){
    },
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
      if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f')) return true;
      return false;
  },
	});

});