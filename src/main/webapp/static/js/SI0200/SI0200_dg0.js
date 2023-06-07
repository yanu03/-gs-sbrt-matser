/*
프로그램명 : 차량관리 datagrid
작성자 : 박원용
작성일 : 2023.04.12
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg0').datagrid({
    url:'/si/SI0200G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE:"ALL",CONTENT : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
            {field:'COMP_ID',title:'운수사 명',width:150,align:'left',halign:'center',hidden:true},
            {field:'COMP_NM',title:'운수사명',width:150,align:'left',halign:'center',sortable:true},
            {field:'AREA',title:'권역',width:120,align:'left',halign:'center',hidden:true},
            {field:'AREA_NM',title:'권역',width:120,align:'left',halign:'center',sortable:true},
            {field:'CHAS_NO',title:'차대번호',width:200,align:'left',halign:'center'},
            {field:'MAKER',title:'제조사',width:80,align:'center',halign:'center',hidden:true},
            {field:'MAKER_NM',title:'제조사',width:100,align:'left',halign:'center',sortable:true},
            {field:'RELS_DT',title:'출고일자',width:120,align:'center',halign:'center',sortable:true},
            {field:'REMARK',title:'비고',width:500,align:'left',halign:'center'},
        ]],
	frozenColumns:[[
            {field:'VHC_ID',title:'차량 ID',width:120,align:'center',halign:'center',sortable:true},
            {field:'VHC_NO',title:'차량번호',width:120,align:'center',halign:'center',sortable:true}
		]],
	//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(data){
        return data;
    },
    onLoadSuccess: function(data){
        $.jf_protectform($('#dg0'), $('#ef0'), true, data.rows.length);
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){return true;},
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(index,row){
        return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f');
    },
    onSelect: function(a_index,a_row){
        $.jf_synctoform($('#dg0'),$('#ef0'), a_index, a_row);	//form edit일떄 사용
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit: function(index,row){},
    onBeforeSortColumn: function(sort, order){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return true;
        return false;
    },
	});

});