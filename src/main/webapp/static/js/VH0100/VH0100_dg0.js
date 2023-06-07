/*
프로그램명 : 버스 운행지시 전송 이력 조회 datagrid
작성자 : 박원용
작성일 : 2023.05.11
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg0').datagrid({
    url:'/vh/VH0100G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({"dma_search" : {"TYPE" : "All", "CONTENT1" : "", "CONTENT2" : "", "CONTENT3" : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'SEND_DTM',title:'전송일시',width:200,align:'center',halign:'center',sortable:true},
        {field:'REP_ROUT_NM',title:'대표노선명',width:200,align:'center',halign:'center',sortable:true},
        {field:'ROUT_NM',title:'노선명',width:200,align:'center',halign:'center',sortable:true},
        {field:'VHC_NO',title:'차량번호',width:200,align:'center',halign:'center',sortable:true},
        {field:'DRV_NM',title:'운영자명',width:200,halign:'center',align:'left',sortable:true},
        {field:'NODE_MN',title:'노드명',width:200,align:'left',halign:'center',sortable:true},
        {field:'LINK_NM',title:'링크명',width:200,halign:'center',align:'left'},
        {field:'DSPTCH_DIV',title:'구분',width:200,halign:'center',align:'center',sortable:true},
        {field:'DSPTCH_CONTS',title:'디스패치 내용',width:200,halign:'center',align:'left'},
      ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(data){
      return data;
    },
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){},
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){},
    onBeforeSelect: function(index,row){},
    onSelect: function(a_index,a_row){
      $.uf_movemap(a_index, a_row);
    },
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){},
    onEndEdit: function(a_index,a_row,a_changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){},
	});

});