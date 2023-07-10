/** 
작성자 : 양현우
작성일 : 2023-04-06
수정자 : 양현우
수정일 : 2023-04-06
**/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'/si/SI0503G0R0',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : "", TYPE:'ALL'}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'CRS_NM',title:'교차로명',width:250,halign:'center',align:'left'},
        // {field:'CRS_KIND',title:'교차로종류',width:100,halign:'center',align:'center'},
        {field:'CRS_KIND_NM',title:'교차로종류',width:100,halign:'center',align:'center'},
        // {field:'SIG_CTR_TYPE',title:'신호제어기 유형',width:130,halign:'center',align:'center'},
        {field:'SIG_CTR_TYPE_NM',title:'신호제어기 유형',width:150,halign:'center',align:'center'},
		{field:'GPS_Y',title:'위도',width:100,align:'right',halign:'center'},
		{field:'GPS_X',title:'경도',width:100,align:'right',halign:'center'},
        {field:'MAIN_CRS_YN',title:'주요교차로여부',width:110,halign:'center',align:'center'},
		{field:'PDSTRN_DET_YN',title:'보행자감지여부',width:110,align:'center',halign:'center'},
		{field:'USE_YN',title:'사용여부',width:80,align:'center',halign:'center'},
		{field:'REMARK',title:'비고',width:300,halign:'center',align:'left'},
			]],
		frozenColumns:[[
		{field:'CRS_ID',title:'교차로ID',width:100,halign:'center',align:'center'}
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_protectform($('#dg0'), $('#ef0'), false, data.rows.length, 'nodata');
			$.jf_cleargrid($('#dg1'), data.rows.length);
			$.jf_setfocus($('#dg0'), $.jf_fnddgstrct($('#dg0')));
			$.jf_setfooter($('#dg0'));
		},
		onBeforeLoad: function(param){
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
			return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f')
		},
		onSelect: function(index,row){
			$.jf_deletemarker();
			$.jf_deleteAllOverlay();
			$.jf_movemap(row.GPS_X, row.GPS_Y);
			$.jf_addimgmarker(row, mapOption.NODE_TYPE.CROSS);
			$.jf_addoverlay(row, mapOption.NODE_TYPE.CROSS);	
			$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
			$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row));
			// $.jf_childretrieve($('#dg1'));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});