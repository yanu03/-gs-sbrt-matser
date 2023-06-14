/*
프로그램 명 : 배차별 운전자 관리 datagrid2
작성자 : 박원용
작성일 : 2023.05.01
*/
$(function(){
	//single main grid
	$('#dg_panel2').append('<table id="dg2" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    $('#dg2').datagrid({
    //url:'js/AL0102/JSON file/AL0102_sample0.json',	//json 조회 url
    url:'/al/AL0105G2R0',	//json 조회 url http://192.168.34.9:8181/repRout/selectRepRoutList
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    //method: 'GET', // json 데이터 가져올때는 GET
    queryParams: JSON.stringify({dma_search : {ALLOCID:"",CONTENT : ""}}),	//json 조회 params
    //queryParams: {},
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
      
      {field:'DRV_ID',title:'운전자 ID',width:110,align:'center',halign:'center',sortable:true},
      {field:'DRV_NM',title:'운전자명',width:110,align:'center',halign:'center',sortable:true},
      {field:'PHONE',title:'전화번호',width:130,align:'center',halign:'center',sortable:true},
      {field:'COMP_NM',title:'운수사',width:130,align:'left',halign:'center',sortable:true},
      {field:'BUS_DIV',title:'버스구분',width:170,align:'left',halign:'center',hidden:true},
      {field:'BUS_DIV_NM',title:'버스구분',width:170,align:'left',halign:'center',sortable:true},
      {field:'EPLY_DATE1',title:'입사일',width:170,align:'center',halign:'center',sortable:true},
    	]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter: function(a_data){
      uv_dg2data = a_data;
      return a_data;
    },
    onLoadSuccess: function(a_data){
        $.uf_comparedata();
        $.jf_setfocus($('#dg2'), -1);
        $.jf_setfooter($('#dg2'));
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
    onCancelEdit: function(index,row){}
	});

});