/** 
작성자 : 양현우
작성일 : 2023-05-11
수정자 : 양현우
수정일 : 2023-05-11
**/
$(function(){
	$('#dg_panel2').append('<table id="dg2" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg2').datagrid({
		url:'/mo/SI0402G1R0',	//json 조회 url
		method: 'post',
		queryParams: {},						//json 조회 params
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터 수신중입니다',
		rownumbers: true,
		showFooter: true,
		columns:[[
			{field:'VHC_NO',title:'차량번호',width:150,halign:'center',align:'left'},
			{field:'SEND_DATE',title:'전송시간',width:100,halign:'center',align:'left'},
			{field:'DSPTCH_DIV',title:'디스패치유형',width:150,halign:'center',align:'left',hidden:true},
			{field:'DSPTCH_DIV_NM',title:'디스패치유형',width:150,halign:'center',align:'left'},
			{field:'DSPTCH_CONTS',title:'디스패치내용',width:200,halign:'center',align:'left'}
				]],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				$.jf_setfocus($('#dg1'), -1);
				$.jf_setfooter($('#dg1'));
			},
			onBeforeLoad: function(param){if(Object.keys(param).length < 1) return false;},
			onClickRow: function(index,row){},
			onDblClickRow: function(index,row){},
			onBeforeSelect: function(index,row){},
			onSelect: function(index,row){
				// $.jf_movemap(row.GPS_X, row.GPS_Y);
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(a_index,a_row,a_changes){},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){}
	});

});