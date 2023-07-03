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
    url:'/AL/AL0202G0R1',	//json 조회 url
    method: 'POST',
    queryParams: JSON.stringify({"dma_search" : {CONTENT : "", TYPE:'ALL'}}),						//json 조회 params
	singleSelect: true, //signleSelect : 단일 선택 true, 체크박스 포함일때 false
	border: false,
	loadMsg: '데이터 로딩중입니다',
	emptyMsg: '데이터가 없습니다',
	rownumbers: true,
	showFooter: true,
    columns:[[
		{field:'ALLOC_ID',title:'배차ID',width:100,halign:'center',align:'center'},
        {field:'ALLOC_NM',title:'배차명',width:240,halign:'center',align:'left',editor:{type:'textbox',options:{required:true}}},
		{field:'ALLOC_NO',title:'배차번호',width:100,halign:'center',align:'center'},
		/*{field:'REMARK',title:'비고',width:300,halign:'center',align:'left',editor:{type:'textbox'}},*/
			]],
		frozenColumns:[[
					]],
		loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		},
		//event 정의
		onLoadSuccess: function(data){
			$.jf_mergedg($('#dg0'), 'ALLOC_ID');
			$.jf_mergedg($('#dg0'), 'ALLOC_NM');
			$.jf_setfocus($('#dg0'), -1);
			$.jf_setfooter($('#dg0'));
			$.uf_bgajax();
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
			//$.uf_bgajax();
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