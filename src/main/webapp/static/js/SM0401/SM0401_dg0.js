/*
프로그램명 : 사용자 관리 그리드

작성자 : 박원용
작성일 : 2023.04.28
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
    $('#dg0').datagrid({
    url:'/member/searchMemberBasic',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : "",USE_YN: "All"}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'USER_ID',title:'사용자ID',width:120,align:'left',halign:'center',sortable:true},
        {field:'USER_NM',title:'사용자명',width:150,align:'left',halign:'center'},
        {field:'AUTH_CD',title:'권한그룹',width:80,halign:'center',align:'center',hidden:true},
        {field:'AUTH_NM',title:'권한그룹',width:120,halign:'center',align:'left',sortable:true},
        {field:'REMARK',title:'비고',width:500,align:'left',halign:'center'},
    	]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
        return a_data;
    },
    onLoadSuccess: function(a_data){
        $.jf_protectform($('#dg0'), $('#ef0'), true, a_data.rows.length);   //form이 없을 경우 적용하지 않아도 됨.
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(index,row){
        return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f');
    },
    onSelect: function(a_index,a_row){
        $.jf_synctoform($('#dg0'),$('#ef0'), a_index, a_row);	//form edit일떄 사용
        $.uf_unlockbox();
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return true;
        return false;
    },
	});

});