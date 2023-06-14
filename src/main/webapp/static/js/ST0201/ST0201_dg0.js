/** 
작성자 : 양현우
작성일 : 2023-04-06
수정자 : 양현우
수정일 : 2023-04-06
**/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'/st/ST0201G0R0',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : ""}}),						//json 조회 params
    singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    columns:[[
        {field:'ROUT_GRP',title:'노선그룹ID',width:150,halign:'center',align:'center'},
        {field:'ROUT_GRP_NM',title:'노선그룹명',width:100,halign:'center',align:'center'},
        {field:'ROUT_ID',title:'노선ID',width:150,halign:'center',align:'center'},
        {field:'ROUT_NM',title:'노선명',width:150,halign:'center',align:'left'},
			]],
		frozenColumns:[[
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
    loadFilter: function(a_data){
      return a_data;
    },
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg0'), -1);
			$.jf_setfooter($('#dg0'));
		},
		onBeforeLoad: function(param){
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
		},
		onSelect: function(index,a_row){
			//$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row), 'dma_param_ROUTEID');
      $.uf_sttnload(a_row.ROUT_ID);
      // $.uf_pivotload(a_row.ROUT_ID);
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});