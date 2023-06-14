/*
프로그램명 : 우선신호 발생 이력 datagrid
작성자 : 박원용
작성일 : 2023.05.11
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    let v_fdate = $.tracomfromdate('d');
    let v_tdate = $.tracomtodate('d');

    $('#dg0').datagrid({
    url:'http://localhost:8183/vh/VH0602G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({"dma_search" : {CONTENT1 : "", F_DATE : v_fdate, L_DATE : v_tdate}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'UPD_DTM',title:'갱신일시',width:200,align:'center',halign:'center',sortable:true},
        {field:'ROUT_GRP_NM',title:'노선그룹명',width:150,align:'center',halign:'center',sortable:true},
        {field:'ROUT_NM',title:'노선명',width:200,align:'left',halign:'center',sortable:true},
        {field:'CRS_NM',title:'교차로명',width:200,align:'center',halign:'center',sortable:true},
        {field:'VHC_NO',title:'차량번호',width:180,align:'center',halign:'center',sortable:true},
        {field:'CTRL_TYPE_NM',title:'교차로우선신호제어방식',width:200,halign:'center',align:'center',sortable:true},
        {field:'CTRL_LV',title:'우선신호제어단계',width:180,align:'right',halign:'center',sortable:true},
        {field:'STOP_SEC',title:'정류소요구대기시간',width:180,halign:'center',align:'right',sortable:true},
        {field:'CTRL_PHASE_NO',title:'교차로우선신호제어현시',width:180,halign:'center',align:'right',sortable:true},
        {field:'OCR_DTM',title:'발생일시',width:190,halign:'center',align:'center',sortable:true},
      ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
      let rtn_data;
      rtn_data = $.uf_formatcolumn(a_data);
      return a_data;
    },
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){},
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){},
    onBeforeSelect: function(index,row){},
    onSelect: function(a_index,a_row){},
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){},
    onEndEdit: function(a_index,a_row,a_changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){},
	});

});