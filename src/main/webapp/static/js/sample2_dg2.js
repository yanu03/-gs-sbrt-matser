$(function(){

	$('#tab1').append('<table id="dg2" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg2').datagrid({
		url:'datagrid_data2_test1.json',	//json 조회 url
    method: 'get',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'GRG_ID',title:'차고지 ID',width:120,align:'center',halign:'center',editor:{type:'textbox', options:{required:true,validType:['length[0,10]']}}},
        {field:'GRD_NM',title:'차고지 명',width:180,align:'left',halign:'center',editor:{type:'textbox', options:{required:true,validType:['length[0,10]']}}},
        {field:'A_TYPE',title:'소유형태',width:100,align:'center',halign:'center',formatter:function(value,row,index){return row.A_TYPE_NAME;},editor:{type:'combobox',options:{valueField:'A_TYPE',textField:'A_TYPE_NAME',method:'get',url:'datagrid_combodata3.json',required:false,panelHeight:200,panelMinHeight:20,panelMaxHeight:400
        	,loader:function(param, success, error){$.tracomcbloader($(this), param, success, error)}}}},
				{field:'REMARK',title:'비고',width:400,halign:'center',editor:{type:'textbox', options:{required:false,validType:['length[0,50]']}}}
    				]],
		frozenColumns:[[
        //{field:'VHC_ID',title:'차량 ID',width:120,align:'center', halign:'center'}
						]],
		//event 정의
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg2'), -1);
			$.jf_setfooter($('#dg2'));
		},
		onBeforeLoad: function(param){
			if(Object.keys(param).length < 1) return false;
			else return true;
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
			if($.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g')){
				$.jf_endedit($('#dg2'), $.jf_fnddgstrct($('#dg2')));
				$.jf_beginedit($('#dg2'), index);
			}
		},
		onBeforeSelect: function(index,row){
			//grid edit : g, form edit : f
			return $.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g');	//onBeforeSelect --> onDblClickRow 또는 onSelect 중 1개가 동작함. 동시 동작 하지 않음.
		},
		onSelect: function(index,row){
			$.jf_endedit($('#dg2'), $.jf_fnddgstrct($('#dg2')));	//grid edit일때 사용
			//$.jf_synctoform($('#ef0'), index, row);	//form edit일떄 사용
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){
				//combobox 가 있을 경우 표시되는 text와 value가 다름. 해당 정보가 변경될 경우 처리함.
				row.A_TYPE_NAME = $.jf_currowtext($('#dg2'), index, 'A_TYPE');
		},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});