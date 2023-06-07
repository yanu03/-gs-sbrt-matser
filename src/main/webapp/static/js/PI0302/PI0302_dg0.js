/*
프로그램명 : 뉴스 관리 datagrid
작성자 : 박원용
작성일 : 2023.04.25
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg0').datagrid({
    url:'/pi/PI0302G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    queryParams: JSON.stringify({dma_search : {TYPE:"ALL",CONTENT : "",USE_YN : ""}}),	//json 조회 params
    singleSelect: true,
    border: false,
    loadMsg: '데이터 로딩중입니다',
    emptyMsg: '데이터가 없습니다',
    //rownumbers: true,
    showFooter: true,
    remoteSort: false,
    multiSort: true,
    columns:[[
      {field:'SN',title:'순번',width:50,align:'center',halign:'center',sortable:true},
      {field:'CATEGORY',title:'범주',width:120,align:'left',halign:'center',sortable:true},
      {field:'PROV_NM',title:'뉴스 제공처',width:120,align:'left',halign:'center',sortable:true},
      {field:'NEWS_TITLE',title:'뉴스 제목',width:500,align:'left',halign:'center'},
      {field:'PUB_DT',title:'출판일시',width:150,align:'center',halign:'center',sortable:true},
      {field:'REAMRK',title:'비고',width:250,align:'left',halign:'center'}
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
      $.jf_setfocus($('#dg0'), -1);
      $.jf_setfooter($('#dg0'));
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