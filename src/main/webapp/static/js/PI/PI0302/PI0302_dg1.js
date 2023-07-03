/*
프로그램명 : 뉴스 관리 datagrid
작성자 : 박원용
작성일 : 2023.04.25
*/
$(function(){
   //single main grid
   $('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg1').datagrid({
      view: scrollview,
      pageSize:250,
    url:'/pi/PI0302G1R0',   //json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE:"ALL",CONTENT : "",USE_YN : ""}}),   //json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    //rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
      {field:'VHC_NO',title:'차량번호',width:180,align:'center',halign:'center'},
      {field:'MNG_ID',title:'관리 아이디',width:150,align:'center',halign:'center',sortable:true},
      {field:'SEND_DT',title:'전송일시',width:180,align:'center',halign:'center',sortable:true},
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
         if(!data.total){
            return;
         }
      $.jf_setfocus($('#dg1'), -1);
      $.jf_setfooter($('#dg1'));
    },
    onBeforeLoad: function(param){
      return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(index,row){},
    onSelect: function(a_index,a_row){},
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit: function(index,row){},
   });

});