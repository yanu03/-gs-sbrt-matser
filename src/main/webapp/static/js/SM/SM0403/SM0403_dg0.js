/*
프로그램명 : 로그인 이력 조회 datagrid
작성자 : 박원용
작성일 : 2023.04.11
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    var f_date = $.tracomfromdate('m');
    var l_date = $.tracomtodate('d');
    $('#dg0').datagrid({
    url:'/sm/SM0403G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : "",F_DATE : f_date, L_DATE : l_date}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'OCR_DTM',title:'발생일시',width:180,align:'center',halign:'center',sortable:true},
        {field:'USER_ID',title:'사용자 ID',width:180,align:'left',halign:'center',sortable:true},
        {field:'USER_NM',title:'사용자명',width:80,halign:'center',align:'center',sortable:true},
        {field:'LOGIN_STS',title:'발생유형',width:200,halign:'center',align:'center',hidden:true},
        {field:'LOGIN_STS_NM',title:'발생유형',width:200,halign:'center',align:'center',sortable:true},
        {field:'IP',title:'접속 IP',width:150,align:'center',halign:'center'},
    	]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){  $.tracomdgloader($(this), param, success, error);
    },
    onLoadSuccess: function(data){
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
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