/*
프로그램 명 : 배차별 차량 관리 datagrid1
작성자 : 박원용
작성일 : 2023.04.08

수정자 : 박원용
수정일 : 2023.04.25
*/
$(function(){
	//single main grid
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg1').datagrid({
    url:'/al/AL0104G1R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE:"ALL",CONTENT : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
        {field:'VHC_ID',title:'차량 ID',width:110,align:'center',halign:'center',sortable:true},
        {field:'VHC_NO',title:'차량번호',width:110,align:'center',halign:'center',sortable:true},
        {field:'COMP_NM',title:'운수사',width:130,align:'left',halign:'center',sortable:true},
        {field:'MAKER',title:'제조사',width:110,align:'left',halign:'center',hidden:true},
        {field:'MAKER_NM',title:'제조사',width:110,align:'left',halign:'center',sortable:true},
        {field:'VHC_FUEL',title:'연료',width:170,align:'left',halign:'center',hidden:true},
        {field:'VHC_FUEL_NM',title:'연료',width:170,align:'left',halign:'center',sortable:true},
        ]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
        uv_dg1data = a_data
        return a_data;
    },
    onLoadSuccess: function(data){
        $.uf_comparedata();
        $.jf_setfocus($('#dg1'), -1);
        $.jf_setfooter($('#dg1'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(index,row){
    },
    onSelect: function(a_index,a_row){
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit: function(index,row){}
	});

});