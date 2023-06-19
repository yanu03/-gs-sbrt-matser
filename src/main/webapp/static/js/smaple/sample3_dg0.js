/** 
작성자 : 양현우
작성일 : 2023-03-31
수정자 : 양현우
수정일 : 2023-03-31
**/
$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg0" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg0').datagrid({
    url:'datagrid_data3.json',	//json 조회 url
    method: 'get',
    queryParams: {},						//json 조회 params
		singleSelect: false, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'GRG_NM',title:'차고지명',width:250,halign:'center',align:'left',editor:{type:'textbox', options:{required:true,validType:['length[0,20]']}}},
        {field:'GRG_ENM',title:'차고지영문명',width:100,halign:'center',align:'left',editor:{type:'textbox',options:{validType:['length[0,20]']}}},
        {field:'OWNER_TYPE',title:'소유형태',width:100,align:'center',halign:'center',formatter:function(value,row,index){return row.OWNER_TYPE_NAME;},
			editor:{type:'combobox',options:{valueField:'OWNER_TYPE',textField:'OWNER_TYPE_NAME',method:'get',url:'datagrid_combodata4.json',
			required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
        {field:'ADDR',title:'주소',width:300,halign:'center',editor:{type:'textbox', options:{required:true,validType:['length[0,50]']}}},
        {field:'PHONE',title:'전화번호',width:150,halign:'center',align:'left',editor:{type:'textbox', options:{validType:['length[0,12]']}}},
        {field:'FAX',title:'팩스',width:150,halign:'center',align:'left',editor:{type:'textbox', options:{validType:['length[0,12]']}}},
        {field:'EMAIL',title:'이메일',width:200,halign:'center',align:'left',editor:{type:'textbox', options:{validType:['length[0,50]']}}},
		{field:'CNG_YN',title:'CNG충전여부',width:100,align:'center',halign:'center',editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
		{field:'ELEC_YN',title:'전기충전여부',width:100,align:'center',halign:'center',editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
		{field:'LEGAL_AREA',title:'법적면적',width:100,align:'right',halign:'center',editor:{type:'numberbox',options:{precision:2,min:0,max:10000}}},
		{field:'SECURE_AREA',title:'확보면적',width:100,align:'right',halign:'center',editor:{type:'numberbox',options:{precision:2,min:0,max:10000}}},
		{field:'GPS_X',title:'경도',width:100,align:'right',halign:'center',editor:{type:'numberbox',options:{precision:2,min:0,max:1000}}},
		{field:'GPS_Y',title:'위도',width:100,align:'right',halign:'center',editor:{type:'numberbox',options:{precision:2,min:0,max:1000}}},
		{field:'USE_YN',title:'사용여부',width:80,align:'center',halign:'center',editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
		{field:'REMARK',title:'비고',width:300,halign:'center',align:'left',editor:{type:'textbox', options:{validType:['length[0,60]']}}},
    				]],
		frozenColumns:[[
		{field:'CHK', checkbox:true},
		{field:'GRG_ID',title:'차고지ID',width:100,halign:'center',align:'left',editor:{type:'textbox', options:{required:true,validType:['length[0,10]']}}}
						]],
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg0'), -1);
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
			$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});