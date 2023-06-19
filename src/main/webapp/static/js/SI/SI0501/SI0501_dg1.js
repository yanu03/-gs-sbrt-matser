/** 
작성자 : 양현우
작성일 : 2023-04-05
수정자 : 양현우
수정일 : 2023-04-05
**/
$(function(){
	$('#tab0').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
    url:'/repRout/selectRepRoutListByNode',	//json 조회 url
    method: 'post',
    //queryParams: JSON.stringify({dma_sub_search : {STTN_ID : ""}}),						//json 조회 params
    // queryParams: {},
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'ROUT_NM',title:'노선명',width:100,halign:'center',align:'left'},
        {field:'ST_STTN_NM',title:'기점명',width:225,halign:'center',align:'left'},
        {field:'ED_STTN_NM',title:'종점명',width:225,halign:'center',align:'left'},
		{field:'',title:'',width:0,halign:'center',align:'left'},
			]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},			
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg1'), -1);
			$.jf_setfooter($('#dg1'));
		},
		onBeforeLoad: function(param){
			if(Object.keys(param).length < 1) return false;
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
		},
		onSelect: function(index,row){
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});