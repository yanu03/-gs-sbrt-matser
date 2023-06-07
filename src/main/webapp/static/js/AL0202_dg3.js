/** 
작성자 : 양현우
작성일 : 2023-05-03
수정자 : 양현우
수정일 : 2023-05-03
**/
$(function(){
	//single main grid
	$('#dg_panel3').append('<table id="dg3" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg3').datagrid({
    url:'/common/selectCommonDtlList',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {"CO_CD" : "ROUT_SPE"}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
	multiSort: true,
	remoteSort: false,
    columns:[[
        {field:'REMARK',title:'비고',width:150,halign:'center',align:'left',sortable:true},
			]],
		frozenColumns:[[
		{field:'DL_CD_NM',title:'특수노선명',width:100,halign:'center',align:'center'}
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg3'), $.jf_fnddgstrct($('#dg3')));
			$.jf_setfooter($('#dg3'));
		},
		onBeforeLoad: function(param){
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
			//return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')
		},
		onSelect: function(index,row){
			//$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
			//$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});