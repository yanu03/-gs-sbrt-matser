/** 
작성자 : 양현우
작성일 : 2023-04-05
수정자 : 양현우
수정일 : 2023-04-05
**/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'/si/SI0501G0R0',	//json 조회 url
    method: 'post',
    queryParams: JSON.stringify({"dma_search" : {"CONTENT" : ""}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'STTN_NM',title:'정류소명',width:250,halign:'center',align:'left'},
		{field:'AREA',title:'권역',width:150,halign:'center',align:'center',hidden:true},
        {field:'AREA_NM',title:'권역',width:150,halign:'center',align:'center'},
		// {field:'AREA',title:'권역',width:100,align:'center',halign:'center',formatter:function(value,row,index){return row.OWNER_TYPE_NAME;},
		// editor:{type:'combobox',options:{valueField:'OWNER_TYPE',textField:'OWNER_TYPE_NAME',method:'get',url:'datagrid_combodata4.json',
		// required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
        {field:'STTN_ENM',title:'정류소영문명',width:250,halign:'center',align:'left',hidden:true},
        {field:'STTN_NO',title:'정류소번호',width:100,halign:'center',align:'center'},
		{field:'GPS_Y',title:'위도',width:100,align:'right',halign:'center'},
		{field:'GPS_X',title:'경도',width:100,align:'right',halign:'center'},
        {field:'STTN_FCLT_TYPE',title:'정류소시설유형',width:100,halign:'center',align:'center',hidden:true},
        {field:'STTN_FCLT_TYPE_NM',title:'정류소시설유형',width:120,halign:'center',align:'center'},
		{field:'VHC_DOOR_DIR_TYPE',title:'버스문방향',width:100,align:'center',halign:'center',hidden:true},
		{field:'VHC_DOOR_DIR_TYPE_NM',title:'버스문방향',width:100,align:'center',halign:'center'},
		{field:'WAY_DIV',title:'상하행',width:100,align:'center',halign:'center',hidden:true},
		{field:'WAY_DIV_NM',title:'상하행',width:100,align:'center',halign:'center'},
		{field:'BAY_TYPE',title:'베이유형',width:100,align:'center',halign:'center',hidden:true},
		{field:'BAY_TYPE_NM',title:'베이유형',width:100,align:'center',halign:'center',},
		{field:'BAY_LEN',title:'베이길이(m)',width:100,align:'right',halign:'center'},
        {field:'LINE_CNT',title:'차선수',width:100,halign:'center',align:'right'},
		{field:'CENTER_YN',title:'중앙차로여부',width:100,align:'center',halign:'center'},
		{field:'STOP_TM_PEAK',title:'첨두시 정차시간(초)',width:150,align:'right',halign:'center'},
		{field:'STOP_TM_NONE_PEAK',title:'비첨두시 정차시간(초)',width:150,align:'right',halign:'center'},
		{field:'USE_YN',title:'사용여부',width:80,align:'center',halign:'center'},
		{field:'REMARK',title:'비고',width:300,halign:'center',align:'left'},
			]],
		frozenColumns:[[
		{field:'STTN_ID',title:'정류소ID',width:100,halign:'center',align:'left'}
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_protectform($('#dg0'),$('#ef0'), false, data.rows.length, 'nodata');
			$.jf_cleargrid($('#dg1'), data.rows.length);
			// $.jf_setfocus($('#dg0'), -1);
			// $.jf_setfooter($('#dg0'));
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
			$.jf_deleteoverlay();
			$.jf_movemap(row.GPS_X, row.GPS_Y);
			$.jf_addimgmarker(row, mapOption.NODE_TYPE.BUSSTOP);
			$.jf_addoverlay(row, mapOption.NODE_TYPE.BUSSTOP);
			$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
			$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});