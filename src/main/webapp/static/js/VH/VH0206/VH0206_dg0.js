/*
프로그램명 : 차내장치 상태 이력 datagrid
작성자 : 박원용
작성일 : 2023.05.11
*/
$(function(){
   //single main grid
   $('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
   
      var v_fdate = $.tracomfromdate('d');
      var v_tdate = $.tracombasicdate();
    $('#dg0').datagrid({
      view:scrollview,
      pageSize:250,
    url:'/vh/VH0206G0R0',   //json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({"dma_search" : {"TYPE" : "All", "CONTENT1" : "", "CONTENT2" : "", "CONTENT3" : "", "F_DATE":v_fdate, "L_DATE":v_tdate}}),   //json 조회 params
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
        {field:'UPD_DTM',title:'갱신일시',width:200,align:'center',halign:'center',sortable:true},
        {field:'VHC_ID',title:'차량아이디',width:180,align:'center',halign:'center',sortable:true},
        {field:'VHC_NO',title:'차량번호',width:180,align:'center',halign:'center',sortable:true},
        {field:'DVC_ID',title:'장치아이디',width:150,halign:'center',align:'center',sortable:true},
        {field:'DVC_KIND',title:'장치종류',width:200,align:'left',halign:'center',hidden:true},
            {field:'DVC_KIND_NM',title:'장치종류',width:200,align:'center',halign:'center',sortable:true},
        {field:'PARAM_DIV',title:'매개변수구분',width:200,halign:'center',align:'left',hidden:true},
            {field:'PARAM_DIV_NM',title:'매개변수구분',width:150,halign:'center',align:'center',sortable:true},
        {field:'PARAM_KIND',title:'매개변수종류',width:200,halign:'center',align:'center',hidden:true},
            {field:'PARAM_KIND_NM',title:'매개변수종류',width:150,halign:'center',align:'left',sortable:true},
        {field:'MNG_ID',title:'관리아이디',width:200,halign:'center',align:'left'},
        {field:'DATA_VAL',title:'데이터값',width:150,halign:'center',align:'right',sortable:true},
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
            if(!data.total) return;
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){},
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){},
    onBeforeSelect: function(index,row){},
    onSelect: function(a_index,a_row){
      // $.uf_movemap(a_index, a_row);
    },
    onBeforeEdit: function(a_index,a_row){},
    onBeginEdit: function(a_index,a_row){},
    onEndEdit: function(a_index,a_row,a_changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){},
   });

});