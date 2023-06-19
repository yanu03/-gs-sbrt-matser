/** 
작성자 : 양현우
작성일 : 2023-05-11
수정자 : 양현우
수정일 : 2023-05-11
**/
$(function(){
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'/mo/MO0203G0R0',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : "", TYPE:'ALL'}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'left',hidden:true},
        {field:'NODE_ID',title:'정류소ID',width:100,halign:'center',align:'left'},
        {field:'NODE_SN',title:'노드순번',width:100,halign:'center',align:'center',hidden:true},
		{field:'NODE_NM',title:'정류소명',width:250,align:'left',halign:'center'},
		{field:'NODE_ENM',title:'노드영문명',width:100,align:'left',halign:'center',hidden:true},
		{field:'NODE_TYPE',title:'노드유형',width:100,align:'center',halign:'center',hidden:true},
		{field:'NODE_TYPE_NM',title:'노드유형',width:100,align:'center',halign:'center',hidden:true},
		{field:'STTN_ID',title:'정류소ID',width:100,align:'center',halign:'center',hidden:true},
		{field:'STTN_NO',title:'정류소번호',width:100,align:'center',halign:'center'},
        {field:'GPS_Y',title:'위도',width:100,halign:'center',align:'center',hidden:true},
        {field:'GPS_X',title:'경도',width:100,halign:'center',align:'center',hidden:true},
			]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_deletemarker();
			$.jf_deleteoverlay();
			for(var i=0; i<data.rows.length; i++) {
				$.jf_addimgmarker(data.rows[i]);
				$.jf_addoverlay(data.rows[i]);			
			}
			$.jf_setfocus($('#dg0'), $.jf_fnddgstrct($('#dg0')));
			$.jf_setfooter($('#dg0'));
		},
		onBeforeLoad: function(param){},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){},
		onBeforeSelect: function(index,row){},
		onSelect: function(index,row){
			$.jf_movemap(row.GPS_X, row.GPS_Y);
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});