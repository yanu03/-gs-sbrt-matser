/*
프로그램명 : 기상 관리 
작성자 : 박원용
작성일 : 2023.04.26
*/
$(function(){
   //single main grid
   $('#dg_panel0').append('<table id="dg2" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg2').datagrid({
      view: scrollview,
      pageSize:250,
    url:'/pi/PI0400G2R0',   //json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {}}),   //json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: false,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'VHC_NO',title:'차량번호',width:180,align:'center',halign:'center',sortable:true},
        {field:'MNG_ID',title:'관리 ID',width:180,align:'left',halign:'center',sortable:true},
        {field:'SEND_DT',title:'전송일시',width:180,halign:'center',align:'center',sortable:true},
    ]],
   frozenColumns:[[
      ]],
      //event 정의
    loader: function(param, success, error){  $.tracomdgloader($(this), param, success, error);
    },
    onLoadSuccess: function(data){
            if(!data.total) return;
        //.jf_setfocus($('#dg2'), -1);
        $.jf_setfooter($('#dg2'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(a_index,row){
    },
    onBeforeSelect: function(index,row){
    },
    onSelect: function(a_index,a_row){
        // $.jf_moddgstrct($('#dg0'), a_index);
    },
    onBeforeEdit: function(a_index,a_row){
        
    },
    onBeginEdit: function(a_index,a_row){
        //$.pf_checkedit(a_index);
    },
    onEndEdit: function(index,row,changes){
        
    },
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){}
   });

});