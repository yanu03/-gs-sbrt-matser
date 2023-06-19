$(function(){
	//single main grid
	$('#dg_panel0').append('<table id="dg2" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg2').datagrid({
    url:'sample5_data3.json',	//json 조회 url
    method: 'get',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'SEND',title:'전송일시',width:200,align:'center',halign:'center'},
        {field:'MG_ID',title:'관리ID',width:140,align:'center',halign:'center'},
        {field:'BUS_NUM',title:'차량번호',width:120,align:'center',halign:'center'},        
    				]],
		frozenColumns:[[
						]],
		// loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		// },
		//event 정의
		onLoadError: function(){
		},
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg2'), -1);
			$.jf_setfooter($('#dg2'));
		},
		onBeforeLoad: function(param){
			return true;
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
			let a_rtn = true;
			// if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg2')), 'f') && $.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g') && $.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g')){
			// 	$.jf_endedit($('#dg2'), $.jf_fnddgstrct($('#dg2')));
			// 	$.jf_endedit($('#dg2'), $.jf_fnddgstrct($('#dg2')));
				
			// 	if($.jf_changeddg($('#dg2'), null) || $.jf_changeddg($('#dg2'), null)){
			// 			$.tracomcfmsg('확인', '저장되지 않은 데이터가 있습니다. 저장 하시겠습니까?', 'focussave');
			// 			a_rtn = false;
			// 	}else{
			// 		a_rtn = true;
			// 	}				
			// }	
			
			return a_rtn;
			//grid edit : g, form edit : f
			//return $.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg0')), 'f');	//onBeforeSelect --> onDblClickRow 또는 onSelect 중 1개가 동작함. 동시 동작 하지 않음.
			//return $.jf_validatedata($('#dg0'), null, $.jf_fnddgstrct($('#dg0')), 'g');	//onBeforeSelect --> onDblClickRow 또는 onSelect 중 1개가 동작함. 동시 동작 하지 않음.
		},
		onSelect: function(index,row){
			//$.jf_endedit($('#dg0'), $.jf_fnddgstrct($('#dg0')));	//grid edit일때 사용
			//$.jf_synctoform($('#dg0'), $('#ef0'), index, row);	//form edit일떄 사용
			// $.jf_childretrieve($('#dg2'), $.pf_childparams($('#dg2'), row));
			// $.jf_childretrieve($('#dg2'), $.pf_childparams($('#dg2'), row));
		},
		onBeforeEdit: function(index,row){},
		onBeginEdit: function(index,row){},
		onEndEdit: function(index,row,changes){},
		onAfterEdit: function(index,row,changes){},
		onCancelEdit:function(index,row){}
	});

});