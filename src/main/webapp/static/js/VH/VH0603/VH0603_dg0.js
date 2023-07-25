/*
프로그램명 : 신호현시정보 이력 datagrid
작성자 : 박원용
작성일 : 2023.05.15
*/
$(function(){
   //single main grid
   $('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

  let v_fdate = $.tracomfromdate('d');
  let v_tdate = $.tracomtodate('d');

    $('#dg0').datagrid({
      view: scrollview,
      pageSize:250,
    url:'/vh/VH0603G0R0',   //json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({"dma_search" : {CONTENT1 : "", F_DATE : v_fdate, L_DATE : v_tdate}}),   //json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: false,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'UPD_DTM',title:'갱신일시',width:200,align:'center',halign:'center',sortable:true},
        {field:'CRS_NM',title:'교차로명',width:200,align:'left',halign:'center',sortable:true},
        {field:'CRS_ID',title:'교차로아이디',width:200,align:'left',halign:'center',hidden:true},
        {field:'CTR_STS',title:'제어기상태',width:100,align:'center',halign:'center',sortable:true},
        {field:'CTR_MODE',title:'신호제어모드',width:200,align:'center',halign:'center',sortable:true},
        {field:'A_PHASE_NO',title:'A_현시번호',width:150,halign:'center',align:'right',sortable:true},
        {field:'A_PHASE_TM',title:'A_현시진행시간',width:150,align:'right',halign:'center',sortable:true},
        {field:'B_PHASE_NO',title:'B_현시번호',width:150,halign:'center',align:'right',sortable:true},
        {field:'B_PHASE_TM',title:'B_현시진행시간',width:150,halign:'center',align:'right',sortable:true},
      ]],
      frozenColumns:[[
      ]],
      //event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
         let rtn_datas;
         rtn_datas = $.uf_formatcolumn(a_data);
      return rtn_datas;
    },
    onLoadSuccess: function(data){
            if(!data.total) return;
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
      onSortColumn: function(sort,order){

      },
   });

});