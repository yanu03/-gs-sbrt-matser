/*
프로그램명 : 운수사 정보 관리 datagrid
작성자 : 박원용
작성일 : 2023.04.11
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
    $('#dg0').datagrid({
    url:'/si/SI0102G0R0',	
    method: 'POST',
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
            {field:'AREA',title:'권역',width:120,align:'left',halign:'center',hidden:true},
            {field:'AREA_NM',title:'권역',width:120,align:'left',halign:'center',sortable:true},
            {field:'REP_NM',title:'대표자 명',width:80,align:'center',halign:'center'},
            {field:'COMP_REG_NO',title:'사업자등록번호',width:120,align:'left',halign:'center'},
            {field:'ADDR',title:'주소',width:400,align:'left',halign:'center'},
            {field:'PHONE',title:'전화번호',width:150,align:'center',halign:'center'},
            {field:'FAX',title:'팩스',width:150,align:'center',halign:'center'},
            {field:'EMAIL',title:'메일',width:200,align:'left',halign:'center'},
            {field:'DRV_CNT',title:'운전자수',width:80,align:'right',halign:'center',sortable:true},
            {field:'SVC_ROUT_CNT',title:'운행노선수',width:100,align:'right',halign:'center',sortable:true},
            {field:'LIC_VHC_CNT',title:'면허차대수',width:100,align:'right',halign:'center',sortable:true},
            {field:'SPR_VHC_CNT',title:'예비차대수',width:100,align:'right',halign:'center',sortable:true},
            {field:'REMARK',title:'비고',width:400,align:'left',halign:'center'},
        ]],
	frozenColumns:[[
            {field:'COMP_ID',title:'운수사 ID',width:120,align:'center',halign:'center',sortable:true},
            {field:'COMP_NM',title:'운수사 명',width:150,align:'left',halign:'center',sortable:true}
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    onLoadSuccess: function(data){
        $.jf_protectform($('#dg0'),$('#ef0'), true, data.rows.length);
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