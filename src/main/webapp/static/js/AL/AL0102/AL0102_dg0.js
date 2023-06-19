/*
프로그램명 : 휴일관리 그리드

작성자 : 박원용
작성일 : 2023.04.06

수정자 : 박원용
수정일 : 2023.04.07
*/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');

    // 현제 년도 가져오기
    let date = new Date();
    // 2022년도 데이터 밖에 없어서 -1 해서 가져온다
    let getYear = date.getFullYear().toString();

    $('#dg0').datagrid({
    //url:'js/AL0102/JSON file/AL0102_sample0.json',	//json 조회 url
    url:'/al/AL0102G0R0',	//json 조회 url
    method: 'POST', // url 던져서 쿼리 가져올때는 POST
    //method: 'GET', // json 데이터 가져올때는 GET 
    queryParams: JSON.stringify({dma_search : {TYPE: "ALL", CONTENT : "", HOLY_DT : getYear}}),	//json 조회 params
    //queryParams: {},
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
        remoteSort: false,
        multiSort: true,
    columns:[[
        {field:'HOLI_DT',title:'날짜',width:100,align:'center',halign:'center',sortable:true},
        {field:'HOLI_NM',title:'공휴일/이벤트명',width:150,align:'left',halign:'center'},
        {field:'DAY_TYPE',title:'구분',width:80,halign:'center',align:'center',hidden:true},
        {field:'DAY_TYPE_NM',title:'구분',width:80,halign:'center',align:'center',sortable:true},
        {field:'REMARK',title:'비고',width:500,align:'left',halign:'center'},
    	]],
	frozenColumns:[[
		]],
		//event 정의
    loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
    },
    loadFilter : function(a_data){
        return a_data;
    },
    onLoadSuccess: function(a_data){
        $.jf_protectform($('#dg0'), $('#ef0'), true, a_data.rows.length);
        $.jf_setfocus($('#dg0'), -1);
        $.jf_setfooter($('#dg0'));
    },
    onBeforeLoad: function(param){
        return true;
    },
    onClickRow: function(index,row){},
    onDblClickRow: function(index,row){},
    onBeforeSelect: function(index,row){
        return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f');
    },
    onSelect: function(a_index,a_row){
        $.jf_synctoform($('#dg0'),$('#ef0'), a_index, a_row);	//form edit일떄 사용
    },
    onBeforeEdit: function(index,row){},
    onBeginEdit: function(index,row){},
    onEndEdit: function(index,row,changes){},
    onAfterEdit: function(index,row,changes){},
    onCancelEdit:function(index,row){},
    onBeforeSortColumn: function(sort, order){
        if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')) return true;
        return false;
    },
	});

});