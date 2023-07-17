/** 
작성자 : 양현우
작성일 : 2023-05-11
수정자 : 양현우
수정일 : 2023-05-11
**/
$(function(){
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
     url:'/mo/MO0101G0R0',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : "", TYPE:'ALL'}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터 수신중입니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'VHC_NO',title:'차량번호',width:150,halign:'center',align:'left'},
        {field:'CUR_SPD',title:'속도(km/h)',width:100,halign:'center',align:'right'},
		{field:'GPS_Y',title:'위도',width:100,align:'center',halign:'center'},
        {field:'GPS_X',title:'경도',width:100,halign:'center',align:'center'},
		{field:'OCR_DTM',title:'수신시간',width:100,align:'right',halign:'center'},
			]],
		frozenColumns:[[
		{field:'VHC_ID',title:'차량ID',width:100,halign:'center',align:'center'}
					]],
		loader: function(param, success, error){
			$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){

		},
		onBeforeLoad: function(param){},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){},
		onBeforeSelect: function(index,row){},
		onSelect: function(index,row){
			$.jf_movemap(row.GPS_X, row.GPS_Y);
			//기존에 있는 이벤트, 디스패치 오버레이 삭제해야함
			if($.jf_fndicostrct('_evt') != null) $.jf_deleteOverlay($.jf_fndicostrct('_evt'));
			if($.jf_fndicostrct('_dsptch') != null) $.jf_deleteOverlay($.jf_fndicostrct('_dsptch'));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});