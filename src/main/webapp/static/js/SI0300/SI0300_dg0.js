/*
프로그램명 : 운전자 관리 datagrid
작성자 : 박원용
작성일 : 2023.04.19
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
    $('#dg0').datagrid({
    url:'/si/SI0300G0R0',	
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
            {field:'DRV_NM',title:'운전자명',width:80,align:'center',halign:'center'},
            {field:'COMP_ID',title:'운수사ID',width:120,align:'center',halign:'center',hidden:true},//,hidden:true
            {field:'COMP_NM',title:'운수사명',width:150,align:'center',halign:'center',sortable:true},
            {field:'BUS_DIV',title:'버스구분',width:120,align:'center',halign:'center',hidden:true},
            {field:'BUS_DIV_NM',title:'버스구분',width:80,align:'center',halign:'center',sortable:true},
            {field:'EPLY_DATE1',title:'입사일',width:120,align:'center',halign:'center',sortable:true},
            {field:'EPLY_YN',title:'재직여부',width:120,align:'center',halign:'center',hidden:true},
            {field:'EPLY_YN_NM',title:'재직여부',width:80,align:'center',halign:'center',sortable:true},
            {field:'REMARK',title:'비고',width:500,align:'left',halign:'center'},
            {field:'ATTACH_YN',title:'사진 여부',width:80,align:'center',halign:'center',sortable:true},
        ]],
	frozenColumns:[[
            {field:'DRV_ID',title:'운전자 ID',width:120,align:'center',halign:'center',sortable:true},
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(data){
        for(let i=0; i < data.length; i++){
            if(typeof(data[i].ATTACH_ID) != "undefined" && data[i].ATTACH_ID != ""){
                data[i].ATTACH_YN = "Y";
            }else{
                data[i].ATTACH_YN = "N";
            }
        }
        return data;
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
