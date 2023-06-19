$(function(){
	//single main grid
	$('#tab1').append('<table id="dg1" class="easyui-datagrid" style="width:100%;height:100%"></table>');
	
	$('#dg1').datagrid({
    url:'sample5_data2.json',	//json 조회 url
    method: 'get',
    queryParams: {},						//json 조회 params
		singleSelect: true,
		border: false,
		loadMsg: '데이터 로딩중입니다',
		emptyMsg: '데이터가 없습니다',
		rownumbers: true,
		showFooter: true,
    columns:[[
        {field:'UPDTAE',title:'업데이트일시',width:120,align:'center',halign:'center'},
        {field:'BROD',title:'발표일시',width:140,align:'center',halign:'center'},
        {field:'FINE_DUST',title:'초미세먼지농도',width:120,align:'center',halign:'center'},
        {field:'ULTRAFINE_DUST',title:'미세먼지농도',width:120,align:'center',halign:'center'},
        {field:'SULFUR',title:'아황산가스농도',width:120,align:'center',halign:'center'},
        {field:'CARBON',title:'일산화탄소농도',width:120,align:'center',halign:'center'},
        {field:'OZONE',title:'오존농도',width:120,align:'center',halign:'center'},
        {field:'NITROGEN',title:'이산화질소농도',width:120,align:'center',halign:'center'},
    				]],
		frozenColumns:[[
						]],
		// loader: function(param, success, error){$.tracomdgloader($(this), param, success, error);
		// },
		//event 정의
		onLoadError: function(){
		},
		onLoadSuccess: function(data){
			$.jf_setfocus($('#dg1'), -1);
			$.jf_setfooter($('#dg1'));
		},
		onBeforeLoad: function(param){
			return true;
		},
		onClickRow: function(index,row){},
		onDblClickRow: function(index,row){
		},
		onBeforeSelect: function(index,row){
			let a_rtn = true;
			// if($.jf_validatedata(null, $('#ef0'), $.jf_fnddgstrct($('#dg1')), 'f') && $.jf_validatedata($('#dg1'), null, $.jf_fnddgstrct($('#dg1')), 'g') && $.jf_validatedata($('#dg2'), null, $.jf_fnddgstrct($('#dg2')), 'g')){
			// 	$.jf_endedit($('#dg1'), $.jf_fnddgstrct($('#dg1')));
			// 	$.jf_endedit($('#dg2'), $.jf_fnddgstrct($('#dg2')));
				
			// 	if($.jf_changeddg($('#dg1'), null) || $.jf_changeddg($('#dg2'), null)){
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
			//$.jf_synctoform($('#dg1'), $('#ef0'), index, row);	//form edit일떄 사용
            $.uf_weathercombine($('#dg1'), $('#ef0'), index, row);
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