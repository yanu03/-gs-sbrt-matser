/*
프로그램명 : 정류소 정차시간 통계 datagrid
작성자 : 박원용
작성일 : 2023.05.25
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
    $('#dg0').datagrid({
    url:'/st/ST0206G0R0',	
    method: 'POST',
    queryParams: JSON.stringify({dma_search : {ROUT_GRP:'RG001',WAY_DIV:'WD001'}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    checkOnSelect: true,
    columns:[[
            {field:'ROUT_GRP_NM',title:'노선그룹명',width:120,align:'center',halign:'center',sortable:true},
            {field:'NODE_NM',title:'정류소명',width:250,align:'left',halign:'center',sortable:true},
            {field:'ROUT_GRP',title:'노선그룹',width:120,align:'center',halign:'center',hidden:true},
            {field:'NODE_ID',title:'정류소ID',width:200,align:'left',halign:'center',hidden:true},
        ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){return true;},
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(index,row){
    },
    onSelect: function(a_index,a_row){
      uv_chkdata = false;
      // $.pf_childretrieve($('#dg1'));
      $.uf_changegrid();
      $.cf_chart0ajax(a_row.NODE_ID);
    },
    onUnselect: function(){},
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit: function(index,row){},
    onBeforeSortColumn: function(sort, order){},
	});

});