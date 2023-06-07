/** 
작성자 : 양현우
작성일 : 2023-05-16
수정자 : 양현우
수정일 : 2023-05-16
**/
$(function(){
	$('#dg_panel1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
		url:'/mo/MO0204G1R0',	//json 조회 url
		method: 'post',
		//queryParams: {},
		singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
		columns:[[
			{field:'DVC_ID',title:'장치ID',width:150,halign:'center',align:'left'},
			{field:'DVC_KIND',title:'장치종류',width:260,halign:'center',align:'left'},
			{field:'DVC_KIND_NM',title:'장치종류',width:260,halign:'center',align:'left'},
			{field:'PK001',title:'리셋',width:100,halign:'center',align:'left'},
			{field:'PK002',title:'전원(ON/OFF)',width:100,halign:'center',align:'left'},
			{field:'PK003',title:'화면(ON/OFF)',width:100,halign:'center',align:'left'},
			{field:'PK004',title:'사운드 음량',width:100,halign:'center',align:'left'},
			{field:'PK005',title:'LCD 휘도',width:100,halign:'center',align:'left'},
			{field:'PK006',title:'히터(ON/OFF)',width:100,halign:'center',align:'left'},
			{field:'PK007',title:'FAN(ON/OFF)',width:100,halign:'center',align:'left'},
			{field:'PK008',title:'커맨드',width:100,halign:'center',align:'left'},
			{field:'PK009',title:'BIT 캡처',width:100,halign:'center',align:'left'},
			{field:'PK010',title:'BIT 영상 녹화',width:100,halign:'center',align:'left'},
			{field:'PK011',title:'로그레벨',width:100,halign:'center',align:'left'},
			{field:'PK012',title:'IP/PORT',width:100,halign:'center',align:'left'},
			{field:'PK013',title:'통신',width:100,halign:'center',align:'left'},
			{field:'PK014',title:'AP',width:100,halign:'center',align:'left'},
			{field:'PK015',title:'GPS',width:100,halign:'center',align:'left'},
			{field:'PK016',title:'집중모니터링여부',width:100,halign:'center',align:'left'},
			{field:'PK017',title:'정주기 주기',width:100,halign:'center',align:'left'},
			{field:'PK018',title:'배터리',width:100,halign:'center',align:'left'}
				]],
			loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
			},
			//event 정의
			onLoadSuccess: function(data){
				$.jf_setfocus($('#dg1'), -1);
				$.jf_setfooter($('#dg1'));
				$.uf_makeimg($('#dg0'), data.rows, $('#img_panel0'));
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
				$.uf_matchimg($('#dg1'), row);
			},
			onBeforeEdit: function(index,row){},
			onBeginEdit: function(index,row){},
			onEndEdit: function(index,row,changes){},
			onAfterEdit: function(index,row,changes){},
			onCancelEdit:function(index,row){}
	});

});