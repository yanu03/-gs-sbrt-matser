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
    url:'/al/AL0302G0R0',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : "", TYPE:'ALL'}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
        {field:'ALLOC_NM',title:'배차명',width:150,halign:'center',align:'left'},
        {field:'ALLOC_ENM',title:'배차영문명',width:100,halign:'center',align:'center',hidden:'true'},
        {field:'ALLOC_GRP',title:'배차그룹',width:100,halign:'center',align:'center',hidden:'true'},
		{field:'DAY_DIV',title:'요일구분',width:100,align:'left',halign:'center',hidden:'true'},
		{field:'DAY_DIV_NM',title:'요일구분',width:100,align:'left',halign:'center'},
		{field:'WAY_DIV',title:'상하행구분',width:250,align:'left',halign:'center',hidden:'true'},
		{field:'ST_STTN_ID',title:'시작정류소ID',width:250,align:'left',halign:'center',hidden:'true'},
		{field:'ED_STTN_ID',title:'종료정류소ID',width:100,align:'left',halign:'center',hidden:'true'},
		{field:'OPER_CNT',title:'운행횟수',width:250,align:'left',halign:'center',hidden:'true'},
		{field:'ALLOC_CNT',title:'배차횟수',width:250,align:'left',halign:'center',hidden:'true'},
		{field:'FST_TM',title:'첫차시간',width:100,align:'left',halign:'center',hidden:'true'},
		{field:'LST_TM',title:'막차시간',width:250,align:'left',halign:'center',hidden:'true'},
		{field:'AM_PEAK_ST_TM',title:'오전첨두시작시간',width:250,align:'left',halign:'center',hidden:'true'},
        {field:'AM_PEAK_ED_TM',title:'오전첨두종료시간',width:110,halign:'center',align:'right',hidden:'true'},
		{field:'PM_PEAK_ST_TM',title:'오후첨두시작시간',width:110,align:'right',halign:'center',hidden:'true'},
		{field:'PM_PEAK_ED_TM',title:'오후첨두종료시간',width:110,align:'right',halign:'center',hidden:'true'},
		{field:'AM_PEAK',title:'오후첨두시배차간격',width:110,align:'right',halign:'center',hidden:'true'},
		{field:'PM_PEAK',title:'오후첨두시배차간격',width:110,align:'right',halign:'center',hidden:'true'},
		{field:'NONE_PEAK',title:'비첨두시배차간격',width:110,align:'center',halign:'center',hidden:'true'},
		{field:'REMARK',title:'비고',width:300,halign:'center',align:'left',hidden:'true'},
			]],
		frozenColumns:[[
		{field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'center'}
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
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
			let a_rtn = false;
			if($.jf_validatedata($.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g'))){
				$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
				
				if($.jf_changeddg($('#dg1'), null)){
					$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'focussave');
					a_rtn = false;
				}else{
					a_rtn = true;
				}				
			}	
			return a_rtn;
		},
		onSelect: function(index,row){
			$.uf_bgajax();
			//$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
			// $.jf_childretrieve($('#dg1'), $.pf_childparams($('#dg1'), row));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});