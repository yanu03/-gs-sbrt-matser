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
    url:'/si/SI0401G0R0',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : "", TYPE:'ALL'}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'ROUT_NM',title:'노선명',width:150,halign:'center',align:'left'},
        // {field:'REP_ROUT_ID',title:'그룹노선아이디',width:100,halign:'center',align:'center'},
        {field:'ROUT_GRP',title:'노선그룹',width:100,halign:'center',align:'center',hidden:'true'},
        {field:'ROUT_GRP_NM',title:'노선그룹',width:100,halign:'center',align:'center'},
        // {field:'SIG_CTR_TYPE',title:'신호제어기 유형',width:130,halign:'center',align:'center'},
        {field:'AREA_NM',title:'권역',width:100,halign:'center',align:'center',hidden:true},
		{field:'ST_STTN_ID',title:'시작정류소ID',width:100,align:'left',halign:'center',hidden:'true'},
		{field:'ST_STTN_NM',title:'시작정류소명',width:250,align:'left',halign:'center',hidden:true},
		{field:'ST_STTN_ENM',title:'시작정류소영문명',width:250,align:'left',halign:'center',hidden:true},
		{field:'ED_STTN_ID',title:'종료정류소ID',width:100,align:'left',halign:'center',hidden:'true'},
		{field:'ED_STTN_NM',title:'종료정류소명',width:250,align:'left',halign:'center',hidden:true},
		{field:'ED_STTN_ENM',title:'종료정류소영문명',width:250,align:'left',halign:'center',hidden:true},
		{field:'RET_STTN_ID',title:'회차정류소ID',width:100,align:'left',halign:'center',hidden:'true'},
		{field:'RET_STTN_NM',title:'회차정류소명',width:250,align:'left',halign:'center',hidden:true},
		{field:'RET_STTN_ENM',title:'회차정류소영문명',width:250,align:'left',halign:'center',hidden:true},
        {field:'OPER_CNT',title:'운행횟수',width:110,halign:'center',align:'right',hidden:true},
		{field:'ALLOC_CNT',title:'배차횟수',width:110,align:'right',halign:'center',hidden:true},
		{field:'FST_TM',title:'첫차시간(시분)',width:110,align:'right',halign:'center',hidden:true},
		{field:'LST_TM',title:'막차시간(시분)',width:110,align:'right',halign:'center',hidden:true},
		{field:'NONE_PEAK',title:'운행간격(분)',width:110,align:'right',halign:'center',hidden:true},
		{field:'WAY_DIV',title:'상하행',width:110,align:'center',halign:'center',hidden:true},
		{field:'USE_YN',title:'사용여부',width:80,align:'center',halign:'center',hidden:true,editor:{type:'checkbox', options:{on:'Y', off:'N'}}},
		{field:'REMARK',title:'비고',width:300,halign:'center',align:'left'},
			]],
		frozenColumns:[[
		{field:'ROUT_ID',title:'노선ID',width:100,halign:'center',align:'center'}
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_cleargrid($('#dg1'), data.rows.length);
			$.jf_setfocus($('#dg0'), -1);
			$.jf_setfooter($('#dg0'));
		},
		onBeforeLoad: function(param){
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
			let a_rtn = false;
			if($.jf_validatedata($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))){
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
				
				if($.jf_changeddg($('#dg1'), null)){
					$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', index);
					a_rtn = false;
				}else{
					a_rtn = true;
				}				
			}	
			return a_rtn;
		},
		onSelect: function(index,row){
			//$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
			$.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});